# What is Cheerio?
Cheerio is a fast, flexible & lean implementation of core jQuery designed specifically for the server.

------------------------------------------------------------------------------------------------------

# Features
**❤ Familiar syntax:** Cheerio implements a subset of core jQuery. Cheerio removes all the DOM inconsistencies and browser cruft from the jQuery library, revealing its truly gorgeous API.

**ϟ Blazingly fast:** Cheerio works with a very simple, consistent DOM model. As a result parsing, manipulating, and rendering are incredibly efficient.

**❁ Incredibly flexible:** Cheerio wraps around parse5 parser and can optionally use @FB55's forgiving htmlparser2. Cheerio can parse nearly any HTML or XML document.

------------------------------------------------------------------------------------------------------

# Cheerio is not a web browser
Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript. This makes Cheerio much, much faster than other solutions. If your use case requires any of this functionality, you should consider projects like Puppeteer or JSDom.