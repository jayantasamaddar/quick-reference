# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is SASS?](#what-is-sass)
- [Core Features](#core-features)
  - [Variables](#variables)
  - [Nesting](#nesting)
  - [Partials](#partials)
  - [Modules](#modules)
  - [Mixins](#mixins)
  - [Functions](#functions)
  - [Extend / Inheritance](#extend--inheritance)
  - [Operators](#operators)
  - [Conditionals](#conditionals)
- [Setup and Installation](#setup-and-installation)
  - [Installation](#installation)
  - [In Node.js](#in-nodejs)
  - [In Next.js](#in-nextjs)
- [References](#references)

# What is SASS?

SASS stands for Syntactically Awesome Stylesheets. SASS is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS) as the browser doesn't directly interpret SASS. It let's the developer use features that do not exist in CSS, like variables, conditionals etc. SASS uses the file extension

SASS consists of two syntaxes:

- The original syntax (`.sass`) called "the indented syntax," uses a syntax similar to Haml. It uses indentation to separate code blocks and newline characters to separate rules.
- The newer syntax, SCSS (`.scss`), uses block formatting like that of CSS. It uses braces to denote code blocks and semicolons to separate rules within a block.

The indented syntax and SCSS files are traditionally given the extensions `.sass` and `.scss`, respectively.

---

# Core Features

- **[Variables](#variables)**
- **[Nesting](#nesting)**
- **[Partials](#partials)**
- **[Modules](#modules)**
- **[Mixins](#mixins)**
- **[Functions](#functions)**
- **[Extend / Inheritance](#extend--inheritance)**
- **[Operators](#operators)**
- **[Conditionals](#conditionals)**

---

## Variables

Think of variables as a way to store information that you want to reuse throughout your stylesheet. You can store things like colors, font stacks, or any CSS value you think you'll want to reuse. SASS uses the **`$`** symbol as a prefix, to make something a variable. Here's an example:

**Pre-processed SCSS:**

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

When the SASS is processed, it takes the variables we define for the $font-stack and $primary-color and outputs normal CSS with our variable values placed in the CSS. This can be extremely powerful when working with brand colors and keeping them consistent throughout the site.

**Post-processed CSS:**

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

> **Note:** CSS3 now has Variables called Custom Properties

---

## Nesting

When writing HTML you've probably noticed that it has a clear nested and visual hierarchy. CSS, on the other hand, doesn't.

SASS will let you nest your CSS selectors in a way that follows the same visual hierarchy of your HTML. Be aware that overly nested rules will result in over-qualified CSS that could prove hard to maintain and is generally considered bad practice.

With that in mind, here's an example of some typical styles for a site's navigation:

**Pre-procesed SASS:**

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

You'll notice that the `ul`, `li`, and `a` selectors are nested inside the `nav` selector. This is a great way to organize your CSS and make it more readable.

**Post-processed CSS:**

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

---

## Partials

You can create partial SASS files that contain little snippets of CSS that you can include in other SASS files. This is a great way to modularize your CSS and help keep things easier to maintain. A partial is a SASS file named with a leading underscore. You might name it something like **`_partial.scss`**. The underscore lets SASS know that the file is only a partial file and that it should not be generated into a CSS file. SASS partials are used with the **`@use`** rule.

---

## Modules

You don't have to write all your SASS in a single file. You can split it up however you want with the **`@use`** rule. This rule loads another SASS file as a _module_, which means you can refer to its **[variables](#variables)**, **[Mixins](#mixins-and-functions)** in your SASS file with a namespace based on the filename. Using a file will also include the CSS it generates in your compiled output!

**Pre-processed SCSS:**

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

> **Note:** We're using **`@use 'base';`** in the **`styles.scss`** file. When you use a file you don't need to include the file extension. SASS is smart and will figure it out for you.

**Post-processed CSS:**

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

> **Note:** Unlike Plain CSS imports, which makes multiple HTTP requests as it renders your page, SASS handles the imports entirely during compilation, so we end up with one big CSS file that you can upload to your server. This is great for creating Components like Buttons and Alerts, where you can have a separate partial file for each component, like `_Button.scss` and only compile it at the page level, `Checkout.scss`.

---

## Mixins

Some things in CSS are a bit tedious to write, especially with CSS3 and the many vendor prefixes that exist. A mixin lets you make groups of CSS declarations that you want to reuse throughout your site. It helps keep your SASS very **DRY**. You can even pass in values to make your mixin more flexible. Here's an example for **`theme`**.

**Pre-processed SCSS:**

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

To create a mixin you use the **`@mixin`** directive and give it a name. We've named our mixin **`theme`**. We're also using the variable **`$theme`** inside the parentheses so we can pass in a theme of whatever we want. After you create your mixin, you can then use it as a CSS declaration starting with **`@include`** followed by the name of the mixin.

**Post-processed CSS:**

```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

---

## Functions

Functions allow you to define complex operations on SassScript values that you can re-use throughout your stylesheet. They make it easy to abstract out common formulas and behaviors in a readable way.

Here's an example for a container with `min-height` equal to viewport height minus the `height` of the header.

**Pre-processed SASS:**

```scss
$header-height: 3rem;
$header-margin: 0.75rem;

@function headerHeight($height: $header-height, $margin: $header-margin) {
  @return $height + 2 * $margin;
}

/** Usage */
.container {
  padding-top: calc(
    100vh - headerHeight()
  ); // Evaluates to `calc(100vh - 4.5rem)`
}
```

> **Note:** Functions differ from **`mixins`** by the simple fact that **`functions`** always have to **`@return`** a **`value`** whereas mixins return consolidated groups of CSS declarations. Functions also do not need an **`@include`** to be called unlike **`mixins`**.

**Post-processed CSS:**

```css
.container {
  padding-top: calc(100vh - 4.5rem);
}
```

---

## Extend / Inheritance

Using **`@extend`** lets you share a set of CSS properties from one selector to another. In our example we're going to create a simple series of messaging for errors, warnings and successes using another feature which goes hand in hand with extend, placeholder classes. A placeholder class is a special type of class that only prints when it is extended, and can help keep your compiled CSS neat and clean.

**Pre-processed SCSS:**

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

What the above code does is tells **`.message`**, **`.success`**, **`.error`**, and **`.warning`** to behave just like **`%message-shared`**. That means anywhere that **`%message-shared`** shows up, **`.message`**, **`.success`**, **`.error`**, & **`.warning`** will too. The magic happens in the generated CSS, where each of these classes will get the same CSS properties as **`%message-shared`**. This helps you avoid having to write multiple class names on HTML elements.

You can extend most simple CSS selectors in addition to placeholder classes in SASS, but using placeholders is the easiest way to make sure you aren't extending a class that's nested elsewhere in your styles, which can result in unintended selectors in your CSS.

> **Note:** The CSS in **`%equal-heights`** isn't generated, because **`%equal-heights`** is never extended.

**Post-processed CSS:**

```css
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  border-color: green;
}

.error {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  border-color: red;
}

.warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  border-color: yellow;
}
```

---

## Operators

Doing math in your CSS is very helpful. SASS has a handful of standard math operators like **`+`**, **`-`**, **`*`**, **`math.div()`**, and **`%`**. In our example we're going to do some simple math to calculate widths for an **`article`** and **`aside`**.

**Pre-processed SCSS:**

```scss
@use 'sass:math';

.container {
  display: flex;
}

article[role='main'] {
  width: math.div(600px, 960px) * 100%;
}

aside[role='complementary'] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

We've created a very simple fluid grid, based on 960px. Operations in SASS let us do something like take pixel values and convert them to percentages without much hassle.

**Post-processed CSS:**

```css
.container {
  display: flex;
}

article[role='main'] {
  width: 62.5%;
}

aside[role='complementary'] {
  width: 31.25%;
  margin-left: auto;
}
```

---

## Conditionals

Conditionals make SASS be able to generate CSS based on conditional statements like a programming language like JavaScript.

- The **`@if`** rule is written **`@if <expression> { ... }`**, and it controls whether or not its block gets evaluated (including emitting any styles as CSS). The expression usually returns either **`true`** or **`false`** — if the expression returns **`true`**, the block is evaluated, and if the expression returns **`false`** it’s not.

- An **`@if`** or an **`@else if`** rule can optionally be followed by an **`@else`** rule, written **`@else { ... }`**. This rule’s block is evaluated if the **`@if`** expression returns false.

- You can also choose whether to evaluate an **`@else`** rule’s block by writing it **`@else if <expression> { ... }`**. If you do, the block is evaluated only if the preceding **`@if`**‘s expression returns **`false`** and the **`@else if`**’s expression returns **`true`**.

In fact, you can chain as many **`@else if`**s as you want after an **`@if`**. The first block in the chain whose expression returns **`true`** will be evaluated, and no others. If there’s a plain **`@else`** at the end of the chain, its block will be evaluated if every other block fails.

**Pre-processed SCSS:**

```scss
@use 'sass:math';

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

**Post-processed CSS:**

```css
.next {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 2.5px;
  border-left-color: black;
}
```

> **Note:** Some languages consider more values falsy than just **`false`** and **`null`**. SASS isn’t one of those languages! Empty strings, empty lists, and the number 0 are all truthy in SASS.

---

# Setup and Installation

## Installation

The **`sass`** NPM module is a distribution of Dart SASS, compiled to pure JavaScript with no native code or external dependencies. It provides a Command-Line SASS executable and Node.js API.

```s
# Using NPM
npm install --save-dev sass

# Using YARN
yarn add -D sass
```

## In Node.js

```js
const sass = require('sass');

const result = sass.compile(scssFilename);
```

## In Next.js

Next.js allows you to import SASS using both the `.scss` and `.sass` extensions. You can use component-level SASS via CSS Modules and the `.module.scss` or `.module.sass` extension.

Refer to the **[Next.js docs](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)** for details.

1. **Install SASS:**

   ```s
   # Using NPM
   npm i -D sass

   # Using YARN
   yarn add -D sass
   ```

2. **Update Existing CSS to SCSS**

   - Rename `globals.css` to **`globals.scss`**. Reflect this in the import in **`pages/_app.tsx`**.
   - Rename `Home.module.css` to **`Home.module.scss`**. Reflect this in the import in **`pages/index.tsx`**.

3. **Create `mixins` and `variables` as `partials`**

   - In the `styles` directory, create two files, **`_variables.scss`** and **`_mixins.scss`** to hold `variables` and `mixins` respectively.
   - They can be imported into **`Home.module.scss`** and **`globals.scss`** using **`@import/mixins`** and **`@import/variables`** at the top of the page:

   ```scss
   @import 'variables';
   @import 'mixins';
   ```

4. **Create a Webpack config to have a better way to import styles from the styles folder**

   We want the `variables`, `mixins` and any styles in `styles` folder be accessible to any component level scss file using a simple syntax as follows:

   ```scss
   @import '@styles/variables';
   @import '@styles/mixins';
   ```

   This can be made possible by updating the webpack configuration to resolve the absolute path to the **`styles`** folder to **`@styles`** no matter which location of the project the `.scss` files inside the directory is accessed from:

   In **`next.config.js`**,

   ```js
   const path = require('path');
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     webpack(config) {
       config.resolve.alias = {
         ...config.resolve.alias,
         '@styles': path.resolve(__dirname, '/styles'),
       };
       return config;
     },
   };

   module.exports = nextConfig;
   ```

5. **Make Nesting work**

   If we choose to not nest, we can see how the `Home.module.scss` is setup and refer to `pages/index.tsx` to see how the CSS classes are applied to the various elements. This works the same way as regular CSS works inside Next.js.

   However, nesting is one of the most important features of SASS. To get it to work in a Next.js project with CSS modules, we have to use the `:global` to switch to global scope.

   Read more about [Exceptions in CSS Modules](https://github.com/css-modules/css-modules#exceptions).

   **Example:**

   ```s
   # Files in components/Testimonial

   ├── index.ts
   ├── Testimonial.module.scss
   └── Testimonial.tsx
   ```

   In `Testimonial.module.scss`,

   ```scss
   @import '@styles/mixins';
   @import '@styles/variables';

   .testimonial {
     @include flexCenter(column) {
       border: 1px solid $color-button;
       width: 300px;
     }
     h4 {
       padding: 15px 15px 0;
       margin: 0;
     }
     p {
       padding: 15px;
     }

     :global .testimonial_content {
       @include flexCenter(column, center, flex-start);

       :global .testimonial_context {
         :global .testimonial_service {
           padding-top: 5px;
         }
       }
     }
   }
   ```

---

# References

- **[SASS Lang](https://SASS-lang.com)**
- **[NPM - SASS](https://www.npmjs.com/package/sass)**
- **[SASS - Built-in Modules](https://sass-lang.com/documentation/modules)**
- **[SASS - At-Rules](https://sass-lang.com/documentation/at-rules)**
