require('dotenv').config();
const express = require("express");
const path = require('path');
const logger = require('./middleware/logger')

// Initialize Express
const app = express();

// Assign Environment Variable to PORT or default to Port 5000
const PORT = process.env.PORT2 || 6000;

// Initialize Middleware - Body Parser (Required to parse req.body as JSON)
app.use(express.json());

// Initialize Middleware - Body Parser (Required to handle form-data)
app.use(express.urlencoded( {extended: false} ));

// Initialize Middleware - Must initialize Middleware before routes
app.use(logger);

/***********************************************************************************************/
/* Set Static Folder - Useful when we want to serve static pages from a single folder
/***********************************************************************************************/
// - Avoids creating multiple sendFile responses to different routes
// - Except the root, the other HTML files need to be referenced with .html extension

app.use(express.static(path.join(__dirname, "public")));

// Customers API Routes
app.use('/api/v2/customers', require('./routes/api/customers'));

// Listen on port
app.listen(PORT, () => console.log(`Running server at http://localhost:${PORT}`));