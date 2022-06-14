# What is [`yargs`](https://www.npmjs.com/package/yargs)?

**Yargs** helps you build interactive command line tools, by parsing arguments and generating an elegant user interface.

---

# Why do we need `yargs`?

As Nodejs applications become more complex the command line parameters may use commands with multiple flags and parameters. This can be tricky to handle by yourself as the ordering of the flags can change and there can be things like alias' too. So the npm package **[`yargs`](https://www.npmjs.com/package/yargs)** comes to the rescue here and does all the heavy lifting for us! The parameters are packaged up nicely into a JSON object that we can query for the desired functionality based on the command line parameters specified.

---

# Installation

Install `yargs` as a devDependency:-

Using **`npm`**:

```
npm i -D yargs
```

Using **`yarn`**:

```
yarn add -D yargs
```

---

# Things to know before using `yargs`

1. `process.argv` is an array of strings that represent the command line parameters. The first two elements are the path to the executable and the remaining elements are the commands. `argv` stands for "argument value".

   #### Example:-

   **In `index.js`:**

   ```
   console.log(process.argv);
   ```

   **CLI command:**

   ```
   node index.js build
   ```

   **Output in Console:**

   ```
   [
   '/usr/local/bin/node',
   '/home/jayantasamaddar/Work/quick-reference/yargs/index.js',
   'build'
   ]
   ```

We can access the array elements just like a javascript element. For instance, to access only an array of commands, we can use the following code:

Example for `node index.js build --dev`

    ```
    const argv = process.argv.slice(2);
    console.log(argv);    // ['build', '--dev']
    ```

---

# Parsing command line parameters using `yargs`

The way `yargs` works is, we have to wrap the command line parameters in a JSON object. The JSON object is then passed to the `yargs` library to parse the command line parameters.

**In `index.js`:**

```
const yargs = require('yargs');
const argv = yargs(process.argv.slice(2));
```

**CLI command:**

```
node index.js build --dev
```

**Output in Console:**

```
YargsInstance {
  customScriptName: false,
  parsed: false,
  '$0': 'index.js',
  argv: [Getter]
}
```

We can notice that argv is a property inside the returned object. This is because `yargs` internally creates a `yargs.argv` object and assigns it to the `argv` property.

Hence to access the command line parameters, we can use the following code:

**In `index.js`:**

```
import yargs from 'yargs';
const { argv } = yargs(process.argv.slice(2));

console.log(argv);
```

**CLI command:**

```
node index.js build --dev
```

**Output in Console:**

```
{ _: [ 'build' ], dev: true, '$0': 'index.js' }
```

> **Note**: `hideBin` is a shorthand for **[`process.argv.slice(2)`](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)**. It has the benefit that it takes into account variations in some environments, e.g., **[Electron](https://github.com/electron/electron/issues/4690)**.

## Using `hideBin` as a wrapper to pass `process.argv`

**In `index.js`**

```
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const { argv } = yargs(hideBin(process.argv));  // same as yargs(process.argv.slice(2))

console.log(argv);  // { _: [ 'build' ], dev: true, '$0': 'index.js' }
```

---

# Using `yargs` to build a Command Line Interface

We can use `yargs` to build a Command Line Interface (CLI) for our application:-

#### Example:-

**In `index.js`:**

```
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const { argv } = yargs(hideBin(process.argv));

if(argv.dev) {
  console.log('Running in development mode');
  // Insert code to execute in development mode
} else {
  console.log('Running in production mode');
  // Insert code to execute in production mode
}
```

**CLI command:**

```
node index.js build --dev
```

**Output in Console:**

```
{ _: [ 'build' ], dev: true, '$0': 'index.js' }
Running in development mode
```

---

# Typescript Support

`yargs` has type definitions at **[`@types/yargs`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/yargs)**.

---
