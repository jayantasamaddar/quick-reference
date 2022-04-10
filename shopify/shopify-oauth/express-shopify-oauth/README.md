# SHOPIFY OAUTH IMPLEMENTATION (Using Node + Express)
---

## Install Dependencies

```
npm i express dotenv @shopify/shopify-api
```

---

## Setup Basic Express Server

**In `.env`**
```
PORT=8080
```

**In `server.js`**

```
const express = require('express');
const app = express();

app.listen(PORT, console.log(`Server running on PORT ${PORT}... (http://localhost:${PORT})`));

app.get('/', async (req, res) => {
    res.send("Hello world!");
});

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
SHOPIFY_API_KEY=85552a718a07bb6c243aaa11796b75f6
SHOPIFY_API_SECRET=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
SHOPIFY_API_SCOPES=read_orders,read_products
```

**In `server.js`**

```
require('dotenv').config();
const express = require('express');
const { Shopify } = require('@shopify/shopify-api');

const app = express();

const { PORT, SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_API_SCOPES, SHOPIFY_API_VERSION, HOST_NAME } = process.env;

/* Keep Track if Shop has your app installed. This has to be imported from database */
const ACTIVE_SHOPIFY_STORES = {};

/* Initialize Shopify Context. Accessible with Shopify.Context */
Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_API_SCOPES,
    HOST_NAME,
    API_VERSION: ApiVersion[SHOPIFY_API_VERSION],
    IS_EMBEDDED_APP: true,
    IS_PRIVATE_APP: false,
    // This should be replaced with your preferred storage strategy
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage()
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS: { [key: string]: string | undefined } = {};

/* Run Server */
app.listen(PORT, console.log(`Server running on PORT ${PORT}... (http://localhost:${PORT})`));

/* Setup Routes */
app.get('/', async (req, res) => {
    res.send("Hello world!");
});
```

---

# Check if Shop has Installed the App and redirect to Auth URL where merchant can accept the scopes or open App

```
app.get('/', async (req, res) => {
    // The query parameters in the following format accessible by req.query
    //      {
    //          hmac: '04222ad034dda2a686251691ae56acbfa4c15c6882389e8a06ada7c5a63e31cc',
    //          host: 'dGVzdGRhcmtoLm15c2hvcGlmeS5jb20vYWRtaW4',
    //          shop: 'testdarkh.myshopify.com',
    //          timestamp: '1649176649'
    //      }
    if(ACTIVE_SHOPIFY_STORES[req.query.shop] === undefined) {
        res.send("Hello world!");
    }
    else {
        res.redirect(`/auth?shop=${req.query.shop}`);
    }
});

app.get('/auth', async (req, res) => {
    //  The query parameters in the following format accessible by req.query
    // {
    //      code: '3907990dde4bb9b6389af94b1e0d5ad2',
    //      hmac: '0353688e4f122563e963c8969a713ab29420fedd24144f1495313fca9e932b82',
    //      host: 'dGVzdGRhcmtoLm15c2hvcGlmeS5jb20vYWRtaW4',
    //      shop: 'testdarkh.myshopify.com',
    //      state: '841635661855203',
    //      timestamp: '1649110298'
    // }
    res.redirect(await Shopify.Auth.beginAuth(
        req,                                        //request: incomingMessage
        res,                                        //response: ServerResponse
        req.query.shop,                             //shop: String
        '/auth/callback',                           //redirectPath: String
        false                                       //isOnline: Boolean (accessToken type)
    ));
});
```

---

# Setup the Auth Callback Route

```
app.get('/auth/callback', async (req, res) => {
    const session = Shopify.Auth.validateAuthCallback(req, res, req.query);

    // Sample session
    /*
    Session {
        id: 'offline_testdarkh.myshopify.com',
        shop: 'testdarkh.myshopify.com',
        state: '391607812704346',
        isOnline: false,
        accessToken: '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',
        scope: 'read_orders,read_products'
    }
    */

    //Store shopSession for Future Use (Store in an actual database to persist)
    ACTIVE_SHOPIFY_STORES[session.shop] = session;

    // Redirect to App page
    res.redirect(`https://${session.shop}/admin/apps/${SHOPIFY_APP_HANDLE}`);
});
```

---

# Making a Rest API Call

### Example: Fetching Products (GET Request)

**Method 1 - Using `Shopify.Clients.Rest`**
```
const { Shopify, ApiVersion, AuthQuery } = require('@shopify/shopify-api');
const fetchProducts = async () => {
    try {
        const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
        const { body, headers, pageInfo } = await client.get({
            path: 'products',
            query: { limit: 2 },
        });
        console.log(body);
    }
    catch (error) {
        console.log(error.message);
    }
}

fetchProducts();
```

**Method 2 - Using `axios`**
```
const { Shopify, ApiVersion, AuthQuery } = require('@shopify/shopify-api');
const fetchProducts = async () => {
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

fetchProducts(shop, accessToken);
```

The difference between the two, is that `axios` is independent of Shopify API being installed or not, while Shopify Context through `@shopify/shopify-api` is necessary for proper versioning when using `Shopify.Clients.Rest`. More header data is returned when using the Rest Client vs axios which just does what is necessary and gets the response data object and any headers passed alongwith.

---

# Versioning

```
const { Shopify, ApiVersion, AuthQuery } = require('@shopify/shopify-api');
console.log(ApiVersion);
const latest_stable = Object.values(ApiVersion).at(-3);                 // get latest Stable Version
```

**Response**
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


Edit orders

This includes: all order details for the last 60 days, order fulfillments, assigned fulfillment orders, merchant-managed fulfillment orders, third-party fulfillment orders, and order edits.
Edit other data

This includes: price rules.
Edit products

This includes: inventory, products, and collections.

scopes = read_customers, write_customers, read_orders, write_orders, read_products, write_products, read_inventory, write_inventory