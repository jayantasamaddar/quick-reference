const express = require('express');
const router = express.Router();

const customers = require('../../data/customers.json').customers;

/* GET Multiple Customers/Members/Users Data stored in an array */

router.get(`/`, (req, res) => res.json(customers));

/* GET individual Customer Data for a specific request */

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

/* POST Customer Data */
router.post("/", (req, res) => {
    //res.send(req.body);
    const newCustomer = {
        id: customers.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        account_type: req.body.account_type,
        phone: req.body.phone,
        country_code: req.body.country_code,
        currency: req.body.currency
    };
    // Disable Bulk add - Check if Array
    const isArray = Array.isArray(req.body);
    console.log(isArray);
    if(isArray) {
        return res.status(400).json({ error: "Adding Customers in Bulk is not supported." });
    }
    // Check if Mandatory fields are present
    else if(!newCustomer.email) {
        return res.status(400).json({ error: "Email is a mandatory field" });
    }
    // Add to existing list of customers
    customers.push(newCustomer);
    console.log(`New Customer added! \n${JSON.stringify(newCustomer)}`);
    res.json(customers);
});

// Export router

module.exports = router;