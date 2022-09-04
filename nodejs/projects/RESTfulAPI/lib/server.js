/**
 * Server related tasks
 * ---------------------
 */

/** Dependencies */
import http from 'http';
import https from 'https';
import url from 'url';
import path from 'path';
import { StringDecoder } from 'string_decoder';
import fs from 'fs';
import env from '../config.js';
import handlers from './handlers.js';
import helpers from './helpers.js';
import util from 'util';

// Solve for __dirname not defined in ES module scope. Not needed for CommonJS
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize debuglog
const debug = util.debuglog('server');

// Instantiate the server module object
const server = {};

/** Instantiate the HTTP Server */
server.httpServer = http.createServer();
server.httpServer.on('request', requestListener);

/** Instantiate a HTTPS Server */
const options = {
  key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem')),
};
server.httpsServer = https.createServer(options, requestListener);

/** Request Listener function **/
function requestListener(req, res) {
  /**
   * Get the URL and parse it
   * url.parse(req.url, true) - The true parameter ensures that we do a queryString operation
   */
  const parsedURL = url.parse(req.url, true);

  /**
   * Get the path from the URL
   * E.g. http://localhost:3000/users/12345
   */
  const path = parsedURL.pathname; // '/users/12345'
  const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // 'users/12345'

  // Get the HTTP Method
  const method = req.method;

  // Get the Query String
  const queryParams = parsedURL.query;

  // Get the Headers as an Object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');

  // Payloads that come to a HTTP Server, come as a Stream. So we need to decode the Stream.
  // When the stream tells us we are at the end, coalescent that into one coherent thing to structure the payload
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });

  // Stream has reached the end
  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler this request should go to
    const handler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryParams,
      method,
      headers,
      payload: helpers.parseJSONToObject(buffer),
    };

    // Log the query parameters
    debug(`Query Parameters: ${JSON.stringify(queryParams)}`);

    // Log the headers
    debug(`Headers: ${JSON.stringify(headers)}`);

    // Route the request to the handler specified in the router;
    handler(data, (statusCode, payload) => {
      // Use the status code called by the handler or default to 200
      statusCode = typeof statusCode === 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = JSON.stringify(typeof payload === 'object' ? payload : {});

      // Send the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payload);

      // If the statusCode is [200, 201] print Green, [300 - 309] print orange, otherwise print Red
      const statusColor = [200, 201].includes(statusCode)
        ? helpers.color.success
        : statusCode >= 300 && statusCode <= 309
        ? helpers.color.warning
        : helpers.color.error;

      // Log the statusCode, method, request path and payload
      debug(
        statusColor,
        `${statusCode}: Request: ${method} /${trimmedPath} \n${payload}`
      );
    });
  });
}

// Defining a Router
const router = {
  '': handlers.index,
  'account/create': handlers.account.create,
  'account/edit': handlers.account.edit,
  'account/deleted': handlers.account.deleted,
  'session/create': handlers.session.create,
  'session/deleted': handlers.session.deleted,
  'checks/all': handlers.checkList,
  'checks/create': handlers.checksCreate,
  'checks/edit': handlers.checksEdit,
  ping: handlers.ping,
  'api/users': handlers.users,
  'api/tokens': handlers.tokens,
  'api/checks': handlers.checks,
};

// Create the Initialization methods
server.init = () => {
  /** Start HTTP Server */
  server.httpServer.listen(env.httpPort, () => {
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Server is listening on PORT ${env.httpPort} in ${env.name} mode!`
    );
  });

  /** Start HTTPS Server */
  server.httpsServer.listen(env.httpsPort, () => {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `Server is listening on PORT ${env.httpsPort} in ${env.name} mode!`
    );
  });
};

// Export server
export default server;
