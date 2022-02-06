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
  birthdate: Date,
  email: String,
  phone: String,
  phone_extension: String,
  country: String
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
const User = mongoose.model('User', userSchema);     // 'model' is case-sensitive
```

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

/* Export Mongoose Model */
module.exports = mongoose.model('User', userSchema);
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
> - Arrow functions can be used only when `this` references are not made and do not need to be returned.

------------------------------------------------------------------------------------------------------

## Custom Validation using Middleware

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

# References
1. [Mongoose Official](https://mongoosejs.com/)