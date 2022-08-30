# Table of Contents

- [Table of Contents](#table-of-contents)
- [The Story of Node.js](#the-story-of-nodejs)
- [What is V8?](#what-is-v8)
  - [Key Concepts](#key-concepts)
  - [V8](#v8)
- [What is Node.js?](#what-is-nodejs)
  - [The Event Loop](#the-event-loop)
  - [Blocking vs Non-Blocking](#blocking-vs-non-blocking)
- [Node Modules](#node-modules)
- [The REPL](#the-repl)
- [Architecture of Node](#architecture-of-node)
  - [Events](#events)
- [EventEmitter Class](#eventemitter-class)
    - [`emitter.on(eventName, listener)`](#emitteroneventname-listener)
    - [`emitter.once(eventName, listener)`](#emitteronceeventname-listener)
    - [`emitter.off(eventName, listener)`](#emitteroffeventname-listener)
    - [`emitter.removeAllListeners([eventName])`](#emitterremovealllistenerseventname)
- [Path](#path)
  - [`path.basename(path[, ext])`](#pathbasenamepath-ext)
  - [`path.dirname(path)`](#pathdirnamepath)
  - [`path.extname(path)`](#pathextnamepath)
  - [`path.parse(path)`](#pathparsepath)
  - [`path.format(pathObject)`](#pathformatpathobject)
  - [`path.join([...paths])`](#pathjoinpaths)
  - [`path.resolve([...paths])`](#pathresolvepaths)
  - [`path.sep`](#pathsep)
- [URL](#url)
  - [URL Strings and URL Objects](#url-strings-and-url-objects)
  - [The WHATWG URL API](#the-whatwg-url-api)
    - [`new URL(input[, base])`](#new-urlinput-base)
      - [`url.toJSON()`](#urltojson)
      - [`url.search`](#urlsearch)
      - [`url.searchParams`](#urlsearchparams)
  - [`URLSearchParams` Class](#urlsearchparams-class)
    - [`new URLSearchParams()`](#new-urlsearchparams)
    - [`new URLSearchParams(string)`](#new-urlsearchparamsstring)
    - [`new URLSearchParams(obj)`](#new-urlsearchparamsobj)
    - [`new URLSearchParams(iterable)`](#new-urlsearchparamsiterable)
    - [`urlSearchParams.append(name, value)`](#urlsearchparamsappendname-value)
    - [`urlSearchParams.get(name)`](#urlsearchparamsgetname)
    - [`urlSearchParams.getAll(name)`](#urlsearchparamsgetallname)
    - [`urlSearchParams.set(name, value)`](#urlsearchparamssetname-value)
    - [`urlSearchParams.delete(name)`](#urlsearchparamsdeletename)
    - [`urlSearchParams.has(name)`](#urlsearchparamshasname)
    - [`urlSearchParams.toString()`](#urlsearchparamstostring)
    - [`urlSearchParams.keys()`](#urlsearchparamskeys)
    - [`urlSearchParams.values()`](#urlsearchparamsvalues)
    - [`urlSearchparams.entries()`](#urlsearchparamsentries)
    - [`urlSearchParamsSymbol.iterator`](#urlsearchparamssymboliterator)
  - [`url.fileURLToPath(url)`](#urlfileurltopathurl)
- [File System](#file-system)
  - [Accessing the File System APIs](#accessing-the-file-system-apis)
    - [To use the Promise-based APIs](#to-use-the-promise-based-apis)
    - [To use the Callback and Sync APIs](#to-use-the-callback-and-sync-apis)
  - [Opening a File](#opening-a-file)
    - [`fs.open(path[, flags[, mode]], callback)`](#fsopenpath-flags-mode-callback)
    - [`fs.readFile(path[, options], callback)`](#fsreadfilepath-options-callback)
      - [File descriptors](#file-descriptors)
      - [Performance Considerations](#performance-considerations)
  - [Reading File(s)](#reading-files)
    - [`fs.readFile(path[, flags[, mode]], callback)`](#fsreadfilepath-flags-mode-callback)
    - [`fs.rename`](#fsrename)
  - [Truncating a File](#truncating-a-file)
    - [`fs.ftruncate(fd[, len], callback)`](#fsftruncatefd-len-callback)
  - [File System Flags](#file-system-flags)
- [HTTP](#http)
  - [`http.createServer(options)`](#httpcreateserveroptions)
    - [The `requestListener` function](#the-requestlistener-function)
    - [Creating a HTTP Server](#creating-a-http-server)
- [String Decoder](#string-decoder)
  - [`new StringDecoder([encoding])`](#new-stringdecoderencoding)
  - [`stringDecoder.write(buffer)`](#stringdecoderwritebuffer)
  - [`stringDecoder.end([buffer])`](#stringdecoderendbuffer)
- [Stream](#stream)
    - [What are Streams?](#what-are-streams)
    - [Types of Streams](#types-of-streams)
    - [Why Streams](#why-streams)
    - [Subscribable Events of Streams](#subscribable-events-of-streams)
    - [Node.js Internal Libraries that use Streams](#nodejs-internal-libraries-that-use-streams)
    - [An Example of a Stream](#an-example-of-a-stream)
    - [Agenda](#agenda)
    - [Creating a Readable Stream](#creating-a-readable-stream)

---

# The Story of Node.js

In March 2011, a video began circulating on YouTube and being emailed by one developer to another. In the video, a scraggly, 20-something named Ryan Dahl to a small group in a San Francisco PHP meetup about a new way of running JavaScript on the server. He said he had packaged up Chrome's V8 Runtime so that it could interpret JavaScript serverside on any UNIX-like machine and then he added some useful APIs under it. He was calling his creation **Node.js**.

[Introduction to Node.js with Ryan Dahl](https://www.youtube.com/watch?v=jo_B4LTHi3I)

Eventually, this video would get 100,000+ views and would propel Node.js into the spotlight. What seemed to most developers as a new discovery, in actuality for Ryan Dahl, he had authored Node two years earlier, in 2009 and had been giving presentations and conferences since then. Ryan had been Node's steadfast evangelist for years at that point, but the going had not been easy.

His presentation, shortly after authoring his framework was given in a JavaScript centric conference in Europe on November 8, 2009 and it ended in a standing ovation for Ryan. But since then, the broader programming community hadn't been so welcoming. At first, the community just ignored Node.
The original HackerNews thread announcing Node.js got 0 comments and only got 8 points, which is an underwhelming response.

Eventually, MongoDB, Angular and other projects would be built with Node, the project funded by Joint, and eventually merged into the NodeJSFoundation which would launch the first NodeJS 4.0 LTS.

---

# What is V8?

V8 is the JavaScript Engine that powers Chrome. That may sound a bunch of jargon, unless we know some key concepts.

## Key Concepts

Modern day computers only understand **machine code**. Machine code looks nothing like the programming languages we use everyday. Machine code is simply binary code that the computer understands at the lowest level. The programming languages we write today are high level programming languages. High level languages are languages that abstract away the close-to-the-hardware operations. The terms "high level" and "low level" are relative and ambiguous though, as C, although considered a low level language is at a higher level than assembly language or machine code while Java is a higher level language than C but lower level than JavaScript or Python and so on.

But one thing is for certain - JavaScript, Python, C++, Java is not understood by the computer. So one or more things must happen, before a computer must execute or run a program written in a modern programming language.

In order to execute high-level code, is the job of mainly three groups of software that the computer uses:

- **Compilers** - Compilers take source code written in a programming language and turns it into an executable file (a file full of machine code or assembly code or byte code or object code, i.e. something low level that the machine can execute directly or take a few short steps to run it). Compilers create executables - these are programs that are ready to be run.
- **Interpreters** - An interpreter directly executes instructions written in a programming or scripting language without previously converting them to an object code or machine code. They do but reading and compiling the code line by line and optimizing aspects of it for performance. Interpreters don't leave behind anything, no executables or artifacts.
- **Transpilers** - Take source code and turn it into source code of another type. Common examples of Transpilers include turning TypeScript into JavaScript or turning SASS into CSS.

There are others like Assemblers, but those are outside the scope of our topic here.

## V8

V8 is a JavaScript Engine which is a type of JavaScript interpreter. V8 compiles JavaScript down to native machine code and executes it. It also optimizes the code at runtime to make it faster.
V8 is a standalone application but people rarely interact with it directly. However, if you use the Chrome web browser, you've already used V8. If you've opened up the console and debugged JavaScript on the client side, the REPL you are interacting with is V8.

There are other JavaScript engines that you are probably familiar with:

If you've ever built an app with React Native, or if you've ever used the Safari Web Browser, you've been interacting with a JavaScript engine called JavaScript Core.

- **V8** was written by the developers at Google in order to power Chrome.
- **JavaScriptCore** is writen by the developers at Apple, largely to power Safari.
- **SpiderMonkey** is developed by Mozilla and is used in the Firefox browser. SpiderMonkey was the first ever JavaScript engine and it was written by Brendan Eich, the same guy who invented JavaScript. He was working at Netscape and he wrote SpiderMonkey is 1996 to be used inside the Netscape Navigator browser. In 1998, Mozilla created Firefox, the current parent of Firefox.
- **SpiderMonkey and V8** have alternatively both been used inside of MongoDB, so that Mongo can understand the JSON commands that you send to it.
- **Chakra** is a JavaScript engine that was used in Microsoft's Internet Explorer.

Modern browsers perform a lot of tasks. But almost all of them include parsing and executing JavaScript. Web browsers embed JavaScript engines in order to execute JavaScript.

So in a way, you can look at a web browser as an application that looks at JavaScript files and sends them to an embedded JavaScript engine like V8 so that the JavaScript can be executed.

Since JavaScript is the language of the web, almost all browsers are built on top of a JavaScript engine.

**Node.js** does the same. It sends JavaScript files to an embedded JavaScript engine - V8, in order to execute JavaScript.

---

# What is Node.js?

**Node.js** is a server-side JavaScript runtime environment.

Let's break down that definition.

- **Serverside** - It's an application that runs on a computer's Operating system as opposed to a web browser or on a phone.
- **JavaScript Runtime Environment** - It's an application that looks at JavaScript, decides which JavaScript files or commands should be executed and when, and sends that JavaScript to an embedded JavaScript engine, in this case, V8, for execution on the computer.

You can think of V8 as a car's engine and drivetrain while Node.js is everything else that makes up the car. While you, the developer, are the driver.

Node is a `C++` application that embeds the `V8` JavaScript Engine. If we look at the first few commits that Ryan Dahl made to the Node project on GitHub, we can see him embedding the `V8` application and then writing more `C++` code that handles the logic of figuring out which JavaScript to send to `V8` and when and what to do with the responses.

## The Event Loop

In crafting Node.js and iterating on it over time, Ryan Dahl and other contributors have made two primary programs that get called from the command line:

1. A Script Processor
2. A REPL (Read Eval Print Loop)

We can call the Script Processor with: `node <script name>`. E.g. `node index.js`.
In this way, we are passing a script name to Node.js, so that Node can open the file and process the JavaScript commands within it.

But it's a bit more complicated than that.

When we invoke the Node program in this way, Node isn't simply going to pass our JavaScript to v8:

- It is first going to initialize a process called the **`Event Loop`**.
- Then it's going to process the initial parts of our JavaScript file.
- Then it's going to start processing the EventLoop it initialized earlier.

We can think of the **`Event Loop`** as an infinitely repeating task that starts over just as soon as it completes. Each pass of this task or each tick as it's called, consists of Node.js checking if there is anything else it needs to do.

One might be asking, "But didn't Node process the file, before it started processing the **`Event Loop`**?"

Well, both yes and no. As we know, JavaScript can include both synchronous and asynchronous behaviours. Synchronous behaviours are executed and completed by Node as soon as they are encountered while asynchronous behaviours are simply invoked but not immediately completed. Instead, these behaviours simply get added to a Queue (FIFO data structure) that lists everything asynchronous that Node.js still has to do. The **`Event Loop`** is Node's way of processing that To-Do List. With each tick of the loop, it completes an item or several items on its list. But those items may create further items - asynchronous operations that need to be completed later.

So everytime the **`Event Loop`** runs, the number of items left to complete may stay the same or it may grow. If at some point the **`Event Loop`** checks off the final thing it had to do and there's nothing else for it to do, the application exits. However, if a task in the list, spins up more one or more tasks in the list, i.e. the number of items on the To-Do List doesn't reach 0, then there is a possibility that the **`Event Loop`** may run indefinitely/infinitely and may never reach a point where it needs to exit. Many Node programs like servers or background workers for example are designed this way to perpetually create more items on the Event Loop's to-do list and never let the events on the to-do list get down to 0. That way the application never dies.

---

## Blocking vs Non-Blocking

Items that can be added to this to-do list are any tasks that are asynchronous (non-blocking), such as those invoked with a callback or Promise, or whose execution are scheduled at a later time, like timeouts or intervals. We call these **non-blocking** operations.

In programming languages, everything you do is **blocking**, i.e. if you have a sequence of tasks that need to performed on a single-threaded application, the tasks will be performed in order and while a task is performed, the application is incapable of doing anything else. Each task is `"blocking"` if it is occupying the resources of the thread and blocking the application from performing any other task.

Blocking tasks and runtimes with a blocking I/O definitely have their place, if you want to perform a sequence of tasks in the exact order and there's nothing else your thread would rather be doing, then there's no drawback to a blocking I/O. **Example:** a transaction operation on an e-commerce site.

But that is often not the case with modern web applications. Web apps often need to handle and process multiple operations at the same time. **Example:** While your API is fetching database requests from one user's request, it might also be simultaneously be needing to send a Welcome Email to another user or charging the credit card of another.

So how does a non-blocking I/O allow an application thread to handle multiple operations at the same time?
Well, it doesn't. Node.js is single threaded.

Node's **`Event Loop`** and **`non-blocking I/O`** don't allow Node to do multiple operations at one time, it just allows Node to schedule things later. This may sound trivial, but this is a huge deal!

When processing a request, most web apps are actually sitting around waiting for most of the time.
Example: Waiting for the receiver to send a response or a database to finish a query and send a json object back.

If this was an application that was single-threaded and had a blocking I/O, it would freeze any other operations that it could rather be doing during this wait time until this response is not received. It is blocked and stuck in a state of idleness.

A **`non-blocking I/O`** and **`Event Loop`** is the answer to this issue. This allows the application to push this task to the event queue and instead of waiting for the response from the receiver it moves to the next task, process other user requests, etc.
Meanwhile, if the receiver sends the response, the **`Event Loop`** processor identifies that the response is received and it associates it with the function that made the call and it carries out the callback that was to be carried out.

The following diagram shows a simplified overview of the event loop's order of operations.

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

Each box will be referred to as a "phase" of the event loop.

Each phase has a FIFO queue of callbacks to execute. While each phase is special in its own way, generally, when the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed. When the queue has been exhausted or the callback limit is reached, the event loop will move to the next phase, and so on.

**Phases Overview**

- **timers**: this phase executes callbacks scheduled by setTimeout() and setInterval().
- **pending callbacks**: executes I/O callbacks deferred to the next loop iteration.
- **idle, prepare**: only used internally.
- **poll**: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and `setImmediate()`); node will block here when appropriate.
- **check**: setImmediate() callbacks are invoked here.
- **close callbacks**: some close callbacks, e.g. socket.on('close', ...).

This is how Node.js is continuously getting out of it's own way. As a Node.js developer you are encouraged to design your programs around this idea of writing asynchronous code.

For more details, visit - https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop

--

# Node Modules

How does Node run an entire application split across multiple files? Afterall, when we start a Node application, we don't specify a set of files or a directory of files, we only specify a single file that need to be executed. This may seem counterintuitive because applications are made of dozens or hundreds or thousands of files. So how does Node start an application, when we tell it to run one file?

That's where Node's module system comes into play.

Node uses `require` (CommonJS) or `import` (ES Module) statements that grabs the contents of the imported file and assigns it to a variable for use within the file.

The file that is imported has a `module.exports = x` (CommonJS) or an `export` or `export default` declaration. This declares what content should be sent to another file when that file requires or imports this one.

Example: File B requires File A's function `x` and runs it.

**File A**

```js
const x = () => console.log('Hello');

module.exports = x;
```

**File B**

```js
const x = require('fileA');

x();
```

Node's module system creates a dependency tree, which tells Node which files are needed to run the application.

**Example:**
The `index.js` requires the `controller` and `router` file. The `controller` file requires the `lib` file. The `lib` file requires the `SDK` of some Database. The SDK requires several helpers, etc.

```
                 index
                   |
            _______|_______
           |               |
       controller        router
           |
          lib
           |
      database-sdk
      /         \
  helperA     helperB
```

If we have a package or SDK in our application directory that have not been called by any file, Node will treat it like it doesn't exist and won't read it into memory.

In Summary, Node's Script Processor, does the following:

1. Reads in the file you specify.
2. Reads all the dependencies the file specifies recursively.
3. Begins executing the synchronous tasks in those files.
4. Begins processing items in the event queue by repeating the `Event Loop` until it has nothing to do.

---

# The REPL

The REPL or Read, Evaluate, Print, Loop is much like a console within a browser. It is a way to define and execute JavaScript code against the V8 engine, in real-time.

To enter the REPL, simply type: `node`.

When the Cursor appears, we know that the REPL has started the R phase of its process, which is Reading input from us.
Initially, all the REPL is going to do is:

- Start the Event Loop in the background
- Wait for input from the user (any commands you can write in a Node.js file) with caveats (like line breaks with a string have to be escaped with `\`)
- We can define variables, manipulate them, run operations on them, define and execute functions or even asynchronous processes or even requiring modules.
- The REPL stages are just as it sounds, it moves from R(Read) to E(Evaluate) to P(Printing the response or return values of functions) and L(Loops back upto the top and repeats the process).

---

# Architecture of Node

Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.

## [Events](https://nodejs.org/api/events.html#events)

All objects that emit events are instances of the **`EventEmitter`** class. These objects expose an `eventEmitter.on()` function that allows one or more functions to be attached to named events emitted by the object.

All Node classes can be traced back as extensions of the **`EventEmitter`** class. Classes create objects that emit events particular to the class. These classes are often further extended by other classes and more events are added to them.

**For example:**

- The `net.server` class extends `EventEmitter` class.
- The `http.server` class extends `net.server` class.
- The `http.createServer` method takes takes in a requestListener function that takes in two arguments which are object instances of the `http.IncomingMessage` class and `http.ServerResponse` class respectively.
- The `http.IncomingMessage` class extendse `stream.Readable` class.
- The `http.ServerResponse` class extends `http.OutgoingMessage` class.

A `net.Server` object emits an event each time a peer connects to it.
A `fs.ReadStream` emits an event when the file is opened.
A `stream` emits an event whenever data is available to be read.

When the `EventEmitter` object emits an event, all of the functions attached to that specific event are called _synchronously_ in the order in which they were registered. Any values returned by the called listeners are ignored and discarded.

This ensures the proper sequencing of events and helps avoid race conditions and logic errors. When appropriate, listener functions can switch to an _asynchronous_ mode of operation using the `setImmediate()` or `process.nextTick()` methods:

---

# EventEmitter Class

The EventEmitter class is defined and exposed by the `node:events` module:

```js
const EventEmitter = require('node:events');
```

All EventEmitters emit the event `newListener` when new listeners are added and `removeListener` when existing listeners are removed.

It supports the following option:

`captureRejections` <boolean> It enables automatic capturing of promise rejection. **Default:** false.

---

### `emitter.on(eventName, listener)`

- `eventName <string | symbol>` - The name of the event.
- `listener <Function>` - The callback function.
- Returns: `<EventEmitter>`

Adds the `listener` function to the end of the listeners array for the event named `eventName`. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of `eventName` and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.on('connection', stream => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependListener()` method can be used as an alternative to add the event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

---

### `emitter.once(eventName, listener)`

- `eventName <string | symbol>` - The name of the event.
- `listener <Function>` - The callback function.
- Returns: `<EventEmitter>`

Adds a one-time listener function for the event named `eventName`. The next time `eventName` is triggered, this `listener` is removed and then invoked.

```js
server.once('connection', stream => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

---

### `emitter.off(eventName, listener)`

- `eventName <string | symbol>` - The name of the event.
- `listener <Function>` - The callback function.
- Returns: `<EventEmitter>`

Alias for **`emitter.removeListener()`**.

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = stream => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` or `off()` will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified `eventName`, then `removeListener()` or `off()` must be called multiple times to remove each instance.

---

### `emitter.removeAllListeners([eventName])`

- `eventName <string | symbol>` - The name of the event.
- Returns: `<EventEmitter>`

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code, particularly when the `EventEmitter` instance was created by some other component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

---

# Path

The `node:path` module provides utilities for working with file and directory paths. It can be accessed using:

```cjs
const path = require('path');
```

```es6
import path from 'path';
```

We will look at some of the most used `path` methods.

---

## `path.basename(path[, ext])`

- `path <string>`
- `ext <string>` - An optional file extension
- Returns: `<string>`

The `path.basename()` method returns the last portion of a path, similar to the Unix basename command. Trailing directory separators are ignored, see [`path.sep`](#pathsep).

```js
path.basename('/foo/bar/baz/asdf/quux.html');
// Returns: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// Returns: 'quux'
```

Although Windows usually treats file names, including file extensions, in a case-insensitive manner, this function does not. For example, `C:\foo.html` and `C:\foo.HTML` refer to the same file, but `basename` treats the extension as a case-sensitive string:

```js
path.win32.basename('C:\\foo.html', '.html');
// Returns: 'foo'

path.win32.basename('C:\\foo.HTML', '.html');
// Returns: 'foo.HTML'
```

A TypeError is thrown if path is not a string or if ext is given and is not a string.

---

## `path.dirname(path)`

- `path <string>`
- Returns: `<string>`

The `path.dirname()` method returns the directory name of a path, similar to the Unix dirname command. Trailing directory separators are ignored, see [`path.sep`](#pathsep).

```js
path.dirname('/foo/bar/baz/asdf/quux');
// Returns: '/foo/bar/baz/asdf'
```

A TypeError is thrown if path is not a string.

---

## `path.extname(path)`

- `path <string>`
- Returns: `<string>`

The **`path.extname()`** method returns the extension of the path, from the last occurrence of the **`.`** (period) character to end of string in the last portion of the path. If there is no **`.`** in the last portion of the path, or if there are no **`.`** characters other than the first character of the `basename` of path (see [`path.basename()`](#pathbasenamepath-ext)), an empty string is returned.

```js
path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

path.extname('index');
// Returns: ''

path.extname('.index');
// Returns: ''

path.extname('.index.md');
// Returns: '.md'
```

A TypeError is thrown if path is not a string.

---

## `path.parse(path)`

- `path <string>`
- Returns: `<Object>`

The **`path.parse()`** method returns an object whose properties represent significant elements of the path. Trailing directory separators are ignored, see [`path.sep`](#pathsep).

The returned object will have the following properties:

- `dir <string>`
- `root <string>`
- `base <string>`
- `name <string>`
- `ext <string>`

```js
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

```
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

This is the opposite of [`path.format()`](#pathformatpathobject).

---

## `path.format(pathObject)`

- `pathObject <Object>` - A JavaScript object having the following properties:
  - `dir <string>`
  - `root <string>`
  - `base <string>`
  - `name <string>`
  - `ext <string>`
- Returns: `<string>`

The **`path.format()`** method returns a path string from an object. This is the opposite of [`path.parse()`](#pathparsepath).

When providing properties to the `pathObject` remember that there are combinations where one property has priority over another:

- `pathObject.root` is ignored if `pathObject.dir` is provided
- `pathObject.ext` and `pathObject.name` are ignored if `pathObject.base` exists

```js
// If `dir`, `root` and `base` are provided,
// `${dir}${path.sep}${base}`
// will be returned. `root` is ignored.
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt',
});
// Returns: '/home/user/dir/file.txt'

// `root` will be used if `dir` is not specified.
// If only `root` is provided or `dir` is equal to `root` then the
// platform separator will not be included. `ext` will be ignored.
path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored',
});
// Returns: '/file.txt'

// `name` + `ext` will be used if `base` is not specified.
path.format({
  root: '/',
  name: 'file',
  ext: '.txt',
});
// Returns: '/file.txt'
```

---

## `path.join([...paths])`

- `...paths <string>` - A sequence of path segments
- Returns: `<string>`

The **`path.join()`** method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

Zero-length `path` segments are ignored. If the joined path string is a zero-length string then `'.'` will be returned, representing the current working directory.

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux');
// Returns: '/foo/bar/baz/asdf/quux'

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// Throws 'TypeError: Path must be a string. Received {}'
```

A TypeError is thrown if any of the path segments is not a string.

---

## `path.resolve([...paths])`

- `...paths <string>` - A sequence of paths or path segments
- Returns: `<string>`

The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path.

The given sequence of paths is **processed from right to left, with each subsequent path prepended until an absolute path is constructed**.

For instance, given the sequence of path segments: `/foo`, `/bar`, `baz`, calling `path.resolve('/foo', '/bar', 'baz')` would return `/bar/baz` because `'baz'` is not an absolute path but `'/bar' + '/' + 'baz'` is.

> **Note:**
>
> - If, after processing all given `path` segments, an absolute path has not yet been generated, the current working directory is used.
> - Zero-length `path` segments are ignored.
> - If no `path` segments are passed, `path.resolve()` will return the absolute path of the current working directory.

```js
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

A TypeError is thrown if any of the arguments is not a string.

---

## `path.sep`

- `<string>`

Provides the platform-specific path segment separator:

**On POSIX:**

```js
'foo/bar/baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```

---

# URL

The `node:url` module provides utilities for URL resolution and parsing. It can be accessed using:

**Using CommonJS:**

```cjs
const url = require('url');
```

**Using ES6 Modules:**

```es6
import url from 'url';
```

---

## URL Strings and URL Objects

A URL string is a structured string containing multiple meaningful components. When parsed, a URL object is returned containing properties for each of these components.

The `node:url` module provides two APIs for working with URLs:

- A legacy API that is Node.js specific, and
- A newer API that implements the same **[WHATWG URL Standard](https://url.spec.whatwg.org/)** used by web browsers.

A comparison between the WHATWG and Legacy APIs is provided below. Above the URL `'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`, properties of an object returned by the legacy `url.parse()` are shown. Below it are properties of a WHATWG `URL` object.

WHATWG URL's `origin` property includes `protocol` and `host`, but not username or password.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

**Parsing the URL string using the WHATWG API (Recommended):**

```js
const myURL = new URL(
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
);

console.log(myURL);

// Returns:
// URL {
//     href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
//     origin: 'https://sub.example.com:8080',
//     protocol: 'https:',
//     username: 'user',
//     password: 'pass',
//     host: 'sub.example.com:8080',
//     hostname: 'sub.example.com',
//     port: '8080',
//     pathname: '/p/a/t/h',
//     search: '?query=string',
//     searchParams: URLSearchParams { 'query' => 'string' },
//     hash: '#hash'
// }
```

**Parsing the URL string using the Legacy API:**

```js
import url from 'url';
const myURL = url.parse(
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
);

console.log(myURL);

// Returns:
// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: 'user:pass',
//     host: 'sub.example.com:8080',
//     port: '8080',
//     hostname: 'sub.example.com',
//     hash: '#hash',
//     search: '?query=string',
//     query: 'query=string',
//     pathname: '/p/a/t/h',
//     path: '/p/a/t/h?query=string',
//     href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
// }
```

---

## The WHATWG URL API

We will be using the WHATWG URL API. It comes with a **`URL`** class implemented by following the WHATWG URL Standard. The URL class is also available on the global object.

In accordance with browser conventions, all properties of `URL` objects are implemented as getters and setters on the class prototype, rather than as data properties on the object itself.

### `new URL(input[, base])`

---

- `input <string>` - The absolute or relative input URL to parse. If input is relative, then base is required. If input is absolute, the base is ignored. If input is not a string, it is converted to a string first.
- `base <string>` - The base URL to resolve against if the input is not absolute. If base is not a string, it is converted to a string first.

Creates a new URL object by parsing the input relative to the base. If base is passed as a string, it will be parsed equivalent to new URL(base).

```js
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

The `URL` constructor is accessible as a property on the global object. It can also be imported from the built-in `url` module:

```es6
import { URL } from 'url';
console.log(URL === globalThis.URL); // Prints 'true'.
```

A TypeError will be thrown if the input or base are not valid URLs.

> **Note:** An effort will be made to coerce the given values into strings. For instance:

```js
const myURL = new URL({ toString: () => 'https://example.org/' });
// https://example.org/
```

---

#### `url.toJSON()`

- Returns: `<string>`

The `toJSON()` method on the URL object returns the serialized URL. The value returned is equivalent to that of `url.href` and `url.toString()`.

This method is automatically called when an URL object is serialized with `JSON.stringify()`.

```js
const myURLs = [
  new URL('https://www.example.com'),
  new URL('https://test.example.org'),
];
console.log(JSON.stringify(myURLs));
// Prints ["https://www.example.com/","https://test.example.org/"]
```

```js
// url.toJSON() returns a string while JSON.stringify(url) returns a JSON string which needs parsing.
const myURL = new URL('https://www.example.com');
const a = myURL.toJSON();
console.log(a === JSON.stringify(myURL)); // Prints: false
const b = JSON.parse(JSON.stringify(myURL));
console.log(a === b); // Prints: true
```

---

#### `url.search`

- `<string>`

Gets and sets the serialized query portion of the URL.

```js
/** Get */
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search);
// Prints ?123

/** Set */
myURL.search = 'abc=xyz';
console.log(myURL.href);
// Prints https://example.org/abc?abc=xyz
```

Any invalid URL characters appearing in the value assigned the `search` property will be [percent-encoded](https://nodejs.org/api/url.html#percent-encoding-in-urls). The selection of which characters to percent-encode may vary somewhat from what the `url.parse()` and `url.format()` methods would produce.

---

#### `url.searchParams`

- `<URLSearchParams>`

Gets the `URLSearchParams` object representing the query parameters of the URL. This property is read-only but the `URLSearchParams` object it provides can be used to mutate the URL instance; to replace the entirety of query parameters of the URL, use the `url.search` setter. See [URLSearchParams](#urlsearchparams-class) documentation for details.

Use care when using `.searchParams` to modify the URL because, per the WHATWG specification, the `URLSearchParams` object uses different rules to determine which characters to percent-encode. For instance, the `URL` object will not percent encode the ASCII tilde (~) character, while URLSearchParams will always encode it:

```js
const myUrl = new URL('https://example.org/abc?foo=~bar');

console.log(myUrl.search); // prints ?foo=~bar

// Modify the URL via searchParams...
myUrl.searchParams.sort();

console.log(myUrl.search); // prints ?foo=%7Ebar
```

---

## `URLSearchParams` Class

The `URLSearchParams` API provides read and write access to the query of a `URL`. The `URLSearchParams` class can also be used standalone with one of the four following constructors. The `URLSearchParams` class is also available on the global object.

```es6
import { URLSearchParams } from 'url';
console.log(URLSearchParams === globalThis.URLSearchParams); // Prints 'true'.
```

The WHATWG `URLSearchParams` interface and the `querystring` module have similar purpose, but the purpose of the `querystring` module is more general, as it allows the customization of delimiter characters (& and =). On the other hand, this API is designed purely for URL query strings.

```js
const newURL = new URL('https://example.org/?abc=123');

// get
console.log(newURL.searchParams.get('abc')); // Prints: "123"

// append
newURL.searchParams.append('abc', 'xyz');
console.log(newURL.href); // Prints https://example.org/?abc=123&abc=xyz

// delete
newURL.searchParams.delete('abc');

// set
newURL.searchParams.set('a', 'b');
console.log(newURL.href); // Prints: https://example.org/?a=b

// URLSearchParams constructor
const newSearchParams = new URLSearchParams(newURL.searchParams);
// The above is equivalent to
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(newURL.href); // Prints: https://example.org/?a=b

console.log(newSearchParams.toString()); // Prints: a=b&a=c

// newSearchParams.toString() is implicitly called
newURL.search = newSearchParams; // assigns newURL.search to 'a=b&a=c'. This updates the URL.
console.log(newURL.href); // Prints: https://example.org/?a=b&a=c

newSearchParams.delete('a');

newURL.search = newSearchParams; // assigns newURL.search to ''. This updates the URL.
console.log(newURL.href); // Prints: https://example.org/
```

The `URLSearchParams` object is almost like a Map object having the same methods and iterators with a few caveats:

- get
- set
- has
- keys
- entries
-

and iterator with a few special methods

---

### `new URLSearchParams()`

Instantiate a new empty URLSearchParams object.

```js
const searchParams = new URLSearchParams();
```

---

### `new URLSearchParams(string)`

- `string <string>` - A query string
- Parse the string as a query string, and use it to instantiate a `new URLSearchParams` object. A leading '?', if present, is ignored.

```js
const params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user')); // Prints 'abc'
console.log(params.toString()); // Prints 'user=abc&query=xyz'

params = new URLSearchParams('?user=abc&query=xyz');
console.log(params.toString()); // Prints 'user=abc&query=xyz'
```

---

### `new URLSearchParams(obj)`

- `obj <Object>` - An object representing a collection of key-value pairs

Instantiate a new `URLSearchParams` object with a query hash map. The key and value of each property of `obj` are always coerced to strings.

Unlike `querystring` module, duplicate keys in the form of array values are not allowed. Arrays are stringified using `array.toString()`, which simply joins all array elements with commas.

```js
const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second'],
});

console.log(params.getAll('query')); // Prints [ 'first,second' ]
console.log(params.toString()); // Prints 'user=abc&query=first%2Csecond'
```

---

### `new URLSearchParams(iterable)`

- `iterable <Iterable>` - An iterable object whose elements are key-value pairs

Instantiate a new `URLSearchParams` object with an iterable map in a way that is similar to [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)'s constructor. `iterable` can be an `Array` or any iterable object. That means `iterable` can be another `URLSearchParams`, in which case the constructor will simply create a clone of the provided `URLSearchParams`. Elements of iterable are key-value pairs, and can themselves be any iterable object.

Duplicate keys are not allowed.

```js
/** Using an array */
const params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second'],
]);
console.log(params.toString()); // Prints 'user=abc&query=first&query=second'

/** Using a Map object */
const map = new Map();
map.set('user', 'abc');
map.set('query', 'xyz');
params = new URLSearchParams(map);
console.log(params.toString()); // Prints 'user=abc&query=xyz'

// Using a generator function
function* getQueryPairs() {
  yield ['user', 'abc'];
  yield ['query', 'first'];
  yield ['query', 'second'];
}
params = new URLSearchParams(getQueryPairs());
console.log(params.toString()); // Prints 'user=abc&query=first&query=second'

// Each key-value pair must have exactly two elements
new URLSearchParams([['user', 'abc', 'error']]);
// Throws TypeError [ERR_INVALID_TUPLE]:
//        Each query pair must be an iterable [name, value] tuple
```

---

### `urlSearchParams.append(name, value)`

- `name <string>`
- `value <string>`

Append (add to the end of the string) a new name-value pair to the query string.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.toString()); // Prints foo=bar&foo=baz&abc=def
```

---

### `urlSearchParams.get(name)`

- `name <string>`
- Returns: `<string>` or `null` if there is no name-value pair with the given name.

Returns the value of the first name-value pair whose name is `name`. If there are no such pairs, `null` is returned.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
console.log(params.get('foo')); // Prints: bar
```

---

### `urlSearchParams.getAll(name)`

- `name <string>`
- Returns: `<string[]>`

Returns the values of all name-value pairs whose name is `name`. If there are no such pairs, an empty array is returned.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.getAll('foo')); // Prints: [ 'bar', 'baz' ]
```

---

### `urlSearchParams.set(name, value)`

- `name <string>`
- `value <string>`

Sets the value in the `URLSearchParams` object associated with `name` to `value`. If there are any pre-existing name-value pairs whose names are `name`, set the first such pair's value to `value` and remove all others. If not, append the name-value pair to the query string.

```js
/** Setup **/
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.toString()); // Prints: foo=bar&foo=baz&abc=def

params.set('foo', 'def');
params.set('xyz', 'opq');
console.log(params.toString()); // Prints: foo=def&abc=def&xyz=opq
```

---

### `urlSearchParams.delete(name)`

- `name <string>`

Remove all name-value pairs whose name is `name`.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
params.delete('foo');
console.log(params.toString()); // Prints abc=def
```

---

### `urlSearchParams.has(name)`

- `name <string>`
- Returns `<boolean>`

Returns true if there is at least one name-value pair whose name is name.

```js
const params = new URLSearchParams();
console.log(params.has('abc')); // false
params.append('abc', 'def');
console.log(params.has('abc')); // true
```

---

### `urlSearchParams.toString()`

- Returns: `<string>`

Returns the search parameters serialized as a string, with characters percent-encoded where necessary.

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('abc', 'def');
console.log(params.toString()); // Prints: foo=bar&abc=def
```

---

### `urlSearchParams.keys()`

- Returns: `<Iterator>`

Returns an ES6 Iterator over the values of each name-value pair.

```js
const params = new URLSearchParams('foo=bar&foo=baz');
for (const name of params.keys()) {
  console.log(name);
}
// Prints:
//   foo
//   foo
```

---

### `urlSearchParams.values()`

- Returns: `<Iterator>`

Returns an ES6 Iterator over the values of each name-value pair.

```js
const params = new URLSearchParams('foo=bar&foo=baz');
for (const name of params.values()) {
  console.log(name);
}
// Prints:
//   bar
//   baz
```

### `urlSearchparams.entries()`

- Returns: `<Iterator>`
- Returns an ES6 `Iterator` over each of the name-value pairs in the query string. Each item of the iterator is a JavaScript `Array`. The first item of the `Array` is the `name`, the second item of the Array is the `value`.

Alias for [`urlSearchParams[@@iterator]()`](#urlsearchparamssymboliterator).

---

### `urlSearchParams[Symbol.iterator]()`

- Returns `<Iterator>`

Returns an ES6 `Iterator` over each of the name-value pairs in the query string. Each item of the iterator is a JavaScript `Array`. The first item of the `Array` is the `name`, the second item of the Array is the `value`.

Alias for [`urlSearchParams.entries()`](#urlsearchparamsentries).

```js
const params = new URLSearchParams('foo=bar&xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// Prints:
//   foo bar
//   xyz baz
```

---

## `url.fileURLToPath(url)`

- `url <URL> | <string>` - The file URL string or URL object to convert to a path.
- Returns: `<string>` - The fully-resolved platform-specific Node.js file path.

This function ensures the correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string.

```js
import { fileURLToPath } from 'node:url';

const url = import.meta.url;
// Returns: file:///home/jayantasamaddar/Work/quick-reference/nodejs/modules/url/url.js

const __filename = fileURLToPath(url); // Returns:
```

---

# File System

The `node:fs` module enables interacting with the file system in a way modeled on standard POSIX functions. All file system operations have synchronous, callback, and promise-based forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).

## Accessing the File System APIs

The File System APIs can be grouped into two categories based on the two flavours:

- **Promise-based APIs**
- **Callback APIs (also includes the Sync APIs)**

All callback and promise-based file system APIs (with the exception of `fs.FSWatcher()`) use libuv's threadpool. This can have surprising and negative performance implications for some applications. See the UV_THREADPOOL_SIZE documentation for more information.

### To use the Promise-based APIs

The **`fs/promises`** API provides asynchronous file system methods that return promises.

The promise APIs use the underlying Node.js threadpool to perform file system operations off the event loop thread. These operations are not synchronized or threadsafe. Care must be taken when performing multiple concurrent modifications on the same file or data corruption may occur.

**CommonJS**

```cjs
const fs = require('fs/promises');
```

**ES6 Modules**

```es6
import fs from 'fs/promises';
```

### To use the Callback and Sync APIs

The callback APIs perform all operations asynchronously, without blocking the event loop, then invoke a callback function upon completion or error. The callback APIs use the underlying Node.js threadpool to perform file system operations off the event loop thread. These operations are not synchronized or threadsafe. Care must be taken when performing multiple concurrent modifications on the same file or data corruption may occur.

**CommonJS**

```cjs
const fs = require('fs');
```

**ES6 Modules**

```es6
import fs from 'fs';
```

---

## Opening a File

### `fs.open(path[, flags[, mode]], callback)`

Asynchronous file open to perform some actions on the file. It may need to be closed with the `fs.close()` method.

- `path <string> | <Buffer> | <URL>`
- `flags <string> | <number>` - [See support of file system flags](#file-system-flags). Default: 'r'.
- `mode <string> | <integer>` - Default: 0o666 (readable and writable)
- `callback <Function>`
  - `err <Error>` - Error if any
  - `fd <integer>` - Reference to an open file. Uniquely identifies an open file in operating system.

```js
const path =
  '/home/jayantasamaddar/Work/quick-reference/nodejs/modules/url/url.js';

fs.open(path, 'r', (err, fd) => {
  if (!err && fd) {
    // do something like READ or WRITE or both
  } else {
    // handle error
  }
});
```

---

### `fs.readFile(path[, options], callback)`

- `path <string> | <Buffer> | <URL> | <integer>` - Filename or file descriptor
- `options <Object> | <string>`
  - `encoding <string> | <null>` - Default: `null`
  - `flag <string>` - See support of file system flags. Default: `'r'`.
  - `signal <AbortSignal>` - Allows aborting an in-progress readFile
- `callback <Function>`
  - `err <Error> | <AggregateError>`
  - `data <string> | <Buffer>`

Asynchronously reads the entire contents of a file.

```es6
import { readFile } from 'fs';

readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

```es6
import { readFile } from 'fs';
const buffer = readFile('./assets/panagram.txt', (err, data) => {
  /* handle error */
  if (err) {
    console.log(err);
    return;
  }
  /** Do something with the data */
  console.log(data);
  return data;
});
```

The callback is passed two arguments `(err, data)`, where data is the contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding:

```es6
import { readFile } from 'fs';

readFile('/etc/passwd', 'utf8', callback);
```

When the path is a directory, the behavior of `fs.readFile()` and `fs.readFileSync()` is platform-specific. On macOS, Linux, and Windows, an error will be returned. On FreeBSD, a representation of the directory's contents will be returned.

```es6
import { readFile } from 'fs';

// macOS, Linux, and Windows
readFile('<directory>', (err, data) => {
  // => [Error: EISDIR: illegal operation on a directory, read <directory>]
});

//  FreeBSD
readFile('<directory>', (err, data) => {
  // => null, <data>
});
```

It is possible to abort an ongoing request using an AbortSignal. If a request is aborted the callback is called with an `AbortError`:

```es6
import { readFile } from 'node:fs';

const controller = new AbortController();
const signal = controller.signal;
readFile(fileInfo[0].name, { signal }, (err, buf) => {
  // ...
});
// When you want to abort the request
controller.abort();
```

The `fs.readFile()` function buffers the entire file. To minimize memory costs, when possible prefer streaming via `fs.createReadStream()`.

Aborting an ongoing request does not abort individual operating system requests but rather the internal buffering `fs.readFile` performs.

#### File descriptors

1. Any specified file descriptor has to support reading.
2. If a file descriptor is specified as the path, it will not be closed automatically.
3. The reading will begin at the current position. For example, if the file already had `'Hello World'` and six bytes are read with the file descriptor, the call to `fs.readFile()` with the same file descriptor, would give `'World'`, rather than `'Hello World'`.

#### Performance Considerations

The `fs.readFile()` method asynchronously reads the contents of a file into memory one chunk at a time, allowing the event loop to turn between each chunk. This allows the read operation to have less impact on other activity that may be using the underlying libuv thread pool but means that it will take longer to read a complete file into memory.

The additional read overhead can vary broadly on different systems and depends on the type of file being read. If the file type is not a regular file (a pipe for instance) and Node.js is unable to determine an actual file size, each read operation will load on 64 KiB of data. For regular files, each read will process 512 KiB of data.

For applications that require as-fast-as-possible reading of file contents, it is better to use `fs.read()` directly and for application code to manage reading the full contents of the file itself.

The Node.js GitHub issue **[#25741](https://github.com/nodejs/node/issues/25741)** provides more information and a detailed analysis on the performance of `fs.readFile()` for multiple file sizes in different Node.js versions.

---

###

## Reading File(s)

### `fs.readFile(path[, flags[, mode]], callback)`

---

### `fs.rename`

---

## Truncating a File

### `fs.ftruncate(fd[, len], callback)`

- `fd <integer>`
- `len <integer>` - Default: 0
- `callback <Function>`
  - `err <Error>`

Truncates the file descriptor. No arguments other than a possible exception are given to the completion callback.

If the file referred to by the file descriptor was larger than len bytes, only the first len bytes will be retained in the file.

---

## [File System Flags](https://nodejs.org/api/fs.html#file-system-flags)

The following flags are available wherever the `flag` option takes a string.

- `'a'`: Open file for appending. The file is created if it does not exist.

- `'ax'`: Like 'a' but fails if the path exists.

- `'a+'`: Open file for reading and appending. The file is created if it does not exist.

- `'ax+'`: Like 'a+' but fails if the path exists.

- `'as'`: Open file for appending in synchronous mode. The file is created if it does not exist.

- `'as+'`: Open file for reading and appending in synchronous mode. The file is created if it does not exist.

- `'r'`: Open file for reading. An exception occurs if the file does not exist.

- `'r+'`: Open file for reading and writing. An exception occurs if the file does not exist. Modifying a file rather than replacing it may require the flag option to be set to `'r+'` rather than the default `'w'`.

- `'rs+'`: Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.

This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.

This doesn't turn fs.open() or fsPromises.open() into a synchronous blocking call. If synchronous operation is desired, something like fs.openSync() should be used.

- `'w'`: Open file for writing. The file is created (if it does not exist) or truncated (if it exists).

- `'wx'`: Like 'w' but fails if the path exists.

- `'w+'`: Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).

- `'wx+'`: Like 'w+' but fails if the path exists.

---

1. `fs.readFileSync` (synchronous)

```js
const fs = require('fs');
const buffer = fs.readFileSync('./assets/panagram.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
});

/** Do something with the buffer */
console.log(buffer);
```

2. `fs.readFile` (asynchronous)

```js
const fs = require('fs');
const buffer = fs.readFile('./assets/panagram.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  /** Do something with the data */
  console.log(data);
  return data;
});
```

3. `fsPromises`

```js
const fs = require('fs/promises');
const bufferFn = async () => {
  try {
    const data = await fs.readFile('./assets/panagram.txt');
    /** Do something with the data */
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

bufferFn();
```

---

# HTTP

To use the HTTP server and client one must `require('node:http')`.

The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses, so the user is able to stream data.

In order to support the full spectrum of possible HTTP applications, the Node.js HTTP API is very low-level. It deals with stream handling and message parsing only. It parses a message into headers and body but it does not parse the actual headers or the body.

---

## `http.createServer([options][, requestListener])`

Returns a new instance of [`http.Server`](https://nodejs.org/api/http.html#class-httpserver), i.e. creates a HTTP Server that listens on a PORT.

### The `requestListener` function

The `requestListener` is a function which is automatically added to the `request` event.

The `requestListener` function takes two arguments,

1. **request** - An instance of the [`http.IncomingMessage` Class](https://nodejs.org/api/http.html#class-httpincomingmessage) which extends the [`stream.Readable` Class](https://nodejs.org/api/stream.html#class-streamreadable).
2. **response** - An instance of the [`http.ServerResponse` Class](https://nodejs.org/api/http.html#class-httpserverresponse) which extends the [`http.OutgoingMessage` Class](https://nodejs.org/api/http.html#class-httpoutgoingmessage)

---

### Creating a HTTP Server

**Method 1:**

```js
const http = require('http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(3000, () => {
  console.log('Server is listening on PORT 3000!');
});
```

**Method 2:**

```js
const http = require('http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(3000, () => {
  console.log('Server is listening on PORT 3000!');
});
```

The events that are available for the [`http.Server` Class](https://nodejs.org/api/http.html#class-httpserver) are as follows:

<!--prettier-ignore-->
| Event Name | Description |
| ---------- | ----------- |
| `checkContinue` | Emitted each time a request with an HTTP Expect: 100-continue is received. If this event is not listened for, the server will automatically respond with a 100 Continue as appropriate. |
| `checkExpectation` | Emitted each time a request with an HTTP Expect header is received, where the value is not 100-continue. If this event is not listened for, the server will automatically respond with a 417 Expectation Failed as appropriate. |
| `clientError` | If a client connection emits an 'error' event, it will be forwarded here. Listener of this event is responsible for closing/destroying the underlying socket. For example, one may wish to more gracefully close the socket with a custom HTTP response instead of abruptly severing the connection. |
| `close` | Emitted when the server closes. |
| `connect` | Emitted each time a client requests an HTTP CONNECT method. If this event is not listened for, then clients requesting a CONNECT method will have their connections closed. |
| `connection` | This event is emitted when a new TCP stream is established. |
| `dropRequest` | When the number of requests on a socket reaches the threshold of `server.maxRequestsPerSocket`, the server will drop new requests and emit `dropRequest` event instead, then send `503` to client. |
| `request` | Emitted each time there is a request. There may be multiple requests per connection (in the case of HTTP Keep-Alive connections). |
| `upgrade` | Emitted each time a client requests an HTTP upgrade. Listening to this event is optional and clients cannot insist on a protocol change. |

---

# [String Decoder](https://nodejs.org/api/string_decoder.html)

The `node:string_decoder` module provides an API for decoding Buffer objects into strings in a manner that preserves encoded multi-byte UTF-8 and UTF-16 characters. It can be accessed using:

**CommonJS**

```cjs
const { StringDecoder } = require('string_decoder');
```

**ES6 Modules**

```es6
import { StringDecoder } from 'string_decoder';
```

The following example shows the basic use of the `StringDecoder` class.

```es6
import { StringDecoder } from 'string_decoder';
const decoder = new StringDecoder('utf8');

const cent = Buffer.from([0xc2, 0xa2]);
console.log(decoder.write(cent)); // ¢

const euro = Buffer.from([0xe2, 0x82, 0xac]);
console.log(decoder.write(euro)); // €
```

When a `Buffer` instance is written to the `StringDecoder` instance, an internal buffer is used to ensure that the decoded string does not contain any incomplete multibyte characters. These are held in the buffer until the next call to `stringDecoder.write()` or until `stringDecoder.end()` is called.

In the following example, the three UTF-8 encoded bytes of the European Euro symbol (**€**) are written over three separate operations:

```es6
import { StringDecoder } from 'string_decoder';
const decoder = new StringDecoder('utf8');

decoder.write(Buffer.from([0xe2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xac])));
```

---

## `new StringDecoder([encoding])`

- `encoding <string>` - The character encoding the `StringDecoder` will use. **Default:** `'utf8'`.

Creates a new `StringDecoder` instance.

```js
const decoder = new StringDecoder('utf8');
```

---

## `stringDecoder.write(buffer)`

- `buffer <Buffer> | <TypedArray> | <DataView>` - A `Buffer`, or `TypedArray`, or `DataView` containing the bytes to decode.
- Returns: `<string>`

Returns a decoded string, ensuring that any incomplete multibyte characters at the end of the `Buffer`, or `TypedArray`, or `DataView` are omitted from the returned string and stored in an internal buffer for the next call to `stringDecoder.write()` or `stringDecoder.end()`.

```es6
import { StringDecoder } from 'string_decoder';

const data = {};
const data.baseDir = "/home/jayantasamaddar/Work/quick-reference/nodejs/projects/RESTfulAPI/.data/";

_data.read = (dir, file, callback) => {
  fs.readFile(`${data.baseDir}${dir}/${file}.json`, (err, data) => {
    callback(err, data);
  });
};

_data.read('test', 'newFile', (error, data) => {
  const decoder = new StringDecoder('utf-8');
  const buffer = '' + decoder.write(data);
  console.log({ error, data: JSON.parse(buffer) });
  // Result: console.log({ error, data: JSON.parse(buffer) });
});
```

---

## `stringDecoder.end([buffer])`

- `buffer <Buffer> | <TypedArray> | <DataView>` - A `Buffer`, or `TypedArray`, or `DataView` containing the bytes to decode.
- Returns: `<string>`

Returns any remaining input stored in the internal buffer as a string. Bytes representing incomplete UTF-8 and UTF-16 characters will be replaced with substitution characters appropriate for the character encoding.

If the `buffer` argument is provided, one final call to `stringDecoder.write()` is performed before returning the remaining input. After `end()` is called, the `stringDecoder` object can be reused for new input.

---

# Stream

### What are Streams?

**Streams** are one of the fundamental concepts that power Node.js applications that are built on top of EventEmitter, used for handling huge amounts of data (reading/writing files, network communications, or any kind of end-to-end information exchange) in a sequential but efficient way.

Streams are not a concept unique to Node.js. They were introduced in the Unix operating system decades ago, and programs can interact with each other passing streams through the pipe operator (|).

For example, in the traditional way, when you tell the program to read a file, the file is read into memory, from start to finish, and then you process it.

Using streams you read it piece by piece, processing its content without keeping it all in memory.

The [Node.js stream module](https://nodejs.org/api/stream.html) provides the foundation upon which all streaming APIs are built. All streams are instances of [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

---

### Types of Streams

There are generally four different types of Streams.

1. **Readable Stream** - A readable stream is an abstraction for a source from which data can be consumed. Example: `fs.createWriteStream()` method.
2. **Writable Stream** - A writable stream is an abstraction for a destination to which data can be written. Example: `fs.createWriteStream()` method.
3. **Duplex Stream** - A duplex stream is both Readable and Writable. An example of that is a TCP socket. Example: `net.Socket` class and its methods.
4. **Transform Stream** - A transform stream is basically a duplex stream that can be used to modify or transform the data as it is written and read. An example of that is the zlib.createGzip stream to compress the data using gzip. You can think of a transform stream as a function where the input is the writable stream part and the output is readable stream part. You might also hear transform streams referred to as "through streams." For example: `zlib.createDeflate()` method.

---

### Why Streams

Streams basically provide two major advantages over using other data handling methods:

1. **Memory efficiency**: You don't need to load large amounts of data in memory before you are able to process it. Instead data is read and processed in small chunks.
2. **Time efficiency**: It takes way less time to start processing data, since you can start processing as soon as you have it, rather than waiting till the whole data payload is available.

---

### Subscribable Events of Streams

Streams are a good way to asynchronously read large volume sequential data. In order to read sequential data in an efficient manner, streams are based on Event Emitters. Streams have events that we can subscribe to

| Event Name | Readable Stream    | Transform Stream   | Duplex Stream      | Writable Stream    |
| ---------- | ------------------ | ------------------ | ------------------ | ------------------ |
| `close`    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `data`     | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                    |
| `end`      | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                    |
| `error`    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `pause`    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                    |
| `readable` | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                    |
| `resume`   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                    |
| `drain`    |                    |                    |                    | :heavy_check_mark: |
| `finish`   |                    |                    |                    | :heavy_check_mark: |
| `pipe`     |                    |                    |                    | :heavy_check_mark: |
| `unpipe`   |                    |                    |                    | :heavy_check_mark: |

> **Note:** Two events to be mentioned are `pause` and `resume`. In case we have differences in the capability of the computers in the network, on how fast the sender can send data v/s how fast the receiver can write data, we can get into conflict of back pressure.
> Thus we should be able to make some sort of pauses from reading from the source, prior to writing to the destination, otherwise the Buffer that stores the chunks will get clogged.

---

### Node.js Internal Libraries that use Streams

The following Node.js libraries use Streams at its core functions.

| Module    | Example Functions                                              |
| --------- | -------------------------------------------------------------- |
| `process` | `stdin`, `stdout`, `stderr`                                    |
| `fs`      | `createReadStream`, `createWriteStream`                        |
| `net`     | `socket`                                                       |
| `zlib`    | `createGzip`, `createGunzip`, `createInflate`, `createDeflate` |
| `crypto`  | `createCypheriv`                                               |

---

### An Example of a Stream

Using the Node.js `fs` module, you can read a file, and serve it over HTTP when a new connection is established to your HTTP server:

**A typical example is reading files from a disk:**

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  fs.readFile(`${__dirname}/data.txt`, (err, data) => {
    res.end(data);
  });
});
server.listen(3000);
```

Where,

- `readFile()` reads the full contents of the file, and invokes the callback function when it's done.
- `res.end(data)` in the callback will return the file contents to the HTTP client.

If the file is big, the operation will take quite a bit of time. Here is the same thing written using streams:

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(`${__dirname}/data.txt`);
  stream.pipe(res);
});
server.listen(3000);
```

Instead of waiting until the file is fully read, we start streaming it to the HTTP client as soon as we have a chunk of data ready to be sent.

---

### Agenda

- Creation of
  - Readable Stream
  - Transform Stream
  - Duplex Stream piping data through streams
  - Writable Stream
- Combination of async generators and Streams
- Better error handling using pipeline

---

### Creating a Readable Stream
