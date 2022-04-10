# SHOPIFY OAUTH IMPLEMENTATION (Using Node + Fastify) WITHOUT USING SHOPIFY NODE LIBRARY
---

## Install Dependencies

```
npm i axios fastify dotenv
```

---

## Setup Basic Fastify Server

**In `.env`**
```
PORT=8080
```

**In `server.js`**

```
import fastify from 'fastify';

// Initialize Fastify: {logger: true}, sets a logger function to run automatically
const server = fastify({ logger: false });

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

```

---

## Setup ngrok during Development stage
- Install ngrok and setup the ngrok authtoken
- Open a new Terminal window and run `ngrok http {PORT}`
- Grab the `https` URL exposed by ngrok. (Example: `https://09a3-2405-201-8016-9840-4421-50eb-f77f-b7e4.ngrok.io`)
- Open the URL on a new browser tab and test if it's working.

---

## Create an App on Partner's Dashboard
- Create a Shopify App on the Public Dashboard. Options are Custom for single store Apps and Public for Public Apps
- Enter the ngrok `https` URL as **App URL**
- Enter `URL/auth/callback` as **Allowed redirection URL(s)**

---

## Update Environment Variables and Initialize Shopify Context

**In `.env`**
```
PORT=8080
HOST_NAME=https://09a3-2405-201-8016-9840-4421-50eb-f77f-b7e4.ngrok.io
SHOPIFY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_API_SECRET=shpss_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
SHOPIFY_API_SCOPES=read_orders,read_products
```

**In `server.js`**

```
import dotenv from 'dotenv';
import fastify from 'fastify';
import axios from 'axios';

// Initialize Fastify: {logger: true}, sets a logger function to run automatically
const server = fastify({ logger: false });

// Get Environment Variables
dotenv.config();
const { PORT, HOST_NAME, SHOPIFY_API_KEY, SHOPIFY_API_SCOPES, 
  SHOPIFY_APP_HANDLE, SHOPIFY_ONLINE_TOKEN } = process.env;

// Keep Track if Shop has your server installed. This has to be imported from database
const ACTIVE_SHOPIFY_STORES = {};

// Some utility functions like stringToBoolean have to be declared (below)
const query = {
  client_id: SHOPIFY_API_KEY,
  scope: SHOPIFY_API_SCOPES.split(', '),
  redirect_uri: `${HOST_NAME}/integrations/shopify/auth/callback`,
  state: crypto.randomBytes(20).toString('hex'),
  'grant_options[]': stringToBoolean(SHOPIFY_ONLINE_TOKEN) ? 'per-user' : 'value',
}

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

/* Setup Routes - Example */
server.get('/', async (req, res) => {
    res.send("Hello world!");
});
```

---

## Since we are doing this Oauth flow manually, we need to declare Utility Functions to Validate the HMAC, Hostname and match the `state:{nonce}` called in each step, and any other additional utility functions.


**In `utils/validateHMAC`**

```
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
const validateHMAC = (hmac, query, digest) => {
    
    const { SHOPIFY_API_SECRET } = process.env;
    const queryString = new URLSearchParams(query).toString()

    const hash = crypto.createHmac('sha256', SHOPIFY_API_SECRET)
                .update(queryString)
                .digest(digest);
    
    return hash === hmac;
}

export default validateHMAC;
```


**In `utils/validateHostName`**

```
const validateHostName = hostname => {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*.myshopify.com/g;
    return hostname.match(regex) ? true : false;
}

export default validateHostName;
```


**In `utils/validateAuthCallback`**

```
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import { validateHMAC, validateHostName, stringToBoolean } from "./index.js";
import axios from 'axios';


const validateAuthCallback = async (query, prevState) => {
    try {
        const { hmac, ...params } = query;

        const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SHOPIFY_ONLINE_TOKEN } = process.env;

        if (!validateHostName(params.shop)) {
            res.status(403).send({ error: "Invalid Storename" });
        }

        else if (params.state !== prevState) {
            res.status(403).headers({
                'X-Status-Reason': 'Suspected CSRF Attack'
            }).send({ error: "Suspected CSRF Attack" });
        }

        else if (!validateHMAC(hmac, params, "hex")) {
            res.status(403).send({ error: "Invalid HMAC. Request could not be verified." });
        }

        else {
            const { data, status } = await axios.post(`https://${params.shop}/admin/oauth/access_token`, {
                client_id: SHOPIFY_API_KEY,
                client_secret: SHOPIFY_API_SECRET,
                code: params.code
            });
            if (status === 200) {
                const isOnline = stringToBoolean(SHOPIFY_ONLINE_TOKEN);
                return {
                    id: `${isOnline ? "online" : "offline"}_${params.shop}`,
                    shop: `${params.shop}`,
                    isOnline,
                    ...data
                };
            }
        }
    }
    catch (error) {
        throw new error;
    }   
}


export default validateAuthCallback;
```

**In `utils/stringToBoolean`**

```
const stringToBoolean = string => {
    switch (string.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return false;
    }
}

