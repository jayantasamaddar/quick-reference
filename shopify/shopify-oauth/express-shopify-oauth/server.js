require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { Shopify, ApiVersion, AuthQuery } = require('@shopify/shopify-api');
const getShopData = require('./controllers/shop/getShopData');
const fetchProducts = require('./controllers/products/fetchProducts');

const app = express();

const { PORT, SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_API_SCOPES, HOST_NAME,
SHOPIFY_APP_HANDLE } = process.env;

/* Initialize Shopify */
Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_API_SCOPES,
    HOST_NAME: HOST_NAME.replace(/https:\/\//, ""),
    API_VERSION: Object.values(ApiVersion).at(-3),
    IS_EMBEDDED_APP: false,
});

/* Keep Track if Shop has your app installed. This has to be imported from database */
const ACTIVE_SHOPIFY_STORES = {};

/* Setup Routes */
app.get('/integrations/shopify', async (req, res) => {
    console.log({'req.url1': req.url});
    if(ACTIVE_SHOPIFY_STORES[req.query.shop] !== undefined) {
        res.send("Hello world!");
    }
    else {
        res.redirect(`/integrations/shopify/auth?shop=${req.query.shop}`);
    }
});

app.get('/integrations/shopify/auth', async (req, res) => {
    console.log({'req.url2': req.url});
    res.redirect(await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop, 
        '/integrations/shopify/auth/callback',
        false
    ));
});

app.get('/integrations/shopify/auth/callback', async (req, res) => {
    console.log({'req.url3': req.url});
    try {
        const shopSession = await Shopify.Auth.validateAuthCallback(req, res, req.query);
        // console.log({ query: req.query, req, res })
        //Store shopSession for Future Use (Store in an actual database to persist)
        ACTIVE_SHOPIFY_STORES[shopSession.shop] = shopSession;
        console.log(shopSession)

        res.redirect(`https://${shopSession.shop}/admin/apps/${SHOPIFY_APP_HANDLE}`);
    }
    catch (error) {
        console.log("\x1b[31m", `Shopify Auth Callback Error: ${error.message}`);
    }
});

// Session has to be stored in a Database and fetched
const session = {
    id: 'offline_testdarkh.myshopify.com',
    shop: 'testdarkh.myshopify.com',
    state: '841635661855203',
    isOnline: false,
    accessToken: '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',
    scope: 'write_customers,write_orders,write_products,write_inventory'
}

// getShopData(session.shop, session.accessToken);

// fetchProducts(session.shop, session.accessToken);

/* Run Server */
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}... (http://localhost:${PORT})`));