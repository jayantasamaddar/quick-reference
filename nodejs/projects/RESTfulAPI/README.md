# Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Requirements](#requirements)
- [Creating a HTTP Server](#creating-a-http-server)
- [Adding HTTPS Support](#adding-https-support)
  - [Creating the Private Key and SSL Certificate](#creating-the-private-key-and-ssl-certificate)
  - [Updating Configuration](#updating-configuration)
  - [Isolating the `requestListener` handler function](#isolating-the-requestlistener-handler-function)
  - [Creating the HTTPS Server](#creating-the-https-server)
- [Service 1: `/ping`](#service-1-ping)
- [Storing Data](#storing-data)
  - [CRUD Operations](#crud-operations)
  - [Testing CRUD Operations](#testing-crud-operations)
- [Service 2: `/users`](#service-2-users)
- [Service 3: `/tokens`](#service-3-tokens)
- [Service 4: `/checks`](#service-4-checks)
- [Connecting to Twilio API to send SMS](#connecting-to-twilio-api-to-send-sms)
- [Background Workers to perform checks](#background-workers-to-perform-checks)
  - [Creating the `workers.js` library](#creating-the-workersjs-library)
- [Logging to Files](#logging-to-files)
  - [Write the methods to Rotate logs](#write-the-methods-to-rotate-logs)
    - [List `.log` files](#list-log-files)
    - [Compress a `.log` file into a `.gz.b64` file](#compress-a-log-file-into-a-gzb64-file)
    - [Decompress a `.gz.b64` file into a string](#decompress-a-gzb64-file-into-a-string)
    - [Truncate a `.log` file](#truncate-a-log-file)
  - [Run background workers](#run-background-workers)
    - [The `workers.init()` method](#the-workersinit-method)
    - [Writing the `workers.rotateLogs` and `workers.rotationLoop()` methods](#writing-the-workersrotatelogs-and-workersrotationloop-methods)
- [Logging to the Console](#logging-to-the-console)
  - [Adding colours to `console.log` output](#adding-colours-to-consolelog-output)
  - [Using the `util.debuglog` from the `util` module with `NODE_DEBUG`](#using-the-utildebuglog-from-the-util-module-with-node_debug)
    - [The `NODE_DEBUG` Command Line Argument](#the-node_debug-command-line-argument)
    - [The `util.debuglog` method](#the-utildebuglog-method)

# About

We will be building a RESTful API for an Uptime Monitoring application. We will not be using any NPM packages, but we'll be using a number of built-in Node modules.

We will be building an Uptime Monitor. It has the following features:

1. The application allows users to enter URLs they want to be monitored and receive alerts when those resources "go down" or "come back up".
2. The app should allow users to Sign-Up, Sign-In and Sign-Out.
3. The app should allow users to edit their Settings.
4. The app should allow users to make Uptime checks.
5. Send alerts to users to notify about uptime or downtime by SMS than email.

---

# Requirements

Let's make a list of specifications we need to build based on the objectives:

1. The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD.
2. The API allows a client to connect, then create a new user, edit the user or delete the user.
3. The API allows an user to "Sign In" which gives them a token that they can use for subsequent authenticated requests.
4. The API allows a "Signed In" user to "Sign Out" which invalidates the token.
5. The API allows a "Signed In" user to use their token to create a new "check" - a task for the system to check a given URL, to see if it's up or down. We also want the user to be able to define what Up or Down is. For example: For some websites Up maybe a 200 status code, for others it maybe anything that isn't 500.
6. The API allows a "Signed In" user to Edit or Delete any of their "checks" and set a limit on checks to 5.
7. In the background, workers perform all the "checks" at the appropriate times, and send SMS alerts to the users when a check changes its state from "Up" to "Down" or vice versa. We want these checks to run, once-a-minute.

> **Note:**
>
> - To send the SMS, we will be connecting to the Twilio API. This does not mean we'll be using a third-party library to connect to Twilio.
> - For our app, we'll use the File System as a key-value store of JSON docs. In a real app, you'd want to use a Database.

---

# Creating a HTTP Server

```js
import http from 'http';
import url from 'url';
import { StringDecoder } from 'string_decoder';
import env from './config.js';

/** Create a HTTP Server */
const app = http.createServer((req, res) => {
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
  /**
   * Example:
   * curl -d '{"customer":{"first_name":"Steve","last_name":"Lastnameson","email":"steve.lastnameson@example.com","phone":"+15142546011","verified_email":true,"addresses":[{"address1":"123 Oak St","city":"Ottawa","province":"ON","phone":"555-1212","zip":"123 ABC","last_name":"Lastnameson","first_name":"Mother","country":"CA"}]}}' \
-X POST "http://localhost:3000/admin/api/2022-04/customers.json" \
-H "X-Shopify-Access-Token: {access_token}" \
-H "Content-Type: application/json"
   */
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
});

/** Listen on a PORT */
app.listen(env.httpPort, () => {
  console.log(
    `Server is listening on PORT ${env.httpPort} in ${env.name} mode!`
  );
});

// Define Handlers
const handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  // Callback a HTTP Status Code and a payload object
  callback(406, { name: 'sample handler' });
};

// Not found Handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// Defining a Router
const router = {
  sample: handlers.sample,
};
```

# Adding HTTPS Support

At this point we have setup a HTTP Server and opened a port corresponding to the environment, but we haven't done anything with HTTPS. Let's add HTTPS support to our app.

We can do this by doing the following steps:

1. Creating the private key and SSL certificate.
2. Updating Configuration (HTTPS port, scripts to launch production and development).
3. Isolating the `requestListener` handler function for use with both HTTP and HTTPS.
4. Creating the HTTPS server.

## Creating the Private Key and SSL Certificate

We need to create a SSL certificate that we can use within the app to facilitate the SSL handshake and so forth.

We are going to use OpenSSL. ([List of Open SSL Command Line Utilities](https://wiki.openssl.org/index.php/Command_Line_Utilities))

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

This will write a new private key to `key.pem` and some additional information will be asked to be incorporated into the certification request, as follows:

```bash
Generating a RSA private key
.........+++++
.........................................+++++
writing new private key to 'key.pem'

---

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.

---

Country Name (2 letter code) [AU]:IN
State or Province Name (full name) [Some-State]:West Bengal
Locality Name (eg, city) []:Hooghly
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Zenius
Organizational Unit Name (eg, section) []:Zenius
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:jayanta@zenius.one
```

We can see two files being created, `key.pem` and `cert.pem`.
We are going to use these two files to create a HTTPS Server.

Let's modify our `config.js` to include a port for HTTPS.

---

## Updating Configuration

As we know HTTP and HTTPS conflict with each other. Hence we will now have to listen to two ports.

> **Note:** On most applications, HTTP is opened on Port 80, while HTTPS is opened on Port 443. This is the standard for production.

We will be doing the following configuration updates:

1. **Adding the HTTPS port in the `config.js`**,

```js
// Container for all environments
const environments = {};

// Development Environment (Default)
environments.development = {
  httpPort: 3000,
  httpsPort: 3001,
  name: 'development',
};

// Production Environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  name: 'production',
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Does currentEnvironment exist, if not default to 'development'
const env =
  typeof environments[currentEnvironment] !== 'undefined'
    ? environments[currentEnvironment]
    : environments.development;

export default env;
```

2. **Adding scripts to the `package.json`**,

```json
"scripts": {
  "start": "NODE_ENV=production nodemon index.js",
  "dev": "NODE_ENV=development nodemon index.js",
}
```

- Run `yarn dev` to start in Development Mode.
- Run `yarn start` to start in Production Mode.

---

## Isolating the `requestListener` handler function

Whether it is a request sent to the HTTP port or the HTTPS port, we want the request handling to be uniform. To make the code concise and avoid duplication, we will isolate the `requestListener` function from the existing HTTP server into it's own function and handle the requests in isolation. Then, we can use this same function for our HTTP server to handle incoming requests. The same handler function can now serve both HTTP and HTTPS connections.

```js
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
```

---

## Creating the HTTPS Server

The HTTPS key and certificate are to be passed as options. The key and certificate are what allows the HTTPS encryption and decryption to happen.

On **`index.js`**,

```js
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
```

---

# Service 1: `/ping`

The first route we want to build is `/ping`.

**Create the ping handler:**

```js
// ping handler
handlers.ping = (data, callback) => {
  callback(200);
};
```

**Update the router:**

```js
// Defining a Router
const router = {
  ping: handlers.ping,
};
```

---

# Storing Data

Since we are not using an external database in this project, we will be using the File System to store files. For this we will create a directory `.data` with further subfolders for `users`, `tokens`, `checks` to store data.

> **Note:** A directory that starts with a `.`, by convention is a hidden folder. It indicates that the files instead of `.data` are not logic but just files that are just written as the part of the application's processes.

Let's create a `lib` directory. This directory will store a number of files eventually but for now, we are just going to create a file inside this directory called `data.js` to work with the data inside the `.data` folder.

We will use the functions from the `data.js` to run CRUD operations for the data.

---

## CRUD Operations

We will run the basic CRUD operations - CREATE, READ, UPDATE, DELETE and also have a Search implementation to handle query for multiple files based on criteria.

```js
/**
 * Library for storing and editing data
 */

// Dependencies
import fs from 'fs';
import path from 'path';

// Solve for __dirname not defined in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Container for this module (to be exported)
const lib = {};

// Base Directory

lib.baseDir = path.join(__dirname, '../.data/');

// Write data to file
lib.create = (dir, file, data, callback) => {
  // Open the file for writing: (wx is a flag)
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to string (JSON.stringify(object))
      const dataString = JSON.stringify(data, null, 2);

      fs.writeFile(fileDescriptor, dataString, err => {
        if (!err) {
          fs.close(fileDescriptor, err => {
            if (!err) {
              callback(false);
            } else callback('Error closing new file');
          });
        } else callback('Error, writing to new file');
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, (err, data) => {
    callback(err, data);
  });
};

// Search files with criteria
lib.search = (dir, criteria, callback) => {
  fs.readdir(`${lib.baseDir}${dir}`, {}, (err, files) => {
    if (!err && files) {
      const entries =
        typeof criteria === 'object' ? Object.entries(criteria) : [];

      // Filter the files
      const results = files.filter(file => {
        const fileData = JSON.parse(
          fs.readFileSync(
            `${lib.baseDir}${dir}/${file}`,
            'utf8',
            (err, data) => {
              if (err) console.log(err);
              return data;
            }
          )
        );
        // Match criteria
        for (const entry of entries) {
          if (fileData[entry[0]] !== entry[1]) return false;
        }
        return true;
      });

      // Return the search results
      callback(false, results);
    } else callback(err, files);
  });
};

// Update data to a file
lib.update = (dir, file, data, callback) => {
  // Open the file for writing. Flag 'r+': Open up for writing, error if doesn't exist
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to a string
      const dataString = JSON.stringify(data, null, 2);

      // Overwrite the file and close it
      fs.writeFile(fileDescriptor, dataString, err => {
        if (!err) {
          fs.close(fileDescriptor, err => {
            if (!err) {
              callback(false);
            } else callback('Error closing the file');
          });
        } else callback('Error writing to an existing file');
      });

      // Truncate the file
      // fs.ftruncate(fileDescriptor, err => {
      //   if (!err) {
      //     // Write to the file and close it
      //     fs.writeFile(fileDescriptor, dataString, err => {
      //       if (!err) {
      //         fs.close(fileDescriptor, err => {
      //           if (!err) {
      //             callback(false);
      //           } else callback('Error closing the file');
      //         });
      //       } else callback('Error writing to an existing file');
      //     });
      //   } else callback('Error truncating file');
      // });
    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  });
};

// Delete a file
lib.delete = (dir, file, callback) => {
  // Unlinking: Removing the file from the file system
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, err => {
    if (!err) {
      callback(false);
    } else callback('Error deleting file');
  });
};

export default lib;
```

---

## Testing CRUD Operations

And we will run some tests against these CRUD functions:

```js
import { default as _data } from './lib/data.js';

/** Testing */

// Create
_data.create('test', 'newFile', { foo: 'bar' }, error => {
  console.log({ error });
});

// Read
_data.read('test', 'newFile', (error, data) => {
  const decoder = new StringDecoder('utf-8');
  const buffer = '' + decoder.write(data);
  console.log({ error, data: JSON.parse(buffer) });
});

// Update
_data.update('test', 'newFile', { fizz: 'bizz' }, error => {
  console.log({ error });
});

// Delete
_data.delete('test', 'newFile', error => {
  console.log({ error });
});
```

---

# Service 2: `/users`

---

# Service 3: `/tokens`

---

# Service 4: `/checks`

The next service we want to build is called `checks`. `checks` is the meat of the application. A `check` is a task that tells our system, "Go check this URL, every X seconds and tell the user if the URL is up or down."

---

# Connecting to Twilio API to send SMS

---

# Background Workers to perform checks

At this point, we are changing the nature of our application from a server that starts up and listens on a port to an application that starts up, listens on a part AND starts background processes.

Out current index.js looks like this.

```js
import http from 'http';
import https from 'https';
import url from 'url';
import { StringDecoder } from 'string_decoder';
import fs from 'fs';
import env from './config.js';
import handlers from './lib/handlers.js';
import helpers from './lib/helpers.js';
import { default as _data } from './lib/data.js';

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

// Defining a Router
const router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  checks: handlers.checks,
};
```

So, this old structure we have that starts up the server and contains the server logic that is not enough anymore. We have to refactor this code so that it not only starts up a server by calling a `server.js` file but also starts workers by calling a `workers.js` file.

Refactoring to a `server.js`,

```js

```

## Creating the `workers.js` library

The reasons for creating the workers are as follows:

1. Workers will perform all the checks configured by all the users.
2. Gather up all the checks

```js
/**
 * Worker related tasks
 */

/** Dependencies */
import path from 'path';
import url from 'url';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { default as _data } from './data.js';
import helpers from './helpers.js';
import env from '../config.js';
import { default as _logs } from './logs.js';

// Solve for __dirname not defined in ES module scope. Not needed for CommonJS
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Instantiate the worker object
const workers = {};

// Lookup all checks, get their data and send to a validator
workers.getAllChecks = () => {
  // Get all the checks in the system
  _data.search('checks', {}, (err, checks) => {
    if (!err && checks.length > 0) {
      for (const check of checks) {
        const checkID = check.replace('.json', '');
        // Read in the check data
        _data.read('checks', checkID, (err, data) => {
          if (!err && data) {
            // Pass data to check validator function
            workers.validateChecks(data);
          } else console.log('Error: Reading check data');
        });
      }
    } else console.log('Error: Could not find any checks to process!');
  });
};

/** Validator function: Sanity checking the check data */
workers.validateChecks = data => {
  data = typeof data === 'object' ? data : {};

  data.id =
    typeof data?.id === 'string' && data.id.trim().length === 2 * 20
      ? data.id.trim()
      : false;

  data.phone =
    typeof data?.phone === 'string' && data.phone.trim().length === 10
      ? data.phone.trim()
      : false;

  data.protocol =
    typeof data?.protocol === 'string' &&
    ['https', 'http'].includes(data.protocol)
      ? data.protocol
      : false;

  data.url =
    typeof data?.url === 'string' && data.url.trim().length > 0
      ? data.url.trim()
      : false;

  data.method =
    typeof data.method === 'string' &&
    ['post', 'get', 'put', 'delete'].includes(data.method)
      ? data.method
      : false;

  data.successCodes =
    Array.isArray(data?.successCodes) && data.successCodes.length > 0
      ? data.successCodes
      : false;

  data.timeoutSeconds =
    typeof data?.timeoutSeconds === 'number' &&
    data.timeoutSeconds % 1 === 0 &&
    data.timeoutSeconds >= 1 &&
    data.timeoutSeconds <= 5
      ? data.timeoutSeconds
      : false;

  // Set the keys that may not be set (if the workers have never seen this check before)
  // state, lastChecked

  data.state =
    typeof data?.state === 'string' && ['up', 'down'].includes(data.state)
      ? data.state
      : 'down';

  data.lastChecked =
    typeof data?.lastChecked === 'number' && data.lastChecked > 0
      ? data.lastChecked
      : false;

  // If all checks pass, pass the data along to the next step of the process
  if (
    data.id &&
    data.phone &&
    data.protocol &&
    data.method &&
    data.url &&
    data.successCodes &&
    data.timeoutSeconds
  ) {
    workers.performCheck(data);
  } else {
    console.log('Error: Sanity check while running workers failed.');
  }
};

/** Perform the check. Send the original check data and forward the outcome of the check process */
workers.performCheck = data => {
  // Prepare the initial check outcome
  const checkOutcome = {
    error: false,
    responseCode: false,
  };

  // Mark that the outcome hasn't been sent yet
  let outcomeSent = false;

  // Parse the hostname and path out of the original data
  const parsedUrl = url.parse(`${data.protocol}://${data.url}`, true);
  const hostname = parsedUrl.hostname;
  const path = parsedUrl.path; // Using path and not 'pathname' because we want the query string

  // Construct the request
  const requestDetails = {
    protocol: data.protocol + ':',
    hostname,
    method: data.method.toUpperCase(),
    path,
    timeout: data.timeoutSeconds * 1000, // Converting to miliseconds
  };

  // Get the protocol
  const _protocol = data.protocol === 'http' ? http : https;

  // Instantiate the request object (using either the 'http' or 'https' module)
  const req = _protocol.request(requestDetails, res => {
    // Update the checkOutcome object and pass the data along
    checkOutcome.responseCode = res.statusCode;

    if (!outcomeSent) {
      workers.processCheckOutcome(data, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to the error so it doesn't get thrown
  req.on('error', e => {
    // Update the checkOutcome and pass the data along
    checkOutcome.error = { error: true, value: e };

    if (!outcomeSent) {
      workers.processCheckOutcome(data, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to the timeout event
  req.on('timeout', e => {
    // Update the checkOutcome and pass the data along
    checkOutcome.error = { error: true, value: 'timeout' };

    if (!outcomeSent) {
      workers.processCheckOutcome(data, checkOutcome);
      outcomeSent = true;
    }
  });

  // End the request / Send the request
  req.end();
};

/**
 * Process the checkOutcome, update the check data as needed and trigger an alert to the user
 *
 * Special logic for accomodating a check that has never been tested before (don't alert)
 *
 */
workers.processCheckOutcome = (data, checkOutcome) => {
  // Decide if the check is 'up' or 'down'
  const state =
    !checkOutcome.error &&
    checkOutcome.responseCode &&
    data.successCodes.includes(checkOutcome.responseCode)
      ? 'up'
      : 'down';

  // Decide if an alert is required. Only if state is modified send alerts otherwise don't
  const alertReqd = !data.lastChecked && data.state !== state;

  // Log the outcome
  const timeOfCheck = Date.now();
  workers.log({
    check: data,
    outcome: checkOutcome,
    state,
    alert: alertReqd,
    time: timeOfCheck,
  });

  // Update the check data
  const newData = {
    ...data,
    state,
    lastChecked: timeOfCheck,
  };

  // Save the data
  _data.update('checks', newData.id, newData, err => {
    if (!err) {
      // Send the newData to the next phase in the process if needed
      if (alertReqd) {
        // Send alert
        workers.alertUser(newData);
      } else console.log(`The status has not changed for check ${newData.id}.`);
    } else
      console.log(
        `Error: Trying to save updates while running checks on check ${newData.id}!`
      );
  });
};

/** Alert User to a change in check status */
workers.alertUser = data => {
  // Craft message
  const message = `Alert: Your check for ${data.method.toUpperCase()} ${
    data.protocol
  }://${data.url} 
    is currently ${data.state.toUpperCase()}`;

  // Send message
  helpers.sendTwilioSMS(data.phone, message, err => {
    if (!err) {
      console.log(
        `User was alerted via SMS to a status change in check ${data.id}!`
      );
    } else
      console.log(
        `Error: Failure to send SMS to user: ${data.phone} for a status change in check ${data.id}!`
      );
  });
};

// Log
workers.log = data => {
  // Determine the name of the log file
  const logFileName = data.check.id;

  // Append the log string to the file
  _logs.append(logFileName, data, err => {
    if (!err) {
      console.log('Logging to file, succeeded.');
    } else console.log('Logging to file, failed.');
  });
};

// Timer to execute the worker process, once per minute
workers.loop = () => {
  setInterval(() => {
    workers.getAllChecks();
  }, 1000 * env.workers.checkInterval);
};

// Rotate (compress) the log files
workers.rotateLogs = () => {
  // List all the non-compressed Log files on the .logs folder
  _logs.list(false, (err, logs) => {
    if (!err && logs.length) {
      for (const log of logs) {
        // Compress the data to a different file
        const logId = log.replace('.log', '');
        const newFileId = `${logId}-${Date.now()}`;
        _logs.compress(logId, newFileId, err => {
          if (!err) {
            // Truncate the log
            _logs.truncate(logId, err => {
              if (!err) {
                console.log('Success: Truncating log file.');
              } else console.log('Error: Truncating log file.');
            });
          } else
            console.log(`Error: Compression failed for log file ${logId}`, err);
        });
      }
    } else console.log("Couldn't find any logs to rotate!");
  });
};

// Timer to execute the log rotation process, once per day
workers.rotationLoop = () => {
  setInterval(() => {
    workers.rotateLogs();
  }, 1000 * env.workers.rotationInterval);
};

// Create the Initialization method
workers.init = () => {
  // Send to console in yellow
  console.log('\x1b[33m%s\x1b[0m', 'Background workers are running!');

  // Execute all the checks
  workers.getAllChecks();

  // Call a loop to keep executing the checks periodically
  workers.loop();

  // Compress all the logs immediately
  workers.rotateLogs();

  // Call the compression loop so logs will be compressed later on
  workers.rotationLoop();
};

// Export the workers object
export default workers;
```

---

# Logging to Files

Logs to the terminal can be hard to read, especially when the log data gets too big. Hence the need arises to store these logs to a file on the file system.

But even the files will increase in size over time and become heavy. Hence we will also need to compress them and store them periodically (maybe once a day).

We need to accomplish the above goals by doing the following tasks:

1. Write the methods to rotate logs.
2. Run background workers storing the logs for every check done to files.
3. Update the `config.js` with the `rotationInterval` field set to an interval time in seconds.

---

## Write the methods to Rotate logs

Rotating logs means refers to three operations but we will also add an optional `decompress` method for future use:

1. List `.log` files.
2. Compressing a log file and storing into a new file.
3. Decompress a `.gz.b64` file to a string for reading (for future use).
4. Truncating the original log files.

### List `.log` files

This method lists all logs with the optiona to also include compressed logs

```js
// List all the logs and optionally include even compressed logs
lib.list = (includeCompressedLogs, callback) => {
  fs.readdir(lib.baseDir, (err, files) => {
    if (!err && files?.length) {
      const fileNames = [];
      for (const file of files) {
        // Add the .log files
        if (file.includes('.log')) {
          fileNames.push(file.replace('.log', ''));
        }

        // Add on the .gz files
        if (file.includes('.gz.b64') && includeCompressedLogs) {
          fileNames.push(file.replace('.gz.b64', ''));
        }
      }
      callback(false, fileNames);
    } else callback(err, files);
  });
};
```

### Compress a `.log` file into a `.gz.b64` file

```js
// Compress the contents of a .log file into a .gz.b64 file
lib.compress = (logID, fileID, callback) => {
  const source = `${logID}.log`;
  const destination = `${fileID}.gz.b64`;

  fs.readFile(`${lib.baseDir}/${source}`, 'utf8', (err, logFileData) => {
    if (!err && logFileData) {
      // Compress the data using gzip
      zlib.gzip(logFileData, (err, buffer) => {
        if (!err && buffer) {
          // Send the data to the destination file
          fs.open(`${lib.baseDir}/${destination}`, 'wx', (err, fd) => {
            if (!err && fd) {
              // Write to destination file
              fs.writeFile(fd, buffer.toString('base64'), err => {
                if (!err) {
                  // Close file
                  fs.close(fd, err => {
                    if (!err) callback(false);
                    else callback('Error: Closing the file');
                  });
                } else callback(err);
              });
            } else callback(err);
          });
        } else callback(err);
      });
    } else callback(err);
  });
};
```

### Decompress a `.gz.b64` file into a string

```js
// Decompress the contents of a .gz.b64 file into a string variable
lib.decompress = (fileID, callback) => {
  const fileName = `${fileID}.gz.b64`;

  fs.readFile(`${lib.baseDir}/${fileName}`, 'utf8', (err, data) => {
    if (!err && data) {
      // Decompress the data
      const inputBuffer = Buffer.from(data, 'base64');
      zlib.unzip(inputBuffer, (err, outputBuffer) => {
        if (!err && outputBuffer) {
          // Callback
          const str = outputBuffer.toString();
          callback(false, str);
        }
        callback(err);
      });
    } else callback(err);
  });
};
```

### Truncate a `.log` file

```js
// Truncate a log file
lib.truncate = (logID, callback) => {
  fs.truncate(`${lib.baseDir}/${logID}.log`, err => {
    if (!err) {
      callback(false);
    } else callback(err);
  });
};
```

---

## Run background workers

We will modify the background workers file in two places:

1. **The `workers.init()` method**
2. **Writing the `workers.rotateLogs` and `workers.rotationLoop()` methods to invoke using `init`**

### The `workers.init()` method

As soon as workers are initialized, the `rotateLogs()` function executes once and then starts the `rotationLoop()` process that we can periodically set to perform the `rotateLogs()` at a fixed interval.

```js
// Create the Initialization method
workers.init = () => {
  // Execute all the checks
  workers.getAllChecks();

  // Call a loop to keep executing the checks periodically
  workers.loop();

  // Compress all the logs immediately
  workers.rotateLogs();

  // Call the compression loop so logs will be compressed later on
  workers.rotationLoop();
};
```

### Writing the `workers.rotateLogs` and `workers.rotationLoop()` methods

- The **`workers.rotateLogs()`** compresses the uncompressed log files one by one and stores them as a new `.gz.b64` file. It also truncates the original log file that was compressed.
- The **`workers.rotationLoop`** sets the interval at which this `workers.rotateLogs()` is set to run.

```js
// Rotate (compress) the log files
workers.rotateLogs = () => {
  // List all the non-compressed Log files on the .logs folder
  _logs.list(false, (err, logs) => {
    if (!err && logs.length) {
      for (const log of logs) {
        // Compress and store the data to a different file
        const logId = log.replace('.log', '');
        const newFileId = `${logId}-${Date.now()}`;
        _logs.compress(logId, newFileId, err => {
          if (!err) {
            // Truncate the log
            _logs.truncate(logId, err => {
              if (!err) {
                console.log('Success: Truncating log file.');
              } else console.log('Error: Truncating log file.');
            });
          } else
            console.log(`Error: Compression failed for log file ${logId}`, err);
        });
      }
    } else console.log("Couldn't find any logs to rotate!");
  });
};

// Timer to execute the log rotation process, once per day
workers.rotationLoop = () => {
  setInterval(() => {
    workers.rotateLogs();
  }, 1000 * env.workers.rotationInterval);
};
```

---

# Logging to the Console

Logging to files is a great way to store data for easier reading at a later time. However, there are many reasons why you may want to log to the console. But it maybe harder to view or pinpoint a given line, the more we log to the console.

We can use some techniques to distinguish the logs to the console and even tell Node when to log to the console.

## Adding colours to `console.log` output

There's a lot of information getting sent to the console via `console.log` at various places at our code. We want some of these to stand out so that we can get the information right away. One way to do this is to colour code certain `console.log` messages.

For example, we might want to colour code the following:

| Message                                                       | Colour  | ANSI Colour Code    |
| ------------------------------------------------------------- | ------- | ------------------- |
| Background workers are running!                               | Yellow  | `\x1b[33m%s\x1b[0m` |
| Server is listening on PORT 3000 in development mode! (http)  | Cyan    | `\x1b[36m%s\x1b[0m` |
| Server is listening on PORT 3001 in development mode! (https) | Magenta | `\x1b[35m%s\x1b[0m` |

The way to use this to output at the `console.log` is to prepend the console.log with an additional argument containing the ANSI Colour Code -

In `workers.js` in the `workers.init()` method,

```js
workers.init = () => {
  // Send to console in yellow
  console.log('\x1b[33m%s\x1b[0m', 'Background workers are running!');

  // other initializations
  // ....
};
```

Similarly in `server.js` in the `server.init()` method,

```js
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
```

> **References:**
>
> - [ANSI Escape Sequences](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797)

---

## Using the `util.debuglog` from the `util` module with `NODE_DEBUG`

There are a lot of logs which are more of a **_'matter-of-factly'_**. We do not want to see the logs all the time, or in other words, we may want to see these logs optionally with an easy way to toggle them on and off, rather than commenting out blocks of `console.log` statements in our code.

We can do this by using the `util` library that comes in-built with `Node.js`, specifically by using the **`util.debuglog()`** method and Node's **`NODE_DEBUG`** command line argument:

### The `NODE_DEBUG` Command Line Argument

**Syntax:**

```bash
NODE_DEBUG=[module] node [filename]
```

To demonstrate, we can start the server by using,

```bash
NODE_DEBUG=http node index.js
```

We can see a whole flurry of debug messages coming through when we use the `NODE_DEBUG={module}` command related to the module with process IDs. This will work on any of the node modules that sends out debug messages.

The **`NODE_DEBUG`** command line argument can also be used to specify your own packages or specify your own bits and pieces of console logging. This is done with the utilities package (**`util`**).

---

### The `util.debuglog` method

- `section <string>` - A string identifying the portion of the application for which the debuglog function is being created.
- `callback <Function>` - A callback invoked the first time the logging function is called with a function argument that is a more optimized logging function.
- `Returns: <Function>` - The logging function

The `util.debuglog()` method is used to create a function that conditionally writes debug messages to `stderr` based on the existence of the `NODE_DEBUG` environment variable. If the section name appears within the value of that environment variable, then the returned function operates similar to `console.error()`. If not, then the returned function is a no-op.

In **`workers.js`**,

```es6
import util from 'util';

const debug = util.debuglog('workers');

// Replace all console logging that we want to be done OPTIONALLY only when passed with NODE_DEBUG=workers with debug('Error')
```

In Command Line,

```bash
NODE_DEBUG=workers node index.js
```

This means, that if we do not pass `NODE_DEBUG=workers` in the command line while running the `index.js` file, all these optional debug messages related to workers will not show up on the terminal.

Now, we can use this to optionally turn on and off debug messages.

---
