require('dotenv').config();
const express = require("express");
const path = require('path');
const logger = require('./middleware/logger')

// Initialize Express
const app = express();

// Assign Environment Variable to PORT or default to Port 5000
const PORT = process.env.PORT || 5000;

// Initialize Middleware - Must initialize Middleware before routes
app.use(logger);

/***********************************************************************************************/
// Basic Homepage Route Handler/Endpoint
/***********************************************************************************************/

// Create your endpoints/route handlers
// app.get("/", (req, res) => {
//     res.send("Hello world");
//     console.log(`Server running on Port ${PORT}!`);
// });

/***********************************************************************************************/
/* Set Static Folder - Useful when we want to serve static pages from a single folder
/***********************************************************************************************/
// - Avoids creating multiple sendFile responses to different routes
// - Except the root, the other HTML files need to be referenced with .html extension

app.use(express.static(path.join(__dirname, "public")));

/***********************************************************************************************/
/* Use res.sendfile() to respond to a GET Request */
/***********************************************************************************************/
// Respond to a GET request with a file (usually a non-static file or one in another folder)

// HTML File
app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "private", "account.html"), {}, (err) => {
        if(err) throw err;
        else {
            console.log(`Visited the Account Page!`);
        }
    });
});

// JSON file
app.get("/api/customers", (req, res) => {
    res.sendFile(path.join(__dirname, "data", "customers.json"), {}, (err) => {
        if(err) throw err;
        else {
            console.log(`Returned customers.json file!`);
        }
    });
});

/***********************************************************************************************/
/* Use res.json() to send JSON Data not located in a file as a response to a GET Request */
/***********************************************************************************************/

// Require file
const customers = require('./data/customers.json').customers;

// Send Multiple Customers/Members/Users Data stored in an array.
app.get(`/api/customers.json`, (req, res) => res.json(customers));

/***********************************************************************************************/
/* Send individual Customer Data for a specific request */
/***********************************************************************************************/

/* Method 1 - Using forEach */
// - Not preferable as the entire array is looped over no matter request

app.get(`/api/v1/customers/:id`, (req, res) => {
    if(customers.some(customer => customer.id === parseInt(req.params.id))) {
        customers.forEach(customer => {
            if(customer.id === parseInt(req.params.id)) {
                res.json(customer);
            }
        });
    } else {
        res.status(400).json({"error": `Customer with 'id: ${req.params.id}' not found!`});
        console.log("400: Bad Request! Request processed with forEach Array Method could not find customer.");
    }
});

// Method 2 - Using find
// - Find returns the first element if the condition matches
// - Fastest as it skips loop if element found, else executes a function for each element
// - Returns "undefined" if no elements are found
// - Does not execute the function for empty elements
// - Does not change the original array

app.get(`/api/v2/customers/:id`, (req, res) => {
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

// Method 3 - Using filter
// - Filter returns a new array containing all elements that match conditions
// - Does not execute the function for empty elements
// - Does not change the original array
// - Since id is unique and returns only one element, we need to use [0] to get it from the new array

app.get(`/api/v3/customers/:id`, (req, res) => {
    if(customers.some(customer => customer.id === parseInt(req.params.id))) {
        res.json(customers.filter(customer => {
            return customer.id === parseInt(req.params.id);
        })[0]);
        console.log("Request processed with Filter Array Method");
    } else {
        res.status(400).json({"error" : `Customer with 'id: ${req.params.id}' not found!`});
        console.log("400: Bad Request! Request processed with Filter Array Method could not find customer.");
    } 
});

// Listen on port
app.listen(PORT, () => console.log(`Running server at http://localhost:${PORT}`));