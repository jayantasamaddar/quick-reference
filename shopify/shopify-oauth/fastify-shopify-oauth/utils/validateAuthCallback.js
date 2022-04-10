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