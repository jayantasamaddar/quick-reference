# What is Express?
Express is a fast, unopinionated and minimalistic web framework for Node.js

Express is a **"server-side"** or **"backend"** framework. It is not comparable to client-side frameworks like React, Vue or Angular. It can be used in combination with those frameworks to build full-stack applications.

------------------------------------------------------------------------------------------------------

# Why use Express?
- Makes building applications with Node.js **MUCH** easier.
- Used for server rendered apps as well as API/Microservices.
- Extremely fast, lightweight and free.
- Full control of request and response.
- By far the most popular Node framework.
- Great to use with client-side frameworks, as it is all JavaScript.

------------------------------------------------------------------------------------------------------

# Basic Server Syntax
```
const express = require("express");

// Initialize Express
const app = express();

const PORT = 3000;

// Create your endpoints/route handlers
app.get("/", (req, res) => {
    res.send("Hello world");
    console.log(`Server running on Port ${PORT}!`);
});

// Listen on a port
app.listen(PORT);
```

------------------------------------------------------------------------------------------------------

# Basic Route Handling
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

`**app.METHOD(PATH, HANDLER)**`

#### Syntax
```
app.get("/", (req, res) => {
    // Fetch from database
    // Load pages
    // Return JSON
    // Full access to request and response
})
```

Where,

- **app is an instance of express.**
- **METHOD is an HTTP request method, in lowercase.** (E.g. `app.get()`)
- **PATH is a path on the server.** (E.g. '/' for the homepage or '/about' for the about page)
- **HANDLER is the function executed when the route is matched.** (E.g. a callback function that passes two objects `req` and `res` as parameters)


#### Features of Routing in Express

- Can use METHODS - `app.get()`, `app.post()`, `app.put()`, `app.delete()`, etc.
- Every Route created has access to the Request and Response objects.
- Access to params, query strings, URL parts, etc.
- Express has a router, so we can store routes in separate files and export.
- We can parse incoming data with the Body Parser.

------------------------------------------------------------------------------------------------------

## Request and Response Objects
Express.js Request and Response objects are the parameters of the callback function which is used in Express applications.

##### Request Object
The express.js request object (req) represents the HTTP request and has properties for the request query string, parameters, body, protocol, HTTP headers, and so on.

------------------------------------------------------------------------------------------------------

##### Response Object
The Response object (res) specifies the HTTP response which is sent by an Express app when it gets an HTTP request.

**What it does?**
- It sends response back to the client browser.
- It facilitates you to put new cookies value and that will write to the client browser (under cross domain rule).
- Once you `res.send()` or `res.redirect()` or `res.render()`, you cannot do it again, otherwise, there will be uncaught error.

###### Response Object Methods

1. `**res.send()**`
The res.send() function sends the HTTP response. The body parameter can be a String, HTML, a Buffer object or an object or an Array.

**Syntax**
`res.send( [body] )`

Where,
- **'body' is a single parameter String, HTML, Buffer, Array or Object that describe the body which is to be sent in the response.** 

It returns an object.

2. `res.sendFile()`
The res.sendFile() function transfers the file at the given path and it sets the Content-Type response HTTP header field based on the filename extension.

**Syntax:** 
`res.sendFile(path [, options] [, fn])`

Where,

- **'path' parameter describes the path**
- **'options' parameter contains various properties like maxAge, root, etc**
- **'fn' is the callback function**

It returns an object.

**Example 1** - Get the **account.html** file from the **"private** directory and display it on the **"/account"** route:
```
app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "private", "account.html"), {}, (err) => {
        if(err) throw err;
        else {
            console.log(`Visited the Account Page!`);
        }
    });
});
```

3. `**res.json()**`
The res.json() function sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.

**Syntax:**
`res.json( [body] )`

Where,

- **'body' is an Object.**

It returns an object.

**Example 1** - Send JSON data not located in a File
```
// Get an external file of customer data - an array of customer objects
const customers = require('./data/customers.json').customers;

// Send Multiple Customers/Members/Users Data stored in an array.
app.get(`/api/customers.json`, (req, res) => res.json(customers));
```

4. `**res.end()**`
The res.end() function is used to end the response process. This method actually comes from the Node core, specifically the response.end() method of HTTP.ServerResponse. Use to quickly end the response without any data.

**Syntax:**
`res.end([data] [, encoding])`

**Example:**
```
app.get('/', function(req, res){
    res.end();
});
```

5. `**res.redirect()**`
The res.redirect() function redirects to the URL derived from the specified path, with specified status, a integer (positive) which corresponds to an HTTP status code. The default status is “302 Found”.

**Syntax:**
`res.redirect([status, ] path)`

Where,

- **'status' parameter holds the HTTP status code**
- **'path' parameter describes the path**


6. `**res.render()**`
The res.render() function is used to render a view and sends the rendered HTML string to the client. 

**Syntax:** 
`res.render(view [, locals] [, callback])`

Where, 

- **'locals' is an object whose properties define local variables for the view.**
- **'callback' is a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes next(err) internally.**
- The view argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the views setting. If the path does not contain a file extension, then the view engine setting determines the file extension. If the path does contain a file extension, then Express will load the module for the specified template engine (via require()) and render it using the loaded module’s __express function.

------------------------------------------------------------------------------------------------------

## Express Middleware
Middleware functions are functions that have access to the Request and Response objects. Express has a built-in middleware but middleware also comes from third-party packages as well as custom middleware.

### What can we do with Middleware in Express?

- Execute any code
- Make changes to the Request and Response object
- End request-response cycle
- Call the next middleware in the stack

### Following is a list of possibly used middleware in Express.js app:

- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware

### How to use a Middleware with Express.js?
- Declare and initialize Middleware before routes are defined.
- Middleware function must contain the Request, Response Objects and the next() function.
- Middleware is a function, just like route handlers and invoked also in the similar manner.

### Why would we want to use a Middleware?

##### Use Case 1 - To record every time we get a request 
```
const express = require("express");
const app = express();
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
    next();
};

// Initialize Middleware
app.use(logger);

// Static Route
app.use(express.static(path.join(__dirname, "public")));
```

------------------------------------------------------------------------------------------------------

# express.Router() Function

The top-level express object has a Router() method that creates a new router object to handle requests.

**Syntax:**
```
**const express = require('express');
const router = express.Router();**
```

A Router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.

Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application.

**Example 1 - Organise all customer related routers on a separate file :-**

###### In customers.js
-----------------------
```
const express = require('express');
const router = express.Router();

const customers = require('../../data/customers.json').customers;

/* Send Multiple Customers/Members/Users Data stored in an array */

router.get(`/`, (req, res) => res.json(customers));

/* Send individual Customer Data for a specific request */

router.get(`/:id`, (req, res) => {
    if(customers.some(customer => customer.id === parseInt(req.params.id))) {
        res.json(customers.find(customer => {
            return customer.id === parseInt(req.params.id);
        }));
        console.log("Request successfully processed with Find Array Method");
    } else {
        res.status(400).json({"error": `Customer with 'id: ${req.params.id}' not found!`});
        console.log("400: Bad Request! Request processed with Find Array Method could not find customer.");
    }   
});

// Export router

module.exports = router;
```

###### In app2.js
-----------------------
```
require('dotenv').config();
const express = require("express");

// Initialize Express
const app = express();

// Assign Environment Variable to PORT or default to Port 5000
const PORT = process.env.PORT2 || 6000;

// Customers Router
app.use('/api/v2/customers', require('./routes/api/customers'));

// Listen on port
app.listen(PORT, () => console.log(`Running server at http://localhost:${PORT}`));
```