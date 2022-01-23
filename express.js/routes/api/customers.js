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

    /* Perform Validation on Request Body */

    // Disable Bulk add - Check if req.body is an Array
    const isArray = Array.isArray(req.body);

    // Check if existing user by checking if Email exists
    const emailExists = customers.some(customer => customer.email === req.body.email);

    if(isArray) {
        return res.status(400).json({ error: "Adding Customers in Bulk is not supported." });
    }
    // Check if Mandatory fields are present and if Email is unique
    else if(!req.body.email || emailExists) {
        return res.status(400).json({ error: "Email is an unique, mandatory field" });
    }
    
    const customer = {
        id: customers.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        account_type: req.body.account_type,
        phone: req.body.phone,
        country_code: req.body.country_code,
        currency: req.body.currency
    };
    
    // Add to existing list of customers
    customers.push(customer);
    console.log(`New Customer added! \n${JSON.stringify(customer)}`);
    res.json({customer, message: `Customer {id: ${customer.id}} added successfully!`});
});

/* PUT Update Customer Data for a specific ID */
router.put("/:id", (req, res) => {

    /* Perform Validation on Request Body */

    // Disable Bulk add - Check if req.body is an Array
    const isArray = Array.isArray(req.body);

    // Validate ID - Check if req.body.id is a Valid existing ID
    const isValidID = customers.some(customer => customer.id === parseInt(req.params.id));

    if(isArray) {
        return res.status(400).json({ error: "Invalid Request. Send only one object." });
    }
    else if(!isValidID) {
        return res.status(400).json({ error: `Invalid Request. {id: ${req.params.id}} not found!` });
    }
    const update = req.body;
    customers.forEach(customer => {
        if(customer.id === parseInt(req.params.id)) {
            customer.firstname = update.firstname ? update.firstname : customer.firstname;
            customer.lastname = update.lastname ? update.lastname : customer.lastname;
            customer.email = update.email ? update.email: customer.email;
            customer["account_type"] = update["account_type"] ? update["account_type"]: customer["account_type"];
            customer.phone= update.phone ? update.phone : customer.phone;
            customer["country_code"] = update.firstname ? update.firstname : customer["country_code"];
            customer.currency = update.currency ? update.currency : customer.currency;
                
            console.log(`Customer updated! \n${JSON.stringify(customer)}`);
            res.json({ customer, message: "Customer updated successfully!" });
        }
    });
});

/* DELETE individual Customer Data for a specific request */
router.delete("/:id", (req, res) => {

    /* Perform Validation on Request Body */

    // Validate ID - Check if req.body.id is a Valid existing ID
    const isValidID = customers.some(customer => customer.id === parseInt(req.params.id));

    if(!isValidID) {
        return res.status(400).json({ error: `Invalid Request. {id: ${req.params.id}} not found!` });
    }

    // Delete customer using splice
    customers.splice(customers.findIndex(customer => customer.id === parseInt(req.params.id)), 1);
    res.json({ customers, message: `Customer {id: ${req.params.id}} deleted successfully!` })

});


// Export router

module.exports = router;