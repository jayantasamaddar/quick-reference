# What is Mongoose?
From the MongoDB Official Website,

> Mongoose provides an elegant MongoDB object modeling for Node.js.

> Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose.

```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

> Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

------------------------------------------------------------------------------------------------------

# Connect to MongoDB Database (`mongoose.connection`)

The first thing we need to do is include mongoose in our project and open a connection to a `test` database on our locally running instance of MongoDB. Mongoose creates a *default connection* when we use the `mongoose.connect()`.

**Syntax:**
```
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
```

Where,

- For brevity, let's assume that all following code is within the `main()` function.

------------------------------------------------------------------------------------------------------

# Connecting to Multiple MongoDB Databases

Sometimes, we may need to connect to multiple databases
To connect to multiple databases as per [Docs at Mongoosejs.com](https://mongoosejs.com/docs/connections.html#multiple_connections)

**Syntax:**
```
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
```

Where,

- For brevity, let's assume that all following code is within the `main()` function.

------------------------------------------------------------------------------------------------------

# Defining a Schema

With Mongoose, everything is derived from a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

Let's get a reference to it and define our `users`.

**Example:**
```
const mongoose = require('mongoose);
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  profile_photo: Buffer,
  birthdate: Date,
  email: String,
  phone: String,
  phone_extension: String,
  country: String,
  total_orders: Number,
  is_active: Boolean,
});
```

### Permitted SchemaTypes:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map
- [GeoJSON](https://mongoosejs.com/docs/geojson.html)

If you want to add additional keys later, use the Schema#add method.

------------------------------------------------------------------------------------------------------

# [Mongoose Model](https://mongoosejs.com/docs/models.html)
Models are fancy constructors compiled from Schema definitions. In Mongoose, a Model is a wrapper for the schema. An instance of a model is called a document. If the schema defines the structure for the document, like the type and validations, a Mongoose model provides an interface to the database. So by using the model, we will be able to Create, Update, Query and Delete documents with ease.

**Syntax:**

```
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  someKey = SchemaType
})
const User = mongoose.model('User', userSchema, 'users');     // 'model' is case-sensitive
```

> Where,
> - '**SchemaType**' is a [SchemaType] (https://mongoosejs.com/docs/schematypes.html)
> - '**User**' is the name used to refer to the model anywhere in the app.
> - '**userSchema**' is the schema to be followed to validate the model.
> - '**users**' is an optional parameter that is used to create the collection for the model in the database. It defaults to the lowercase plural of the model name.



**Example:**
```
/* Define Schema */
const mongoose = require('mongoose);
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  birthdate: Date,
  email: String,
  phone: String,
  phone_extension: String,
  country: String
});

User = mongoose.model('User', userSchema, 'users');

// Export Mongoose Model
module.exports = User
```

------------------------------------------------------------------------------------------------------

# Constructing Documents
An instance of a model is called a document. Creating them and saving to the database is easy.

------------------------------------------------------------------------------------------------------

# Advanced Model Validation
We can run advanced modelvalidations inline by using the `validate` property and running a `validator` function, or by running a middleware that validates `pre` or `post` a Mongoose query.

## Inline Validation using `validate` property

**Example 1 - With inline `validate` and without a custom `message`. (Uses default error message)**
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    order_date: { type: Date, required: true },
    invoice_date: { 
        type: Date,
        validate: function(date) { return date > this.order_date }
    }
});
```

> **Note:** 
> - Use the *function()* declaration instead of arrow functions when using `this` keyword.
> - Function declaration as function() has to be returned using the `return` keyword.
> - Arrow functions can be used only when `this` references are not made and do not need to be returned.


**Example 2 - With `validator` and `message`**
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    order_date: { type: Date, required: true },
    invoice_date: { 
        type: Date,
        validate: {
          validator: function(date) { return date > this.order_date },
          message: "'invoice_date' cannot be earlier than 'order_date'"
        }
    }
})
```

**Example 3 - Arrow function with `validator` and `message`**
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    email: { 
        type: String, 
        maxlength: 200, 
        lowercase: true, 
        unique: true,
        validate: {
        validator: (email) => isEmail(email),
        message: "Invalid Email"
      }
    }
});
```
> **Note:** 
> - Arrow functions can be used only when `this` references are not made and do not need to be returned with the return keyboard (it is implied as long as there are no variable declarations that require multiple statements).

------------------------------------------------------------------------------------------------------

## Custom Validation using Middleware
Middleware are useful for atomizing model logic. 

Here are some other ideas:

- complex validation
- removing dependent documents (removing a user removes all their blogposts)
- asynchronous defaults
- asynchronous tasks that a certain action triggers

**Example 1 - Pre-Validation**

```
OrderSchema.pre('validate', function(next) {
    if(this.invoice_date < this.order_created_at) {
        next(new Error(`'invoice_date' cannot be earlier than 'order_created_at'`));
    } else next();
});
```
> **Note:** 
> - Use the *function()* declaration instead of arrow functions when using `this` keyword.
> - Function declaration as function() has to be returned using the `return` keyword.
> - As a rule of thumb, when working with mongoose schemas it is preferable to use the *function()* declaration, until `this` becomes local scope for arrow functions.
> Middleware should have the `next()` function to push the result of the middleware onto the next middleware in the queue.

------------------------------------------------------------------------------------------------------

# Using Middleware to Update a Document, Subdocument or Related Documents (accessed by foreign key)

Mongoose Middleware has plenty of caveats.

### Use Case 1: Run Middleware before Contacts are Saved

