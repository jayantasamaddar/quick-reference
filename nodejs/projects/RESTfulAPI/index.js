import http from 'http';
import https from 'https';
import url from 'url';
import { StringDecoder } from 'string_decoder';
import fs from 'fs';
import env from './config.js';

/** Instantiate the HTTP Server */
const httpServer = http.createServer();
httpServer.on('request', requestListener);

/** Instantiate a HTTPS Server */
const options = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};
const httpsServer = https.createServer(options, requestListener);

/** Start HTTP Server */
httpServer.listen(env.httpPort, () => {
  console.log(
    `Server is listening on PORT ${env.httpPort} in ${env.name} mode!`
  );
});

/** Start HTTPS Server */
httpsServer.listen(env.httpsPort, () => {
  console.log(
    `Server is listening on PORT ${env.httpsPort} in ${env.name} mode!`
  );
});

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
  const method = req.method.toUpperCase();

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
      payload: buffer,
    };

    // Log the request path
    console.log(`Request: ${method} ${trimmedPath}`);

    // Log the query parameters
    console.log(`Query Parameters: ${JSON.stringify(queryParams)}`);

    // Log the headers
    console.log(`Headers: ${JSON.stringify(headers)}`);

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

      // Logs Response
      console.log(`Response:\n StatusCode: ${statusCode} \n ${payload}`);
    });
  });
}

// Define Handlers
const handlers = {};

// ping handler
handlers.ping = (data, callback) => {
  callback(200);
};

// Not found Handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// Defining a Router
const router = {
  ping: handlers.ping,
};
