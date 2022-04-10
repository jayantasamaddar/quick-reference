const { Shopify } = require('@shopify/shopify-api');

//console.log(fetchProducts(session.shop));

// const fetchProducts = async (shop) => {
//     const session = await Shopify.Utils.loadOfflineSession(shop);
//     const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
//     const data = await client.get({
//         path: 'products',
//     });
//     console.log(data)
//     return data;
// }

const getShopData = async (shop, accessToken) => {
    try {
        const client = new Shopify.Clients.Rest(shop, accessToken);
        const { body, headers, pageInfo }  = await client.get({
            path: 'shop',
        });
        return console.log(body);
    }
    catch (error) {
        console.log("\x1b[31m", error.message);
    }
}

module.exports = getShopData