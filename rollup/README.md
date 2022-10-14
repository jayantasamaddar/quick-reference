# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Rollup?](#what-is-rollup)
- [The Project](#the-project)
- [SVGR](#svgr)
  - [Installation](#installation)
  - [Adding script to `package.json`](#adding-script-to-packagejson)
- [Building and Shipping the Icons Library](#building-and-shipping-the-icons-library)
  - [Why Rollup as a module bundler of choice?](#why-rollup-as-a-module-bundler-of-choice)
  - [Using `rollup` and `@rollup/plugin-babel`](#using-rollup-and-rollupplugin-babel)
  - [Modifying Babel plugin options](#modifying-babel-plugin-options)
    - [Installing other Babel Presets](#installing-other-babel-presets)
  - [Building the package with Rollup](#building-the-package-with-rollup)
  - [Additional DevDependencies to Consider](#additional-devdependencies-to-consider)
  - [Pre-requisites before publishing as a NPM Package](#pre-requisites-before-publishing-as-a-npm-package)
    - [Alternatives: - Using SVGR as a Rollup Plugin](#alternatives---using-svgr-as-a-rollup-plugin)
      - [Installation](#installation-1)
      - [Usage with Rollup](#usage-with-rollup)

---

# What is [Rollup](https://rollupjs.org/)?

Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the new standardized format for code modules included in the ES6 revision of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and UMD. ES modules let you freely and seamlessly combine the most useful individual functions from your favorite libraries. This will eventually be possible natively everywhere, but Rollup lets you do it today.

---

# The Project

Take the SVGs from the `assets` folder, which may come in various sizes and convert them into reusable React Components.

We will use some other tools apart from Rollup:-

- **`@svgr/cli`** - a tool for converting SVG files into React Components. Alternatives are to use **`@svgr/core`** or **`@svgr/rollup`**.
- **`rimraf`** - a tool for deleting files and folders, used for cleanup. The linux command `rm -rf` is a good alternative (remove target folder and subfolders and files inside recursively and ignore errors).
- **Rollup plugins**
  - **`@rollup/plugin-babel`** - for transpiling ES6+ to ES5 at build time.
  - **[`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime)** - devDependency plugin that enables the re-use of Babel's injected helper code to save on codesize.
  - **[`@babel/runtime`](https://babeljs.io/docs/en/babel-runtime)** - Sometimes Babel may inject some code in the output that is the same across files, and thus can be potentially re-used. This is meant to be used as a runtime `devDependency` along with the Babel plugin `@babel/plugin-transform-runtime`.
  - **`rollup-plugin-filesize`** - for calculating the size of the bundle
- Babel Plugins
- Babel Presets

---

# [SVGR](https://react-svgr.com/)

SVGR handles all type of SVG and transforms it into a React component.

SVGR provides an official [`rollup.js`](https://rollupjs.org/) plugin to import SVG as React components.

There are various ways of using SVGR, but we will use the CLI, because we want to run it as an NPM script and package up the output using Rollup.

## Installation

```s
# Using NPM
npm i -D @svgr/cli rimraf

# using YARN
yarn add -D @svgr/cli rimraf
```

## Adding script to `package.json`

Add a script to `package.json` to run SVGR:

```json
"scripts": {
  "svgr": "svgr --icon --replace-attr-values '#5C5F62=currentColor' --out-dir src assets"
}
```

Where,

- `svgr` - The name of the script that can be invoked from the command line using `npm run svgr` or `yarn svgr`.
- `--icon` - A flag to SVGR which will generate a React component for each SVG.
- `--replace-attr-values '#5C5F62=currentColor'` - A flag to SVGR which will replace all occurrences of `#5C5F62` with `currentColor`.
- `-d` or `--out-dir` - A flag to SVGR which will output the React components to the `src` directory while using `assets` as source.

Refer to the [SVGR Options Reference](https://react-svgr.com/docs/options/) for more options.

This is all we need to bundle our code into a publishable npm package. For that we will use Rollup.

---

# Building and Shipping the Icons Library

## Why Rollup as a module bundler of choice?

Rollup helps us bundle our code into an ES module that we can publish as a npm package.

Rollup has a number of features that make it a great choice for bundling code:-

- It can bundle code into a single ES module.
- Generates code that is tree shakeable. This means that we can remove unused code from our bundle.
- Ensures we ship a small package with the minimum amount of code.
- Has a number of plugins that we can use alongside it. For example,

  - `@svgr/rollup` - it can bundle SVG files as React components with `@svgr/rollup` plugin (See below. Although we are using the CLI, we can use the `rollup` command to run it). This is a great tool for bundling SVG files.
  - `@rollup/plugin-babel` - it can convert ES6/ES7 code to a standardized javascript bundle that can run in our target environment. We will be using this in this project.

---

## Using `rollup` and [`@rollup/plugin-babel`](https://github.com/rollup/plugins/tree/master/packages/babel)

To use `rollup` and `@rollup/plugin-babel` we will need to install them and create a `rollup.config.js` config file.

**Install:**

    ```
    npm i -D rollup @rollup/plugin-babel
    # or use yarn
    yarn add -D rollup @rollup/plugin-babel
    ```

**Default setup in `rollup.config.js`**:

    ```es6
    import { babel } from '@rollup/plugin-babel';

    const config = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.esm.js',
        format: 'esm'
    },
    plugins: [babel({ babelHelpers: 'bundled' })]
    };

    export default config;
    ```

Where,

- `input` is the entry point of the project.
- `output` is the output configuration options. Can either be an object, for single output, or an array of objects, for multiple outputs.

  Example of multiple outputs:-

  ```es6
  output: [
      { file: 'dist/index.esm.js', format: 'esm' },
      { file: 'dist/index.js', format: 'cjs' }
  ```

  - `dir` is the output directory. Do not provide `dir` if file is provided, use the `\` to create a directory structure in the `file` property instead.
  - `format` is the format of the output file. (REQUIRED)
  - `file` is the name of the path and name of the output file.

- `plugins` is an array of installed plugins to use.

Here's a guide to setup the `rollup.config.js` file: [https://rollupjs.org/guide/en#configuration-file](https://rollupjs.org/guide/en#configuration-file)

**Since Rollup bundles in ES6, we need to add the `modules` option to the `package.json` file.**

In **`package.json`** add the entry point of the file as `module` instead of `main` which chooses `commonJS` module by default:

    ```json
    "module": "dist/index.esm.js",
    ```

---

## Modifying Babel plugin options

The babel plugin takes in a few [**options**](https://github.com/rollup/plugins/tree/master/packages/babel#options) to help us set up the `@rollup/plugin-babel`.

For our particular project, we need to modify certain options:

- `babelHelpers` - We need to set this to `'runtime'` from `'bundled'`. It has to be used in combination with [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime).
- Install the [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime) and `@babel/runtime` as plugin as **`devDependencies`**.

  ```s
  # Using NPM
  npm i -D @babel/runtime
  npm i -D @babel/plugin-transform-runtime

  # Using YARN
  yarn add -D @babel/runtime
  yarn add -D @babel/plugin-transform-runtime
  ```

- Add `external: [/@babel\/runtime/]` to the `rollup.config.js`.
- Modify `plugins` in `rollup.config.js` to include the `@babel/plugin-transform-runtime` babel plugin.

  In **`rollup.config.js`**,

  ```es6
  external: [/@babel\/runtime/]
  plugins: [
      babel({
          babelHelpers: 'runtime',
          plugins: ['@babel/plugin-transform-runtime'],
      }),
  ],
  ```

---

### Installing other Babel Presets

We will be using the [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) preset and the [`@babel/preset-react`](https://babeljs.io/docs/en/babel-preset-react) preset because we are using modern javascript syntax that the browsers can't currently support.

- `@babel/preset-env` - This preset is used to transform our code to a modern javascript syntax that the browsers can understand (For compiling ES2015+ syntax).
- `@babel/preset-react` - This preset is used to transform our code to a modern javascript syntax that the browsers can understand (For compiling React JSX syntax).

**Install the presets:**

```s
# Using NPM
npm i -D @babel/preset-env @babel/preset-react

# Using YARN
yarn add -D @babel/preset-env @babel/preset-react
```

**Configure Presets**

- Create a `.babelrc` file in the root directory of your project.

Add the following to the **`.babelrc`** file:

    ```json
    {
        "presets": [
            ["@babel/preset-env", { "targets": "defaults" }],
            "@babel/preset-react"
        ]
    }
    ```

- Add external support for `react` and `react-dom` to the `rollup.config.js` file.

  In **`rollup.config.js`**,

  ```es6
  import { babel } from '@rollup/plugin-babel';

  const config = {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    external: [/@babel\/runtime/, 'react', 'react-dom'],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
    ],
  };

  export default config;
  ```

---

## Building the package with Rollup

Add the following to your **`package.json`**:

```json
"scripts": {
    "svgr": "svgr --icon --title-prop --replace-attr-values '#5C5F62=currentColor' --ext=jsx -d ./src/components/icons assets",
    "prebuild": "rimraf ./src && rimraf ./dist",
    "build": "yarn svgr && rollup -c",
    "dev": "rollup -c -w"
}
```

**Where**,

- `-c` is the flag to rollup to compile the code based on a config file. If value unspecified, defaults to `rollup.config.js` file.
- `-w` is the flag to rollup to watch files in bundle and rebuild on changes.
- On the `prebuild` command, we will delete the `src` directory and the `dist` directory. The `prebuild` command is run before we start building the bundle.

> Use `yarn build` or `npm run build` to build the bundle.

---

## Additional DevDependencies to Consider

- [`rollup-plugin-filesize`](https://www.npmjs.com/package/rollup-plugin-filesize) - This plugin is used to calculate the size of the bundle.
- `rollup-plugin-terser` - This plugin is used to minify the bundle.
- `rollup-plugin-visualizer` - This plugin is used to generate a visual graph of the bundle.
- `rollup-plugin-node-resolve` - This plugin is used to resolve modules.
- `rollup-plugin-commonjs` - This plugin is used to convert CommonJS modules to ES6 modules.
- `rollup-plugin-json` - This plugin is used to convert JSON files to ES6 modules.
- `rollup-plugin-postcss` - This plugin is used to convert CSS files to ES6 modules.
- `rollup-plugin-sass` - This plugin is used to convert Sass files to ES6 modules.
- `rollup-plugin-scss` - This plugin is used to convert SCSS files to ES6 modules.
- `rollup-plugin-less` - This plugin is used to convert Less files to ES6 modules.
- `rollup-plugin-stylus` - This plugin is used to convert Stylus files to ES6 modules.
- `rollup-plugin-peer-deps-external` - This plugin is used to resolve peer dependencies and ensure we exclude them.
- `@rollup/plugin-node-resolve` - This plugin is used to resolve any third-party node modules (dependencies) that are used by the project.

---

## Pre-requisites before publishing as a NPM Package

1. In our package.json file, we have to add the following:

```json
"files": [
    "dist"
]
```

2. Test if the package is working by installing it locally on a separate project.

- `yarn pack <path>` or `npm pack <path>` to create a `package.tgz` file.
- Install the `package.tgz` file in the local project using `yarn install <path>` or `npm install <path>`.
- Use the Icons in the project by importing as ReactComponent from `@ursa/icons`.

  **For Example:**

  ```es6
  import { Icon } from '@ursa/icons';

  const IconExample = () => (
    <Icon title="Icon Title" style={{ fontSize: '10rem', color: `#FF7799` }} />
  );
  ```

3. Once we can confirm that the components are working fine, we can publish the package to the NPM registry using:

   ```s
   # Using NPM
   npm publish

   # Using YARN
   yarn publish
   ```

---

### Alternatives: - Using SVGR as a Rollup Plugin

#### Installation

```s
# Using NPM
npm i -D @svgr/rollup

# Using YARN
yarn add -D @svgr/rollup
```

#### Usage with Rollup

In **`rollup.config.js`**:

```es6
import svgr from '@svgr/rollup';

export default {
  plugins: [svgr()],
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
};
```

In **`star.jsx`**:

```es6
import Star from './star.svg';

const App = () => (
  <div>
    <Star />
  </div>
);
```
