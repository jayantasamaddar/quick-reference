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