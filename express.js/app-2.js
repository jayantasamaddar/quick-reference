require('dotenv').config();
const express = require("express");
const path = require('path');
const logger = require('./middleware/logger')

// Initialize Express
const app = express();

// Assign Environment Variable to PORT or default to Port 5000
const PORT = process.env.PORT2 || 6000;

// Initialize Middleware - Must initialize Middleware before routes
app.use(logger);

/***********************************************************************************************/
// Basic Homepage Route Handler/Endpoint
/***********************************************************************************************/

// Create your endpoints/route handlers
// router.get("/", (req, res) => {
//     res.send("Hello world");
//     console.log(`Server running on Port ${PORT}!`);
// });

/***********************************************************************************************/
/* Set Static Folder - Useful when we want to serve static pages from a single folder
/***********************************************************************************************/
// - Avoids creating multiple sendFile responses to different routes
// - Except the root, the other HTML files need to be referenced with .html extension

app.use(express.static(path.join(__dirname, "public")));

// Customers Router
app.use('/api/v2/customers', require('./routes/api/customers'));

// Listen on port
app.listen(PORT, () => console.log(`Running server at http://localhost:${PORT}`));