**Note:** `updateOne` will not let the document be accessible with `this`. Therefore, we must first retrieve the document in order to update the query before letting it go to the next middleware.
However, in this case, this particular modification of modifying the count `pre` is a wrong approach as this contact update is happening even before the order is actually created, hence, it will always be one short. We will update it correctly by instead targetting the OrderSchema as in Use Case (3) or (4).

```
ContactSchema.pre('updateOne', async function(next) {
    try {
        const data = this.getUpdate();
        const doc = await this.model.findOne({acount_id: data["account_id"], email: data.email});
        this.getUpdate().$set["orders_count"] = doc.orders?.length;
        this.getUpdate().$set["shipments_count"] = doc.shipments?.length;
        console.log(this.getUpdate());
        next();
    } catch(error) {
        return next(error);
    }
});
```

### Use Case 2: Run Middleware before Contacts are Updated

**Note:** `updateOne` will not return the updated Document ibut findOneAndUpdate will. Since the `post` middleware has access the the returned response, this is true for it as well.

```
ContactSchema.post('findOneAndUpdate', async function(doc, next) {
    try {
        doc["orders_count"] = doc.orders?.length;
        doc["shipments_count"] = doc.shipments?.length;
        await doc.save();
        next();
    } catch(error) {
        return next(error);
    }
});
```


### Use Case 3: Run Middleware after Contacts are Updated

**Note:** `updateOne` will not return the updated Document ibut findOneAndUpdate will. Since the `post` middleware has access the the returned response, this is true for it as well.

```
ContactSchema.post('findOneAndUpdate', async function(doc, next) {
    try {
        doc["orders_count"] = doc.orders?.length;
        doc["shipments_count"] = doc.shipments?.length;
        await doc.save();
        next();
    } catch(error) {
        return next(error);
    }
});
```

**Use Case 4: Run Middleware just before Order is created to also update the Customer**

Best Solution as it only updates when Order is saved which is usually during creation unless explicitly done elsewhere.

```
OrderSchema.pre('save', async function(next) {
    try {
        const contact = await Contact.findById(this.customer);
        contact.orders_count = contact.orders?.length;
        contact.shipments_count = contact.shipments?.length;
        contact.save();
        next();
    }
    catch(error) {
        return next(error);
    }
});
```

**Use Case 5: Run Middleware just after Order is deleted to also update the Customer's list of orders**

```
OrderSchema.post('findOneAndDelete', async function(doc, next) {
    try {
        const contact = await Contact.findById(doc.customer);
        contact.orders.pull(doc._id);
        contact.orders_count = contact.orders?.length;
        contact.shipments_count = contact.shipments?.length;
        contact.save();
        next();
    }
    catch(error) {
        return next(error);
    }
});
```

**Use Case 5b: Run Middleware just after Order is saved using .save() or create**
```
OrderSchema.post('save', async function(doc, next) {
    try {
        const existingContact = await Contact.findOne(doc.account_id, doc.email);
        if(!existingContact) {
            const customerData = {  
                account_id: doc.account_id,
                email: doc.email,
                phone: doc.billing_address.phone,
                firstname: doc.billing_address.firstname,
                lastname: doc.billing_address.lastname,
                address1: doc.billing_address.address1,
                address2: doc.billing_address.address2,
                city: doc.billing_address.city,
                province: doc.billing_address.province,
                zip: doc.billing_address.zip,
                country: doc.billing_address.country,
                province_code: doc.billing_address.province_code,
                country_code: doc.billing_address.country_code,
                orders: [doc._id],
                orders_count : 1,
                last_order_id : doc._id,
                total_spent: doc.total_amount
            }
            const contact = await Contact.create(customerData);
            doc.customer_id = contact._id;
            await doc.save();
        } 
        else {
            doc.customer = existingContact._id;
            await doc.save();
            existingContact.last_order_id = doc._id;
            existingContact.orders.push(doc._id);
            existingContact.orders_count = existingContact.orders?.length;
            existingContact.shipments_count = existingContact.shipments?.length;
            existingContact.total_spent += doc.total_amount;
            await existingContact.save();
        }
    }
    catch(error) {
        console.log(error);
    }
    next();
});
```

### Use Case 6: The insertMany Middleware

**Note:** `insertMany` as of Mongoose 6.2.0 takes in function arguments in different orders as follows:


#### `insertMany` pre-Middleware
```
ContactSchema.pre('insertMany', async function(next, docs) {
    for(let i = 0; i < docs.length; i++) {
        if(!docs[i].phone_formatted || !docs[i].phone_number) {
            try {
                const { phone_formatted, phone_number, dialcode } = await PhoneParser(docs[i].phone, docs[i].country);
                docs[i].phone_number = phone_number;
                docs[i].phone_formatted = phone_formatted;
                docs[i].dialcode = dialcode;
            }
            catch(error) {
                console.log(error);
            }
        }
    }
    next();
});
```

#### `insertMany` post-Middleware
```
ContactSchema.post('insertMany', async function(docs, next) {
    for(let i = 0; i < docs.length; i++) {
        if(!docs[i].phone_formatted || !docs[i].phone_number) {
            try {
                const { phone_formatted, phone_number, dialcode } = await PhoneParser(docs[i].phone, docs[i].country);
                docs[i].phone_number = phone_number;
                docs[i].phone_formatted = phone_formatted;
                docs[i].dialcode = dialcode;
            }
            catch(error) {
                console.log(error);
            }
        }
    }
    next();
});
```

------------------------------------------------------------------------------------------------------

# References
1. [Mongoose Official](https://mongoosejs.com/)