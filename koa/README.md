# What is Koa ?

Koa is a new, extremely lightweight, web framework designed by the team behind Express, which aims to be a minimal, more expressive, and more robust foundation for web applications and APIs. By leveraging async functions, Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within its core, and it provides an elegant suite of methods that make writing servers fast and enjoyable.

**[Visit Official Website](https://koajs.com)**

---

# Features

- Koa uses a `req` and `res` object on top of the standard vanilla JS request and response.
- It accelerates HTTP server deployment by providing additional functionality.
- Encapsulates req/res into a single object using context. This helps devs build APIs more efficiently by using a number of helpful methods.
- Features support for ES6+ (ES2015) arrow functions, async/await, destructuring, generators etc.

---

# Installation

**Koa** requires `node v7.6.0` or higher for ES6+ and features support for arrow functions, async/await, destructuring, generators etc.

You can quickly install a supported version of node with your favorite version manager:

```
$ nvm install 7
$ npm i koa
$ node my-koa-app.js
```

---

# Common Koa Addon Modules

- **[Koa Router](https://www.npmjs.com/package/koa-router)** - Koa does not come with a built-in router as it is very minimalistic. Koa-router is a simple routing module that features express style routing (app.get, app.post, app.put, etc.)
- **[Koa EJS Templating](https://www.npmjs.com/package/koa-ejs)** - Easy-to-use templating engine to display views and layout. Of course you can use a frontend framework as well.
- **[Koa Session](https://www.npmjs.com/package/koa-session)** - Simple session middleware for Koa. Defaults to cookie-based sessions and supports external stores.
- **[Koa Body Parser](https://www.npmjs.com/package/koa-bodyparser)** - Parse Incoming Data based on [co-body](https://github.com/cojs/co-body). Support json, form and text type body. Does not support multipart format data.
- **[Koa JSON](https://www.npmjs.com/package/koa-json)** - JSON pretty-printed response middleware. Also converts node object streams to binary.

---

# Overall Advantages of Koa

- Very small footprint but easily extended
- Fast and efficient
- Modernized syntax
- Enhanced HTTP req, res
- Simple to learn if you know Express

---

