'use strict';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { Client } from '@elastic/elasticsearch';
config({ path: '../../.env' });

const { ELASTIC_USER, ELASTIC_PORT, ELASTIC_ADDRESS } = process.env;

const client = new Client({
  node: `${ELASTIC_ADDRESS}:${ELASTIC_PORT}`,
  auth: {
    username: 'elastic',
    password: ELASTIC_USER,
  },
  tls: {
    ca: readFileSync('../../http_ca.crt'),
    rejectUnauthorized: false,
  },
});

export default client;
