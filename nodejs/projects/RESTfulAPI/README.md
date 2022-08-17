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

We need to create a SSL certificate that we can use within the app to facilitate the SSL handshake and so forth.

We are going to use OpenSSL. ([List of Open SSL Command Line Utilities](https://wiki.openssl.org/index.php/Command_Line_Utilities))

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

This will write a new private key to key.pem and some information will be asked to be incorporated into the certification request.

```
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

As we know HTTP and HTTPS conflict with each other. Hence we will now have to listen to two ports.
On most applications, HTTP is opened on Port 80, while HTTPS is opened on Port 443. This is the standard for production.

The HTTPS key and certificate are to be passed as options. The key and certificate are what allows the HTTPS encryption and decryption to happen.

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

Let's create a directory called `.data`.
Since it starts with a `.`, by convention this is a hidden folder.
It indicates that the files instead of `.data` are not logic but just files that are just written as the part of the app's processes.

Let's create a `lib` directory. This directory will store a number of files eventually but for now, we are just going to create a file inside this directory called `data.js` to work with the data inside the `.data` folder.

We will create CRUD operations for the data.

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

// Update data to a file
lib.update = (dir, file, data, callback) => {
  // Open the file for writing. Flag 'r+': Open up for writing, error if doesn't exist
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to a string
      const dataString = JSON.stringify(data, null, 2);

      // Truncate the file
      fs.ftruncate(fileDescriptor, err => {
        if (!err) {
          // Write to the file and close it
          fs.writeFile(fileDescriptor, dataString, err => {
            if (!err) {
              fs.close(fileDescriptor, err => {
                if (!err) {
                  callback(false);
                } else callback('Error closing the file');
              });
            } else callback('Error writing to an existing file');
          });
        } else callback('Error truncating file');
      });
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
