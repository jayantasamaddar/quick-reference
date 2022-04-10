import dotenv from 'dotenv';
import crypto from 'crypto';
import fastify from 'fastify';
import { validateHMAC, validateAuthCallback, stringToBoolean } from './utils/index.js';

// Initialize Fastify
const server = fastify({ logger: false });

// Get Environment Variables
dotenv.config();
const { PORT, HOST_NAME, SHOPIFY_API_KEY, SHOPIFY_API_SCOPES, 
  SHOPIFY_APP_HANDLE, SHOPIFY_ONLINE_TOKEN } = process.env;

// Keep Track if Shop has your server installed. This has to be imported from database
const ACTIVE_SHOPIFY_STORES = {};

const query = {
  client_id: SHOPIFY_API_KEY,
  scope: SHOPIFY_API_SCOPES.split(', '),
  redirect_uri: `${HOST_NAME}/integrations/shopify/auth/callback`,
  state: crypto.randomBytes(20).toString('hex'),
  'grant_options[]': stringToBoolean(SHOPIFY_ONLINE_TOKEN) ? 'per-user' : 'value',
}

// Setup Routes
server.get('/integrations/shopify', async (req, res) => {
  try {
      if(ACTIVE_SHOPIFY_STORES[req.query.shop] !== undefined) {
        res.redirect("http://localhost:5000");
      }
      else {
        const { hmac, ...params } = req.query;
        if (!validateHMAC(hmac, params, "hex")) {
          res.status(403).send({ error: "Invalid HMAC. Request could not be verified." });
        }
        else res.redirect(`/integrations/shopify/auth?shop=${req.query.shop}`);
      }
  }
  catch (error) {
    console.log("\x1b[31m", `Shopify Auth Error: ${error.message}`);
  }
});

server.get('/integrations/shopify/auth', async (req, res) => {
  try {
    const queryString = Object.entries(query).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '').replace('&','');
    res.redirect(`https://${req.query.shop}/admin/oauth/authorize?${queryString}`);
  }
  catch (error) {
    console.log("\x1b[31m", `Shopify Auth Error: ${error.message}`);
  }
});

server.get('/integrations/shopify/auth/callback', async (req, res) => {
  try {
      const session = await validateAuthCallback(req.query, query.state);

      //Store session for Future Use (Store in an actual database to persist)
      ACTIVE_SHOPIFY_STORES[session.shop] = session;
      console.log(session)

      res.redirect(`https://${session.shop}/admin/apps/${SHOPIFY_APP_HANDLE}`);
  }
  catch (error) {
      console.log("\x1b[31m", `Shopify Auth Callback Error: ${error.message}`);
  }
});

// Run the server!
const start = async () => {
  try {
    await server.listen(PORT || 8080);
    console.log(`Server listening on ${server.server.address().port}`);
  } 
  catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
start();