require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router'); // Routing Package for Koa. Mandatory in almost all cases.
const json = require('koa-json'); //Optional: koa-json is a JSON pretty-printed response middleware.
const render = require('koa-ejs'); //As needed: Embedded JavaScript templating engine for Koa.
const bodyParser = require('koa-bodyparser'); //Koa bodyParser for parsing formdata

// Initialize PORT
const PORT = process.env.PORT;

// Initialize new Koa, Koa-Router instances
const app = new Koa();
const router = new Router();

// Import from Database in Production (To be used with Koa-EJS for this demo)
const things = ["My Family", "Dance", "Music", "Programming"];


/***************************************************************************************/
// Middlewares
/***************************************************************************************/

app.use(json()); //Optional: Initialize koa-json | koa-json is for prettifying

app.use(bodyParser()); //Optional: Initialize koa-bodyparser | koa-bodyparser is for parsing formdata

// Initialize Koa-Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// Initialize Koa-EJS Templating Engine
render(app, {
    root: path.join(__dirname, "views"), //folder where the template engine looks for templates
    layout: 'layout', //layout wraps all the views. Headers-Footers can be part of the layout.
    viewExt: 'html', //extension of the views. E.g. '.html'.
    cache: false,
    debug: false
});

// Simple Middleware - Text Body Response
// app.use(async ctx => ctx.body = "Hello World!");

// Simple middleware - JSON Body Response
// app.use(async ctx => ctx.body = {
//     firstname: "John",
//     lastname: "Doe"
// });


/***************************************************************************************/
// Basic Routing with Koa Router
/***************************************************************************************/

// Plain Text
router.get('/test', ctx => ctx.body = "Hello Test!");

// JSON
router.get('/contacts', async ctx => ctx.body = 
    [
        {
            firstname: "John",
            lastname: "Doe"
        },
        {
            firstname: "Jane",
            lastname: "Hill"
        },
    ]
);

/***************************************************************************************/
// Advanced Routing with Koa Router - Index using Template Engine EJS
/***************************************************************************************/


const index = async ctx => await ctx.render('index', {
    title: "Things I Love:",
    things,
    items: ctx.query.items //Any Query Parameters passed is forwarded to 'index.html' in views
});

const showAdd = async ctx => await ctx.render('add');

// Example Use case of koa-bodyparser - Getting formdata from form submit
const add = async ctx => {
    const body = await ctx.request.body;
    things.push(body.thing); //'thing' refers to the 'name' attribute of the input field
    ctx.redirect('/');
}

router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);


/***************************************************************************************/
// Additional Context Properties, Parameters | Useful for authentication use cases
/***************************************************************************************/

// Add Additional Properties to Context
app.context.user = "Jayanta";

// Render/send/use context properties
router.get('/auth/verify', ctx => ctx.body = `Welcome ${ctx.user}`);

// Using Parameters with Context
router.get('/users/:id', ctx => ctx.body = `User ID: ${ctx.params.id + "\n"}User Name: ${ctx.user}`);


/***************************************************************************************/
// Run Server
/***************************************************************************************/
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}... (http://localhost:${PORT})`));