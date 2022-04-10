const express = require('express');
const axios = require('axios');
const { Shopify, ApiVersion } = require('@shopify/shopify-api');

const app = express();

const session = {
    id: 'offline_testdarkh.myshopify.com',
    shop: 'testdarkh.myshopify.com',
    state: '513850918751462',
    isOnline: false,
    accessToken: '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',
    scope: 'read_orders,read_products'
}

// const fetchProducts = async () => {
//     try {
//         const latest_stable = Object.values(ApiVersion).at(-3);
//         const { data } = await axios.get(`https://${session.shop}/admin/api/${latest_stable}/products.json`, {
//             headers: { 'X-Shopify-Access-Token': session.accessToken },
//             params: { limit: 2 }
//         });
//         console.log(data);
//     }
//     catch (error) {
//         console.log(error.message)
//     }
// }

// fetchProducts();

// console.log(Shopify.Context);

const fetchProducts = async (shop, accessToken) => {
    try {
        const client = new Shopify.Clients.Rest(shop, accessToken);
        const { body, headers, pageInfo } = await client.get({
            path: 'products',
            query: { limit: 2 },
        });
        return console.log({ ...body, pageInfo });
        console.log(headers);
    }
    catch (error) {
        console.log("\x1b[31m", error.message);
    }
}

// fetchProducts(session.shop, session.accessToken);

module.exports = fetchProducts;