export default stringToBoolean;
```

---

# BEGIN AUTH FLOW

## Check if Shop has Installed the App and redirect to Auth URL where merchant can accept the scopes or open App

```
server.get('/', async (req, res) => {
    try {
        // The query parameters in the following format accessible by req.query
        //      {
        //          hmac: '04222ad034dda2a686251691ae56acbfa4c15c6882389e8a06ada7c5a63e31cc',
        //          host: 'dGVzdGRhcmtoLm15c2hvcGlmeS5jb20vYWRtaW4',
        //          shop: 'mystore.myshopify.com',
        //          timestamp: '1649176649'
        //      }
        if(ACTIVE_SHOPIFY_STORES[req.query.shop] !== undefined) {
            res.redirect("http://localhost:5000");
        }
        else {
            const { hmac, ...params } = req.query;
            if (!validateHMAC(hmac, params, "hex")) {
            res.status(403).send({ error: "Invalid HMAC. Request could not be verified." });
            }
            else res.redirect(`/auth?shop=${req.query.shop}`);
        }
    }
    catch (error) {
        console.log("\x1b[31m", `Shopify Auth Error: ${error.message}`);
    }
    });
```

---

## Setup the Auth Route

> This is the middleware route and custom modifications like allowing custom scopes per shop based on plan, can be done here. (The logic is not provided below as it involves storing scopes and plan details in a database)

```
server.get('/auth', async (req, res) => {
    try {
        // We manually build the querystring from the "query" object declared earlier
        const queryString = Object.entries(query).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '').replace('&','');
        res.redirect(`https://${req.query.shop}/admin/oauth/authorize?${queryString}`);
    }
    catch (error) {
        console.log("\x1b[31m", `Shopify Auth Error: ${error.message}`);
    }
});
```

---

## Setup the Auth Callback Route

```
server.get('/auth/callback', async (req, res) => {
    try {
        //  The query parameters in the following format accessible by req.query
        // {
        //      code: '3907990dde4bb9b6389af94b1e0d5ad2',
        //      hmac: '0353688e4f122563e963c8969a713ab29420fedd24144f1495313fca9e932b82',
        //      host: 'dGVzdGRhcmtoLm15c2hvcGlmeS5jb20vYWRtaW4',
        //      shop: 'mystore.myshopify.com',
        //      state: '841635661855203',
        //      timestamp: '1649110298'
        // }
        
        const session = await validateAuthCallback(req.query, query.state);
        //  Sample session
        //  Session {
        //      id: 'offline_mystore.myshopify.com',
        //      shop: 'mystore.myshopify.com',
        //      state: '391607812704346',
        //      isOnline: false,
        //      accessToken: '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',
        //      scope: 'read_orders,read_products'
        //  }

        //Store session for Future Use (Store in an actual database to persist)
        ACTIVE_SHOPIFY_STORES[session.shop] = session;

        res.redirect(`https://${session.shop}/admin/apps/${SHOPIFY_APP_HANDLE}`);
    }
    catch (error) {
        console.log("\x1b[31m", `Shopify Auth Callback Error: ${error.message}`);
    }
});
```

---

# Making a Rest API Call

**Method 2 - Using `axios`**
```
const { Shopify, ApiVersion, AuthQuery } = require('@shopify/shopify-api');
const fetchProducts = async (shop, accessToken) => {
    try {
        const latest_stable = Object.values(ApiVersion).at(-3);
        const { data } = await axios.get(`https://${shop}/admin/api/${latest_stable}/products.json`, {
            headers: { 'X-Shopify-Access-Token': accessToken },
            params: { limit: 2 }
        });
        console.log(data);
    }
    catch (error) {
        console.log(error.message)
    }
}

fetchProducts(session.shop, accessToken);
```

I prefer `axios`, as it is independent of Shopify API being installed or not, while Shopify Context through `@shopify/shopify-api` is necessary for proper versioning when using `Shopify.Clients.Rest`. More header data is returned when using the Rest Client vs axios which just does what is necessary and gets the response data object and any headers passed alongwith.

`axios` also does not return the pageInfo details in the `data` object and this information has to be extracted from the `headers.link`. (Logic not provided)

---

# Versioning

To get consistent latest version automatically, this is the only way. 
Otherwise just update the .env with a 'SHOPIFY_API_VERSION' property.
```
import { Shopify, ApiVersion } from '@shopify/shopify-api';
console.log(ApiVersion);
const latest_stable = Object.values(ApiVersion).at(-3);                 // get latest Stable Version
```

**Response from `console.log(ApiVersion)`**
```
{
  April19: '2019-04',
  July19: '2019-07',
  October19: '2019-10',
  January20: '2020-01',
  April20: '2020-04',
  July20: '2020-07',
  October20: '2020-10',
  January21: '2021-01',
  April21: '2021-04',
  July21: '2021-07',
  October21: '2021-10',
  January22: '2022-01',
  April22: '2022-04'
  Unstable: 'unstable',
  Unversioned: 'unversioned'
}
```

---

# References

- **[Shopify Oauth - Getting Started](https://shopify.dev/apps/auth/oauth/getting-started)**
- **[Access Scopes](https://shopify.dev/api/usage/access-scopes)**
- **[Shopify Node API](https://github.com/Shopify/shopify-node-api)**
- **[Custom Session Storage using Redis](https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md)**
- **[Revoke API Credentials](https://shopify.dev/apps/auth/oauth/rotate-revoke-api-credentials)**