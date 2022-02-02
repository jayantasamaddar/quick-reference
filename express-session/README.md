# Express-Session

Express-Session is an HTTP server-side framework that is used to create and manage a session middleware.
It sets a session cookie and stores it on a 'session-store' which can be on the server or database.

Note: Previously it required the `cookie-parser` middleware to parse the cookie header to store data on the browser. Since version 1.5.0, the cookie-parser middleware is no longer required for this module to work.

One express-session is setup,
When a client makes an HTTP request, and that request doesn't contain a session cookie, a new session will be created by express-session. Creating a new session does a few things:

- generate a unique `sessionID`
- store that sessionID in a session cookie (so subsequent requests made by the client can be identified)
- create an empty session object, as `req.session`
- depending on the value of `saveUninitialized`, at the end of the request, the session object will be stored in the session store (which is generally some sort of database)
- Express Session creates `httpOnly` cookies by default. These cookies only contain a sessionID and is completely inaccessible by JavaScript. It gets sent as part of the session data on every HTTP request made by the client.

--------------------------------------------------------------------------------------------------------

**Syntax:**
```
const express = require('express');
const session = require('express-session');

const MongoStore = require('connect-mongo');

// Initialize Express
const app = express();

// Define session store
const sessionStore = MongoStore.create({
    mongoUrl: process.env.ZENIUS_ONE,
    collection: "sessions"
});

// Initialize Express Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "zId",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    isAuth: false, //custom field to store additional data
    cookie: {
        maxAge: 1000 * 60 * 60 * 0.5 * 1 // Miliseconds x Seconds x Minutes x Hours x Day (30 minutes)
    }
));
```

--------------------------------------------------------------------------------------------------------

## Use in Web Development - Workflow
Express Session is used to generate sessions that contain session and/or user data, with conditional logic that are uniquely identifyable to an user. 

**Example - 1 - User Login and Logout**
In production, for a basic user login process, the workflow may look like this:

### Login Process

- Express Session is configured to run at every API call made to the server with default session and cookie values, (e.g. `saveUninitialized: false` which does not store sessions to the session store by default).
We would place the `app.use(session({//session details}))` as a middleware above our routes to intercept every call.

- For a login request, we would conditionally like to modify the created session with new values/update existing values. For example: If `saveUninitialized: false` was the default, we would like to `req.session.saveUninitialized = true` to save the session to the session store. So now, all sessions with this certain session `name` that are saved are all related to the login (we may define other separate session cookies that is not related to login, which hold more information). 

- Additionally, to make multiple validations that an user is logged in, we would ideally like to also set a custom field, `req.session.isAuth = true` which we previously initialized as `isAuth: false` to identify as a user login success. This will later be used to identify if a person is truly logged in, during the logout flow.

- As another layer (optional), we could store a normal or hashed version of the user's ID (as per the User database) in the session as something like, `req.session.userID = account.ID`. This can be validated against the user in the User database by making an API call against the ID to see if user exists.

### Logout Process

- When the logout request arrives with the session details, we first validate the user by first checking `if(req.session && req.session.isAuth)` exists and if session user *"claims to be"* Logged in.

- Next we may want to cross-check user with the database and see if `req.sessionID` matches existing sessionID in the sessions collection. If found, it checks if `userID` and `accountID` matches.

- Once a match is found, we initialize the end of the session by deleting the session in the session store using, `req.session.destroy`.

- We would also like to concurrently remove the cookie from the browser by using `res.clearCookie()` as a callback function to `req.session.destroy`. **Web browsers and other compliant clients will only clear the cookie if the given options is identical to those given to `res.cookie()`, excluding `expires` and `maxAge`.**
(Note: one can simply `console.log(req.session)` to view in the console what the session request contains to determine the options passed to `res.clearCookie()`)

**Example Snippet:**
```
// Logout Acount
const logoutAccount = async (req, res) => {
    try {
        if(!req.session.isAuth) return res.status(500).json("Account not logged in!");
        else await req.session.destroy(err => {
            res.status(200).clearCookie('zId', {
                path: '/', 
                httpOnly: true,
                originalMaxAge: 1000 * 60 * 60 * 0.5 * 1 //same as maxAge that was set initially
            }).json({message: "Account logged out!"});
        });
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
}
```

--------------------------------------------------------------------------------------------------------

# References
- [ExpressJS | API Docs](http://expressjs.com/en/5x/api.html)
- [Express Session | NPM](https://www.npmjs.com/package/express-session)
- [Express Session | Expressjs.com Resources](http://expressjs.com/en/resources/middleware/session.html)
- [clearCookie() | Express](http://expressjs.com/en/4x/api.html#res.clearCookie)
- [saveUninitialized/resave: true/false | Stack Overflow](https://stackoverflow.com/a/40396102/6574719)