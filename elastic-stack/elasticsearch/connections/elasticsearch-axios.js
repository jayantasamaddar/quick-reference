import axios from 'axios';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import https from 'https';
config({ path: '../../.env' });

const { ELASTIC_USER, ELASTIC_PORT, ELASTIC_ADDRESS } = process.env;

const client = axios.create({
  baseURL: `${ELASTIC_ADDRESS}:${ELASTIC_PORT}`,
  auth: {
    username: 'elastic',
    password: ELASTIC_USER,
  },
  httpsAgent: new https.Agent({
    cert: readFileSync('../../http_ca.crt'),
    rejectUnauthorized: false,
  }),
});

export default client;
