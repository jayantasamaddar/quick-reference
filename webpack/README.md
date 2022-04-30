# What is [Webpack](https://webpack.js.org)?
Webpack is a free and open-source module bundler for JavaScript. It is made primarily for JavaScript, but it can transform front-end assets such as HTML, CSS, and images if the corresponding loaders are included. Webpack takes modules with dependencies and generates static assets representing those modules.

Since version 4.0.0, webpack does not require a configuration file (`webpack.config.js`) to bundle your project. Nevertheless, it is incredibly configurable to better fit your needs.

The current Webpack version during the time of this Reference Guide is v5.72.0

---

# Core Concepts
At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.

To get started you only need to understand its Core Concepts:

- **[Entry](https://webpack.js.org/concepts/entry-points/)**
- **[Output](https://webpack.js.org/concepts/output/)**
- **[Loaders](https://webpack.js.org/concepts/loaders/)**
- **[Plugins](https://webpack.js.org/concepts/plugins/)**
- **[Mode](https://webpack.js.org/configuration/mode/)**
- **Browser Compatibility** - Webpack supports all browsers that are ES5-compliant (IE8 and below are not supported). Webpack needs Promise for import() and require.ensure(). If you want to support older browsers, you will need to load a polyfill before using these expressions.

---

# Basic Setup
- Install Webpack as a devDependency by using `npm i -D webpack webpack-cli`
- In `package.json` add the following to scripts: 
```
"scripts": {
    "build": "webpack --mode production" 
}
```
- Create a `webpack.config.js` file. The `--mode production` can be removed once `webpack.config.js` is added where `mode`, along with other configurations can be set. Add the following webpack configuration:

```
const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
}
```

---

# Running Webpack
`npm run build` will build bundle the modules into a `main.js` by default in the `dist` folder. This `main.js` contains all the necessary scripts that we can ask the browser to run by adding a script tag to the `index.html`.

---

# **[Loaders](https://webpack.js.org/concepts/loaders/)**
Loaders are transformations that are applied to the source code of a module. They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or load inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!

### Case 1: Webpack to pre-process SASS to CSS for the browser

- **Install Dependencies**: `npm i -D sass style-loader css-loader sass-loader`
- **Add a `main.scss` file inside the styles folder.**
- **`import './styles/main.scss'` to `index.js`**
- **Add loaders to `webpack.config.js`**
  
The way we add loaders to the configuration file is through the following syntax:

#### Syntax
```
const path = require('path');
module.exports = {
    // Add entry, mode and output
    
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}
```

**Where**,
- Loaders are declared using the `module` object.
- `rules` is an array containing loader configuration objects.
- Each loader configuration object contains a `test` property that is a regex that refers to the file extension.
- Each loader configuration object contains an `use` property that refers to the imported loader. Can be a string or an array. (*Note: Loaders are evaluated/executed from right to left (or from bottom to top). In the example below execution starts with sass-loader, continues with css-loader and finally ends with style-loader*)

---

# Plugins
A webpack plugin is a JavaScript object that has an [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method. This apply method is called by the webpack compiler, giving access to the entire compilation lifecycle.

Plugins are the backbone of webpack. Webpack itself is built on the same plugin system that you use in your webpack configuration!

They also serve the purpose of doing anything else that a loader cannot do. Webpack provides many **[such plugins](https://webpack.js.org/plugins/)** out of the box.

### Use Case 1: Using the [HTMLWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) to build the HTML file with the scripts and CSS in the dist folder

- **Install Dependencies**: `npm i -D html-webpack-plugin`
- **Configure `webpack.config.js`**

#### Syntax
```
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Add entry, mode
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }, 
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Webpack App',
            template: './public/index.html',
            filename: 'index.html',
        })
    ]
}
```

**Where**,
- Plugins are declared using the `plugins` array.
- In case of the `html-webpack-plugin`, we initialize it with `new HTMLWebpackPlugin(options)` which takes in an `options` object. Check all the options **[HERE](https://github.com/jantimon/html-webpack-plugin#options)**
- `title` refers to the HTML title of the build file.
- `template` refers to a HTML template file that serves as reference for the build.
- `filename` refers to the created HTML file.
- The destination is the same as what is configured in the `path` property in the `output` object.
- The filename declared in output (here: `bundle.js` ) is to be added via a `script` tag at the end of the `head` tag.