# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [What is Vue.js](#what-is-vuejs)
  - [Why use Vue](#why-use-vue)
  - [Basic Layout of a Vue Component](#basic-layout-of-a-vue-component)
  - [Working with State / Data](#working-with-state--data)
  - [Options API vs Composition API](#options-api-vs-composition-api)
- [Setup and Installation](#setup-and-installation)
  - [Using the CDN](#using-the-cdn)
    - [Using the Global Build](#using-the-global-build)
    - [Using the ES Module Build](#using-the-es-module-build)
    - [Enabling Import Maps](#enabling-import-maps)
  - [Using the CLI](#using-the-cli)
    - [Overview](#overview)
    - [Installation](#installation)
    - [Upgrading](#upgrading)
    - [GUI](#gui)
    - [Intitialize a Project](#intitialize-a-project)
  - [Scaffolding using `create-vue`](#scaffolding-using-create-vue)
    - [Initialization](#initialization)
    - [Difference from Vue CLI](#difference-from-vue-cli)
- [Project 1 - Random User Generator](#project-1---random-user-generator)
  - [Basic Setup](#basic-setup)
  - [Using the `v-bind` Directive](#using-the-v-bind-directive)
  - [`v-bind` Inline Styles](#v-bind-inline-styles)
  - [Adding Events with `v-on`](#adding-events-with-v-on)
- [Class and Style Bindings ](#class-and-style-bindings-)
  - [Binding to objects](#binding-to-objects)
  - [Binding to Arrays](#binding-to-arrays)
- [Components](#components)
  - [Props](#props)
    - [Array Syntax](#array-syntax)
    - [Object Syntax](#object-syntax)
    - [Prop Validation and Default](#prop-validation-and-default)
  - [Custom Events](#custom-events)
    - [Emitting and Listening to Events](#emitting-and-listening-to-events)
    - [Event Arguments](#event-arguments)
    - [Declaring Emitted Events](#declaring-emitted-events)
    - [Events Validation](#events-validation)
- [Directives](#directives)
  - [Built-in Directives](#built-in-directives)
    - [`v-bind`](#v-bind)
    - [`v-on`](#v-on)
    - [`v-for`](#v-for)
    - [`v-if`](#v-if)
    - [`v-else-if`](#v-else-if)
    - [`v-else`](#v-else)
    - [`v-show`](#v-show)
    - [`v-model`](#v-model)
- [Lifecycle Hooks](#lifecycle-hooks)
  - [Registering Lifecycle Hooks](#registering-lifecycle-hooks)
  - [Lifecycle Diagram](#lifecycle-diagram)
  - [Lifecycle Hooks Reference](#lifecycle-hooks-reference)
- [Building for Production](#building-for-production)
- [Mocking with JSON Server](#mocking-with-json-server)
- [Vue Router](#vue-router)
  - [Overview](#overview-1)
  - [Install Router](#install-router)
  - [Setup `router` with a Working Use Case](#setup-router-with-a-working-use-case)
    - [Overview](#overview-2)
    - [Setup](#setup)
- [References](#references)

# Introduction

## What is Vue.js

Vue is a frontend JavaScript framework for building websites and user interfaces.

Here are some facts about Vue:

- Vue is generally used to create Single-Page Apps (SPAs) that run on the client, but can be used to create Full Stack Applications by making HTTP requests to a backend server. Vue is popular with Node.js and Express (MEVN Stack).

- Vue can also run on the server-side by using a SSR framework like Nuxt.

---

## Why use Vue

- Create dynamic frontend apps and websites.
- Easiest learning curve among the big three frontend frameworks - Angular, React and Vue.
- Easy to integrate with other projects.
- Fast and Lightweight.
- Virtual DOM like React, where it only updates elements that need to be updated rather than refreshing the entire page.
- Extremely Popular (and rising).
- Great Community.

---

## Basic Layout of a Vue Component

Components include a template for Markup, logic including any state/data/methods as well as the styling for that component.

You can also pass `props` into a component.

```md
<!-- Embed the component -->
<Header title="Task Tracker">
```

Example code for the component above:

```md
<!-- Section 1: Template - HTML tags with declarative rendering -->
<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<!-- Section 2: Javascript Logic - Declare Props, data linked to the component, methods -->
<script>
    export default {
        props: {
            title: String
        }
    }
</script>

<!-- Section 3: Scoped style that pertains to the particular component (instead of being global) -->
<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
```

---

## Working with State / Data

Components can have their own state which can determine how a specific component behaves and what data is displayed.

Some state may be local to a specific component and some maybe "global" or "app" level state that needs to be shared with multiple components.

Vuex is a State Manager for global state in larger applications.

---

## Options API vs Composition API

Vue 3 has the Composition API, which aims to address code reusability and readability in Vue 3, especially in larger applications.

The reasons why the Composition API was introduced in Vue 3 are:

1. Improve Readability as components grow.
2. Code reusability patterns in Vue 2 had drawbacks.
3. Limited TypeScript support.

---

# Setup and Installation

We can setup Vue either by using the CDN link or by using the CLI.

## Using the CDN

You can use Vue directly from a CDN via a script tag:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

### Using the Global Build

The above link is loading the global build of Vue, where all top-level APIs are exposed as properties on the global Vue object. Here is a full example using the global build:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        message: 'Hello Vue!',
      };
    },
  }).mount('#app');
</script>
```

---

### Using the ES Module Build

Most modern browsers now support ES modules natively, so we can use Vue from a CDN via native ES modules like this:

```html
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

  createApp({
    data() {
      return {
        message: 'Hello Vue!',
      };
    },
  }).mount('#app');
</script>
```

---

### Enabling Import Maps

In the above example we are importing from the full CDN URL, but we might come across code that may look like this:

```js
import { createApp } from 'vue';
```

We can teach the browser where to locate the vue import by using [Import Maps](https://caniuse.com/import-maps):

```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue';

  createApp({
    data() {
      return {
        message: 'Hello Vue!',
      };
    },
  }).mount('#app');
</script>
```

> **Note:** Import Maps Browser Support
>
> Import maps are supported by default in Chromium-based browsers, so we recommend using Chrome or Edge during the learning process.
>
> If using Firefox, it is only supported in version 102+ and currently needs to be enabled via the dom.importMaps.enabled option in about:config.
>
> If your preferred browser does not support import maps yet, you can polyfill it with [es-module-shims](https://github.com/guybedford/es-module-shims).

---

## Using the CLI

### Overview

Vue CLI is a full system for rapid Vue.js development, providing:

- Interactive project scaffolding via `@vue/cli`.
- A runtime dependency (`@vue/cli-service`) that is:
  - Upgradeable;
  - Built on top of webpack, with sensible defaults;
  - Configurable via in-project config file;
  - Extensible via plugins
- A rich collection of official plugins integrating the best tools in the frontend ecosystem.
- A full graphical user interface to create and manage Vue.js projects.

Vue CLI aims to be the standard tooling baseline for the Vue ecosystem. It ensures the various build tools work smoothly together with sensible defaults so you can focus on writing your app instead of spending days wrangling with configurations. At the same time, it still offers the flexibility to tweak the config of each tool without the need for ejecting. It has it's own GUI Vue Manager for managing Vue projects. It has a Dev Server and easy production build. It also has integrated testing, TypeScript support, ESLint, etc.

---

### [Installation](https://cli.vuejs.org/guide/installation.html)

```s
# using NPM
sudo npm install -g @vue/cli

# using YARN
sudo yarn global add @vue/cli
```

---

### Upgrading

```s
# using NPM
sudo npm update -g @vue/cli

# using YARN
sudo yarn global upgrade --latest @vue/cli
```

---

### GUI

```s
vue ui
```

### Intitialize a Project

Enter the following command and follow the instructions:

```s
vue create [DIRECTORY NAME]
```

---

## Scaffolding using [`create-vue`](https://github.com/vuejs/create-vue)

### Initialization

```s
npm init vue@3
```

![create-vue Setup](https://github.com/vuejs/create-vue/raw/main/media/screenshot-cli.png?raw=true)

### Difference from Vue CLI

- Vue CLI is based on webpack, while **`create-vue`** is based on **[Vite](https://vitejs.dev/)**. Vite supports most of the configured conventions found in Vue CLI projects out of the box, and provides a significantly better development experience due to its extremely fast startup and hot-module replacement speed. Learn more about why we recommend Vite over webpack [here](https://vitejs.dev/guide/why.html).

- Unlike Vue CLI, **`create-vue`** itself is just a scaffolding tool: it creates a pre-configured project base on the features you choose, and delegates the rest to Vite. Projects scaffolded this way can directly leverage the [Vite plugin ecosystem](https://vitejs.dev/plugins/) which is Rollup-compatible.

---

# Project 1 - Random User Generator

## Basic Setup

Use a Directory setup that looks like:

```s
├── random-user-gen
│   ├── app.js
│   ├── index.html
│   └── style.css
└── README.md
```

Our `index.html` will look,

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Random User Generator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <!-- In a single page application built with a JS-framework, this is the standard setup 
    - A Single DIV that holds all the JavaScript code -->
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

The `app.js` looks like,

```js
const app = Vue.createApp({
  template: '<h1>Hello {{ firstName }} {{ lastName }}.</h1>',
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
    };
  },
});

app.mount('#app');
```

---

Where,

- Vue must be invoked with `app = Vue.createApp({ ...obj })` and an object containing the `template` and `data` are passed.
  - `template` is the HTML string containing the data. Double curly braces are used to dynamically render data.
  - `data` is a function that returns an object.
- The Vue application is mounted to the HTML to the div id of `app` using the `.mount('#id')` method.

Now, instead of passing the template, we can simply modify the HTML inside the `div#app` directly instead of using a template and use any data we want to render, the same way we did in the `template`.

While we are at it, let us introduce another concept: [`v-bind`](#v-bind).

## Using the `v-bind` Directive

The `v-bind` directive is a Vue.js directive used to bind one or more attributes, or a component prop to an element. For example: Image `src` and `alt` attributes as seen below. If that attribute is binded to our data defined in Vuejs instance then dynamically changes can be observed as data changes.

Syntax for `v-bind`:

```s
v-bind:attribute="expression";

# Using shortcut
:attribute="expression"
```

Our **`app.js`** looks like:

```js
const app = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      gender: 'Male',
      photo: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
});

app.mount('#app');
```

We also have declared a `male` and a `female` CSS class that changes the `background-color`, `border-color` and `color` attributes. We can bind this to the class attribute of the `img` element and the `button` element.

Hence, we can write our HTML with the **`v-bind`** directive (using shortcut syntax) in the Image tag as:

In `index.html`,

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Random User Generator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <!-- In a single page application built with a JS-framework, this is the standard setup 
    - A Single DIV that holds all the JavaScript code -->
      <img :src="photo" :class="gender" :alt="`${firstName} ${lastName}`" />
      <h1>{{ firstName }} {{ lastName }}</h1>
      <h3>{{ email }}</h3>
      <button :class="gender">Get Random User</button>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

---

## `v-bind` Inline Styles

Let's change the button's `background-color` style property based on props. To do so, we must **`v-bind`** the style attribute and modify the `background-color` property.

```s
# Using Template Literal to use CSS default properties
:style="`background-color: ${color}`"

# Using JavaScript style properties
:style="{ backgroundColor: color }"
```

In action,

```html
<!-- Using Using Template Literal to use CSS default properties -->
<template>
  <button
    class="btn"
    :style="`background-color: ${color}`"
    v-on:click="onClickHandler"
  >
    {{ name }}
  </button>
</template>

<!-- Using JavaScript style properties -->
<template>
  <button
    class="btn"
    :style="{ backgroundColor: color}"
    v-on:click="onClickHandler"
  >
    {{ name }}
  </button>
</template>
```

---

## Adding Events with [`v-on`](#v-on)

We would like the **`Get Random User`** Button to return us a new random user having randomly generated data. This requires the button to trigger an onClick event. So how do we do this in Vue.js?

We can use use the **`v-on`** directive by following the syntax:

```s
v-on:event="method()"

# Using shorthand
@event="method()"
```

Additionally we need to declare the method under `methods` in our script.

In `app.js`, we can declare methods as follows:

```js
const app = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      gender: 'male',
      photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    };
  },
  methods: {
    async getUser() {
      const res = await fetch('https://randomuser.me/api');
      const { results } = await res.json();

      if (results.length) {
        // Access any data using the 'this' keyword.
        this.firstName = results[0].name.first;
        this.lastName = results[0].name.last;
        this.email = results[0].email;
        this.gender = results[0].gender;
        this.photo = results[0].picture.large;
      }
    },
  },
});

app.mount('#app');
```

In `index.html`,

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Random User Generator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <!-- In a single page application built with a JS-framework, this is the standard setup 
    - A Single DIV that holds all the JavaScript code -->
      <img :class="gender" :src="photo" :alt="`${firstName} ${lastName}`" />
      <h1>{{ firstName }} {{ lastName }}</h1>
      <h3>{{ email }}</h3>
      <button @click="getUser()" :class="gender">Get Random User</button>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

Now our app should be behaving as expected. On clicking the **`Get Random User`**, we get a new user from the `https://randomuser.me/api` API and populate the data accordingly.

---

# [Class and Style Bindings ](https://vuejs.org/guide/essentials/class-and-style.html)

A common need for data binding is manipulating an element's class list and inline styles. Since **`class`** and **`style`** are both attributes, we can use **`v-bind`** to assign them a string value dynamically, much like with other attributes. However, trying to generate those values using string concatenation can be annoying and error-prone. For this reason, Vue provides special enhancements when **`v-bind`** is used with **`class`** and **`style`**. In addition to strings, the expressions can also evaluate to objects or arrays.

## Binding to objects

We can pass an object to :class (short for v-bind:class) to dynamically toggle classes. This syntax means the presence of the `active` class will be determined by the truthiness of the data property `isActive`.

```html
<div :class="{ active: isActive }"></div>
```

You can have multiple classes toggled by having more fields in the object. In addition, the :class directive can also co-exist with the plain class attribute.

So given the following state:

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

And the following template:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Renders:

```html
<div class="static active"></div>
```

When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes `true`, the class list will become **`"static active text-danger"`**.

---

## Binding to Arrays

We can bind `:class` to an array to apply a list of classes:

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

```html
<div :class="[activeClass, errorClass]"></div>
```

Which will render:

```html
<div class="active text-danger"></div>
```

If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

```html
<div :class="[isActive ? activeClass : '', errorClass, 'static']"></div>
```

This will always apply `errorClass`, but `activeClass` will only be applied when `isActive` is truthy. `'static'` is a mandatory class that is added.

However, this can be a bit verbose if you have multiple conditional classes. That's why it's also possible to use the object syntax inside array syntax:

```html
<div :class="[{ active: isActive }, errorClass, 'static']"></div>
```

---

# Components

## Props

Vue components require explicit props declaration so that Vue knows what external props passed to the component should be treated as fallthrough attributes (which will be discussed in its dedicated section).

Props are declared using the **`props`** option. There are two ways of setting **`props`**.

### Array Syntax

Pass an array of strings which are names of props.

```html
<script>
  export default {
    props: ['title', 'likes'],
  };
</script>
```

### Object Syntax

For each property in the object declaration syntax, the **`key`** is the **name** of the prop, while the **`value`** should be the **constructor function** of the expected type.

This not only documents your component, but will also warn other developers using your component in the browser console if they pass the wrong type. We will discuss more details about prop validation further down this page.

```html
<script>
  export default {
    props: {
      title: String,
      likes: Number,
    },
  };
</script>
```

### Prop Validation and Default

Components can specify requirements for their props, such as the types you've already seen. If a requirement is not met, Vue will warn you in the browser's JavaScript console. This is especially useful when developing a component that is intended to be used by others.

To specify prop validations, you can provide an object with validation requirements to the **`props`** option, instead of an array of strings. For example:

```html
<script>
  export default {
    props: {
      // Basic type check
      //  (`null` and `undefined` values will allow any type)
      likes: Number,
      // Required string
      id: {
        type: String,
        required: true,
      },
      // String with a default value
      placeholder: {
        type: String,
        default: 'Hello World',
      },
      // Custom validator function
      code: {
        validator(value) {
          // The Value must match one of the strings
          return ['success', 'warning', 'error'].includes(value);
        },
      },
    },
  };
</script>
```

---

## Custom Events

### Emitting and Listening to Events

A component can emit custom events directly in template expressions (e.g. in a **`v-on`** handler) using the built-in **`$emit`** method:

```html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

The **`$emit()`** method is also available on the component instance as **`this.$emit()`**:

```js
export default {
  methods: {
    submit() {
      this.$emit('submit');
    },
  },
};
```

The parent can then listen to it using **`v-on`**:

```vue
<MyComponent @submit="callback" />
```

The **`.once`** modifier is also supported on component event listeners:

```vue
<MyComponent @some-event.once="callback" />
```

---

### Event Arguments

It's sometimes useful to emit a specific value with an event. For example, we may want the **`<BlogPost>`** component to be in charge of how much to enlarge the text by. In those cases, we can pass extra arguments to **`$emit`** to provide this value:

```html
<button @click="$emit('increaseBy', 1)">Increase by 1</button>
```

Then, when we listen to the event in the parent, we can use an inline arrow function as the listener, which allows us to access the event argument:

```html
<MyButton @increase-by="n => (count += n)" />
```

Or, if the event handler is a method:

```vue
<MyButton @increase-by="increaseCount" />
```

Then the value will be passed as the first parameter of that method:

```js
export default {
  methods: {
    increaseCount(n) {
      this.count += n;
    },
  },
};
```

> **Note:** All extra arguments passed to **`$emit()`** after the event name will be forwarded to the listener. For example, with **`$emit('foo', 1, 2, 3)`** the listener function will receive three arguments.

---

### Declaring Emitted Events

Emitted events can be explicitly declared on the component via the **`emits`** option:

```js
export default {
  emits: ['inFocus', 'submit'],
};
```

The **`emits`** option also supports an object syntax, which allows us to perform runtime validation of the payload of the emitted events:

```js
export default {
  emits: {
    submit(payload) {
      // return `true` or `false` to indicate
      // validation pass / fail
    },
  },
};
```

---

### Events Validation

Similar to prop type validation, an emitted event can be validated if it is defined with the object syntax instead of the array syntax.

To add validation, the event is assigned a function that receives the arguments passed to the **`this.$emit`** call and returns a boolean to indicate whether the event is valid or not.

```js
export default {
  emits: {
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
      if (email && password) {
        return true;
      } else {
        console.warn('Invalid submit event payload!');
        return false;
      }
    },
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password });
    },
  },
};
```

---

# Directives

## [Built-in Directives](https://vuejs.org/api/built-in-directives.html)

### `v-bind`

Dynamically bind one or more attributes, or a component prop to an expression.

- **Shorthand**: **`:`** or **`.`** (when using **`.prop`** modifier)

- **Modifiers**:

  - **`.camel`** - transform the kebab-case attribute name into camelCase.
  - **`.prop`** - force a binding to be set as a DOM property. 3.2+
  - **`.attr`** - force a binding to be set as a DOM attribute. 3.2+

When used to bind the **`class`** or **`style`** attribute, **`v-bind`** supports additional value types such as Array or Objects. See linked guide section below for more details.

**Example:**

```html
<!-- bind an attribute -->
<img v-bind:src="imageSrc" />

<!-- dynamic attribute name -->
<button v-bind:[key]="value"></button>

<!-- shorthand -->
<img :src="imageSrc" />

<!-- shorthand dynamic attribute name -->
<button :[key]="value"></button>

<!-- with inline string concatenation -->
<img :src="'/path/to/images/' + fileName" />

<!-- class binding -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style binding -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- binding an object of attributes -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop binding. "prop" must be declared in the child component. -->
<MyComponent :prop="someThing" />

<!-- pass down parent props in common with a child component -->
<MyComponent v-bind="$props" />

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

The **`.prop`** modifier also has a dedicated shorthand, **`.`**:

```html
<div :someProperty.prop="someObject"></div>

<!-- equivalent to -->
<div .someProperty="someObject"></div>
```

---

### `v-on`

Attach an event listener to the element.

- **Shorthand**: **`@`**

- **Expects**: **`Function`** | **`Inline Statement`** | **`Object (without argument)`**

- **Argument**: **`event`** (optional if using Object syntax)

- **Modifiers**:

  - **`.stop`** - call event.stopPropagation().
  - **`.prevent`** - call event.preventDefault().
  - **`.capture`** - add event listener in capture mode.
  - **`.self`** - only trigger handler if event was dispatched from this element.
  - **`.{keyAlias}`** - only trigger handler on certain keys.
  - **`.once`** - trigger handler at most once.
  - **`.left`** - only trigger handler for left button mouse events.
  - **`.right`** - only trigger handler for right button mouse events.
  - **`.middle`** - only trigger handler for middle button mouse events.
  - **`.passive`** - attaches a DOM event with `{ passive: true }`.

**Examples:**

```html
<!-- method handler -->
<button v-on:click="doThis"></button>

<!-- dynamic event -->
<button v-on:[event]="doThis"></button>

<!-- inline statement -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- shorthand -->
<button @click="doThis"></button>

<!-- shorthand dynamic event -->
<button @[event]="doThis"></button>

<!-- stop propagation -->
<button @click.stop="doThis"></button>

<!-- prevent default -->
<button @click.prevent="doThis"></button>

<!-- prevent default without expression -->
<form @submit.prevent></form>

<!-- chain modifiers -->
<button @click.stop.prevent="doThis"></button>

<!-- key modifier using keyAlias -->
<input @keyup.enter="onEnter" />

<!-- the click event will be triggered at most once -->
<button v-on:click.once="doThis"></button>

<!-- object syntax -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

Listening to custom events on a child component (the handler is called when "my-event" is emitted on the child):

```vue
<MyComponent @my-event="handleThis" />

<!-- inline statement -->
<MyComponent @my-event="handleThis(123, $event)" />
```

---

### `v-for`

Render the element or template block multiple times based on the source data.

- Expects: **`Array`** | **`Object`** | **`number`** | **`string`** | **`Iterable`**

- The directive's value must use the special syntax **`alias in expression`** to provide an alias for the current element being iterated on:

  ```html
  <div v-for="item in items">{{ item.text }}</div>
  ```

  Alternatively, you can also specify an alias for the index (or the key if used on an Object):

  ```html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

- The default behavior of **`v-for`** will try to patch the elements in-place without moving them. To force it to reorder elements, you should provide an ordering hint with the **`key`** special attribute:

  ```html
  <div v-for="item in items" :key="item.id">{{ item.text }}</div>
  ```

- **`v-for`** can also work on values that implement the [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), including native Map and Set.

---

### `v-if`

Conditionally render an element or a template fragment based on the truthy-ness of the expression value.

**Example:**

```html
<template>
  <div class="container">
    <div v-if="showAddTaskForm">
      <form class="add-task"><!-- Form Elements --></form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        showAddTaskForm: false,
      };
    },
  };
</script>
```

---

### `v-else-if`

Denote the "else if block" for **`v-if`**. Can be chained.

- Restriction: previous sibling element must have **`v-if`** or **`v-else-if`**.
- Can be used on **`<template>`** to denote a conditional block containing only text or multiple elements.

**Example:**

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

---

### `v-else`

Denote the "else block" for **`v-if`** or a **`v-if`** / **`v-else-if`** chain.

- Restriction: previous sibling element must have **`v-if`** or **`v-else-if`**.
- Can be used on **`<template>`** to denote a conditional block containing only text or multiple elements.

**Example:**

```html
<div v-if="Math.random() > 0.5">Now you see me</div>
<div v-else>Now you don't</div>
```

---

### `v-show`

Toggle the element's visibility based on the truthy-ness of the expression value.

**`v-show`** works by setting the `display` CSS property via inline styles, and will try to respect the initial `display` value when the element is visible. It also triggers transitions when its condition changes.

```html
<template>
  <div class="container">
    <form v-show="showAddTaskForm" class="add-task">
      <!-- Form Elements -->
    </form>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        showAddTaskForm: false,
      };
    },
  };
</script>
```

---

### `v-model`

Create a two-way binding on a form input element or a component.

- **Limited to**:

  - `<input>`
  - `<select>`
  - `<textarea>`
  - components

- **Modifiers**:

  - **`.lazy`** - listen to `change` events instead of `input`
  - **`.number`** - cast valid input string to numbers
  - **`.trim`** - trim input

**Example:**

In **`AddTaskForm.vue`**,

```html
<template>
  <form class="add-form" @submit="onSubmit">
    <div class="form-control">
      <label>Add Task</label>
      <input type="text" name="text" placeholder="Add Task" v-model="text" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        name="day"
        placeholder="Add Day & Time"
        v-model="day"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" name="reminder" v-model="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
  export default {
    name: 'AddTaskForm',
    props: {},
    data() {
      return {
        text: '',
        day: '',
        reminder: false,
      };
    },
    methods: {
      onSubmit(e) {
        // Prevent default form submission behaviour
        e.preventDefault();

        if (!this.text) {
          alert('Please add a Task');
          return;
        }
        const newTask = {
          // id: Math.floor(Math.random() * 100000), // json-server automatically adds id
          text: this.text,
          day: this.day,
          reminder: this.reminder,
        };
        // Push (emit) task one level up
        this.$emit('add-task', newTask);

        // Reset after form submission
        this.text = '';
        this.day = '';
        this.reminder = false;
      },
    },
  };
</script>
```

---

# Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.

## Registering Lifecycle Hooks

For example, the **`mounted`** hook can be used to run code after the component has finished the initial rendering and created the DOM nodes:

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`);
  },
};
```

There are also other hooks which will be called at different stages of the instance's lifecycle, with the most commonly used being **`mounted`**, **`updated`**, and **`unmounted`**.

All lifecycle hooks are called with their **`this`** context pointing to the current active instance invoking it. Note this means you should avoid using arrow functions when declaring lifecycle hooks, as you won't be able to access the component instance via **`this`** if you do so.

---

## Lifecycle Diagram

Below is a diagram for the instance lifecycle. You don't need to fully understand everything going on right now, but as you learn and build more, it will be a useful reference.

![Lifecycle Diagram](https://vuejs.org/assets/lifecycle.16e4c08e.png)

---

## [Lifecycle Hooks Reference](https://vuejs.org/api/options-lifecycle.html)

<!--prettier-ignore-->
| Hook            | About                                                                           |
| --------------- | ------------------------------------------------------------------------------- |
| `beforeCreate`  | Called when the instance is initialized.                                        |
| `created`       | Called after the instance has finished processing all state-related options.    |
| `beforeMount`   | Called right before the component is to be mounted.                             |
| `mounted`       | Called after the component has been mounted.                                    |
| `beforeUpdate`  | Called right before the component is about to update its DOM tree due to a reactive state change. |
| `updated`       | Called after the component has updated its DOM tree due to a reactive state change. |
| `beforeUnmount` | Called right before a component instance is to be unmounted.                    |
| `unmounted`     | Called after the component has been unmounted.                                  |
| `errorCaptured` | Called when an error propagating from a descendent component has been captured. |
| `activated`     | Called after the component instance is inserted into the DOM as part of a tree cached by `<KeepAlive>`. **This hook is not called during server-side rendering.** |
| `deactivated`   | Called after the component instance is removed from the DOM as part of a tree cached by `<KeepAlive>`. **This hook is not called during server-side rendering.** |
| `serverPrefetch` | Async function to be resolved before the component instance is to be rendered on the server. **(SSR only)** |

---

# Building for Production

In the terminal, run,

```s
# Using NPM
npm run build

# Using YARN
yarn build
```

The default output is to a `dist` folder that looks like:

```s
├── css
│   └── app.e69c72d2.css
├── favicon.ico
├── index.html
└── js
    ├── app.8c8e09af.js
    ├── app.8c8e09af.js.map
    ├── chunk-vendors.5c5f555d.js
    └── chunk-vendors.5c5f555d.js.map
```

We can deploy this Single Page Application (SPA) to Netlify or Vercel or standalone on a Linux server.

We can test the deployment locally, by using **`serve`**.

```s
# Ensure serve is installed
sudo npm i -g serve

# Serve the dist folder
serve -s [PATH to dist folder]
```

---

# Mocking with JSON Server

[JSON Server](https://www.npmjs.com/package/json-server) allows a full fake REST API with zero coding.

This will allow us to mock a call to a database and perform CRUD operations. It uses a `db.json` file which acts like a database where we can perform CRUD operations by making calls to the localhost endpoint.

1. **Installation:**

   ```s
   sudo npm i -g json-server
   ```

2. **Adding a script to `package.json` and launching the JSON Server**

   **Add script to `package.json`:**

   ```s
   {
       "scripts": {
           "jsonserver": "json-server --watch db.json --port 5000"
       }
   }
   ```

   **Launch the JSON Server using:**

   ```s
   # Using NPM
   npm run jsonserver

   #Using YARN
   yarn jsonserver
   ```

3. **Create a Mock Database - `db.json`**

   In `db.json`, add the following:

   ```json
   {
     "tasks": [
       {
         "id": 1,
         "text": "Doctor's appointment",
         "day": "March 1st at 2:30pm",
         "reminder": true
       },
       {
         "id": 2,
         "text": "Meeting at School",
         "day": "March 3rd at 1:30pm",
         "reminder": true
       },
       {
         "id": 3,
         "text": "Food Shopping",
         "day": "March 3rd at 11:00 am",
         "reminder": false
       },
       {
         "text": "Go to the Gym",
         "day": "Oct 1 at 8:30am",
         "reminder": true,
         "id": 4
       }
     ]
   }
   ```

   > **Note:**
   >
   > - Calls to `http://localhost:5000/tasks` will return the tasks array.
   > - Calls to `http://localhost:5000/tasks/{id}` will return the particular task.

4. **Updating `vue.config.js` to use [`devServer.proxy`](https://cli.vuejs.org/config/#devserver-proxy)**

   We would like to avoid using `http://localhost:5000` before all our API endpoints and simply have a `api/tasks` or an `api/tasks/${id}`. This needs to be configured by adding a proxy to the devServer property in `vue.config.js`:

   In `vue.config.js`,

   ```cjs
   const { defineConfig } = require('@vue/cli-service');
   module.exports = defineConfig({
     transpileDependencies: true,
     lintOnSave: true,
     devServer: {
       proxy: {
         '^/api': {
           target: 'http://localhost:5000',
           changeOrigin: true,
           logLevel: 'debug',
           pathRewrite: { '^/api': '/' },
         },
       },
     },
   });
   ```

5. **Update the `methods` in `App.vue` to make CRUD operations**

   ```js
   export default {
     name: 'App',
     components: {
       Header,
       Tasks,
       AddTaskForm,
     },
     data() {
       return {
         tasks: [],
         showAddTaskForm: false,
       };
     },
     methods: {
       /** Show Task Form when `Add Task` button is clicked */
       toggleAddTaskForm() {
         this.showAddTaskForm = !this.showAddTaskForm;
       },
       /** Add a Task */
       async addTask(task) {
         const response = await fetch('api/tasks', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(task),
         });
         const data = await response.json();

         this.tasks = this.tasks.concat(data);
       },
       /** Delete a Task */
       async deleteTask(id) {
         if (
           confirm(
             `Delete task "${this.tasks.find(task => task.id === id).text}"?`
           )
         ) {
           const response = await fetch(`api/tasks/${id}`, {
             method: 'DELETE',
           });
           if (response.status === 200) {
             this.tasks = this.tasks.filter(task => task.id !== id);
           } else alert('Error Deleting Task!');
         }
       },
       /** Toggle Task reminder on/off */
       async toggleReminder(id) {
         /** Fetch and Modify Task to Update */
         const task = await this.fetchTask(id);
         const updatedTask = Object.assign(task, { reminder: !task.reminder });

         /** Update Database with Task Object */
         const response = await fetch(`api/tasks/${id}`, {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(updatedTask),
         });

         /** Get back data */
         const data = await response.json();

         /** Update UI */
         if (response.status === 200) {
           this.tasks = this.tasks.map(task =>
             task.id === id
               ? Object.assign(task, { reminder: data.reminder })
               : task
           );
         }
       },
       /** GET all Tasks */
       async fetchTasks() {
         const response = await fetch('api/tasks');
         const data = response.json();
         return data;
       },
       /** GET Task by ID */
       async fetchTask(id) {
         const response = await fetch(`api/tasks/${id}`);
         const data = response.json();
         return data;
       },
     },
   };
   ```

---

# Vue Router

## Overview

**[Vue Router](https://router.vuejs.org)** is the official router for **Vue.js**. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze. Features include:

- Nested routes mapping
- Dynamic Routing
- Modular, component-based router configuration
- Route params, query, wildcards
- View transition effects powered by Vue.js' transition system
- Fine-grained navigation control
- Links with automatic active CSS classes
- HTML5 history mode or hash mode
- Customizable Scroll Behavior
- Proper encoding for URLs

---

## Install Router

Vue Router can be installed directly while using the CLI to scaffold the application. However if missed, it can be installed by running the following command:

```s
# Using NPM
npm i vue-router@next

# Using YARN
yarn add vue-router@next
```

---

## Setup `router` with a Working Use Case

### Overview

We want to setup a Router that does the following:

- Setup the main application on the home page (`'/'`)
- Have an `'/about'` that opens an About page.
- A Footer that remains on all pages will also carry this link to the Home and About page.
- The Button in the Header only shows for the Home Page.

---

### Setup

1.  Inside the `src` folder, create a `router` folder. If you chose the `Router` option during the Vue Installation via CLI, then this would have been automatically created for you.

2.  Create an `index.js` file inside the `router` folder.

3.  Create a `Footer.vue` component inside the `components` folder.
    `router-link` is used to create a link. It has a `to` attribute that takes in the relative link.

    ```html
    <template>
      <footer>
        <p>Copyright &copy; 2021</p>
        <div class="links">
          <router-link to="/" title="Home">Home</router-link>
          <router-link to="/about" title="About">About</router-link>
        </div>
      </footer>
    </template>

    <script>
      export default {
        name: 'Footer',
      };
    </script>

    <style scoped>
      a {
        color: #333;
      }

      .links {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
      }

      footer {
        margin-top: 30px;
        text-align: center;
      }
    </style>
    ```

4.  Create a `views` folder. Create an `About.vue` file inside the `views` folder.

    ```html
    <template>
      <h1>About</h1>
    </template>

    <script>
      export default {
        name: 'About',
      };
    </script>
    ```

5.  In the `router/index.js` file,

    ```js
    import { createRouter, createWebHistory } from 'vue-router';
    import About from '../views/About';

    const routes = [
      {
        path: '/about',
        name: 'About',
        component: About,
      },
    ];

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });

    export default router;
    ```

6.  Configure the `main.js` to use the `router`.

    ```js
    import { createApp } from 'vue';

    import App from './App.vue';
    import router from './router';

    createApp(App).use(router).mount('#app');
    ```

    This still doesn't make the Router work correctly when we visit `http://localhost:8080/about` because the `App.vue` still has to be configured to set the `views/About.vue`.

7.  Add the `view` to `App.vue`.

    In App.vue,

    ```html
    <template>
      <div class="container">
        <header
          title="Task Tracker"
          :showAddTaskForm="showAddTaskForm"
          @toggle-add-task="toggleAddTaskForm()"
        />
        <router-view></router-view>
        <footer />
      </div>
    </template>
    ```

8.  Separate the Home page contents to its own `view`.

    We will shift the code that renders the current homepage from the `App.view` file to it's own `views/Home.vue` file.

    **In `Home.vue`**,

    ```html
    <template>
      <AddTaskForm v-show="showAddTaskForm" @add-task="addTask" />
      <Tasks
        :tasks="tasks"
        @delete-task="deleteTask"
        @toggle-reminder="toggleReminder"
      />
    </template>

    <script>
      import Tasks from '../components/Tasks';
      import AddTaskForm from '../components/AddTaskForm';

      export default {
        name: 'Home',
        components: {
          Tasks,
          AddTaskForm,
        },
        data() {
          return {
            tasks: [],
          };
        },
        methods: {
          /** Add a Task */
          async addTask(task) {
            const response = await fetch('api/tasks', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(task),
            });
            const data = await response.json();

            this.tasks = this.tasks.concat(data);
          },
          /** Delete a Task */
          async deleteTask(id) {
            if (
              confirm(
                `Delete task "${this.tasks.find(task => task.id === id).text}"?`
              )
            ) {
              const response = await fetch(`api/tasks/${id}`, {
                method: 'DELETE',
              });
              if (response.status === 200) {
                this.tasks = this.tasks.filter(task => task.id !== id);
              } else alert('Error Deleting Task!');
            }
          },
          /** Toggle Task reminder on/off */
          async toggleReminder(id) {
            /** Fetch and Modify Task to Update */
            const task = await this.fetchTask(id);
            const updatedTask = Object.assign(task, {
              reminder: !task.reminder,
            });

            /** Update Database with Task Object */
            const response = await fetch(`api/tasks/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTask),
            });

            /** Get back data */
            const data = await response.json();

            /** Update UI */
            if (response.status === 200) {
              this.tasks = this.tasks.map(task =>
                task.id === id
                  ? Object.assign(task, { reminder: data.reminder })
                  : task
              );
            }
          },
          /** GET all Tasks */
          async fetchTasks() {
            const response = await fetch('api/tasks');
            const data = response.json();
            return data;
          },
          /** GET Task by ID */
          async fetchTask(id) {
            const response = await fetch(`api/tasks/${id}`);
            const data = response.json();
            return data;
          },
        },
        async created() {
          this.tasks = await this.fetchTasks();
        },
      };
    </script>
    ```

    **Modified `App.vue`:**

    ```html
    <template>
      <div class="container">
        <header
          title="Task Tracker"
          :showAddTaskForm="showAddTaskForm"
          @toggle-add-task="toggleAddTaskForm()"
        />
        <router-view></router-view>
        <footer />
      </div>
    </template>

    <script>
      import Header from './components/Header';
      import Footer from './components/Footer';

      export default {
        name: 'App',
        components: {
          Header,
          Footer,
        },
        data() {
          return {
            showAddTaskForm: false,
          };
        },
        methods: {
          /** Show Task Form when `Add Task` button is clicked */
          toggleAddTaskForm() {
            this.showAddTaskForm = !this.showAddTaskForm;
          },
        },
      };
    </script>
    ```

9.  Fix the `showAddTaskForm` event Listener on the Button

    Our app still doesn't work correctly. The Button doesn't seem to open up the form. This is because the `Home.vue` template calls the Vue Directive `v-show="showAddTaskForm"` which we cannot access in `Home.vue`. To fix this,

    **In`App.vue`**, we will pass props to the `router-view` element.

    ```html
    <template>
      <div class="container">
        <header
          title="Task Tracker"
          :showAddTaskForm="showAddTaskForm"
          @toggle-add-task="toggleAddTaskForm()"
        />
        <router-view :showAddTaskForm="showAddTaskForm"></router-view>
        <footer />
      </div>
    </template>
    ```

    **In `views/Home.vue`**, we will accept the same props,

    ```js
    export default {
      name: 'Home',
      props: {
        showAddTaskForm: Boolean,
      },
      // other properties
    };
    ```

10. Limit the `Add Task` button to only the Home Page using `computed` Property in `Header.vue`

    - We will use the `computed` property to find if the route is the homepage. If yes, then we will return true, else false. We will set this to a function `homePage`.
    - In the template, we will use the `v-show` directive to show if `homePage` returns true.

    **In `Header.vue`**,

    ```html
    <template>
      <header>
        <h1>{{ title }}</h1>
        <button
          v-show="homePage"
          :name="showAddTaskForm ? 'Close' : 'Add Task'"
          :color="showAddTaskForm ? 'darkred' : 'green'"
          @onClick="$emit('toggle-add-task')"
        />
      </header>
    </template>

    <script>
      import Button from './Button';

      export default {
        name: 'Header',
        props: {
          title: String,
          showAddTaskForm: {
            type: Boolean,
          },
        },
        components: {
          Button,
        },
        computed: {
          homePage() {
            if (this.$route.path === '/') {
              return true;
            } else return false;
          },
        },
      };
    </script>
    ```

**This successfully sets up Vue Router and our Application is working successfully!**

---

# References

- [Style Guide](https://vuejs.org/style-guide/)
