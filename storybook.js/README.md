# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Storybook?](#what-is-storybook)
- [Why use Storybook?](#why-use-storybook)
- [Installation](#installation)
- [Configuration](#configuration)
    - [Default Setup](#default-setup)
    - [Customized Setup](#customized-setup)
- [Component Story Format (CSF)](#component-story-format-csf)
- [Theming with Storybook](#theming-with-storybook)
  - [Addon Setup](#addon-setup)
- [Testing React Components with Storybook and Jest](#testing-react-components-with-storybook-and-jest)
  - [The Problem](#the-problem)
  - [The Solution](#the-solution)
  - [Installation](#installation-1)
  - [Story Setup](#story-setup)
  - [Global Config](#global-config)
  - [Installing devDependencies](#installing-devdependencies)
  - [Writing Tests](#writing-tests)
  - [Using `composeStories`](#using-composestories)
  - [Batch Testing all Stories from a File](#batch-testing-all-stories-from-a-file)
- [References](#references)

---

# What is Storybook?

Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

---

# Why use Storybook?

As a UI Component library is built, there is a need to preview the components in a browser as they are being built. One way to do that is to create a react application and install the component library locally on the machine. However, the drawback is that the application has to be maintained on its own and any changes to the component library will require a rebuild of the application.

Enter Storybook.js.

---

# Installation

```s
npx storybook init
```

# [Configuration](https://storybook.js.org/docs/react/configure/overview)

### Default Setup

When Storybook is installed, a `.storybook` directory is created in the root of the project. This directory contains a `main.js` file and a `preview.js` file. The defaults are as follows:-

**main.js**

```js
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
};
```

**preview.js**

```js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
};
```

### Customized Setup

We can modify the default setup by modifying the `main.js` file.

    ```js
    /* eslint-disable no-param-reassign */
    const path = require('path');
    const { argv } = require('yargs');
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').default;

    const storiesPath = !argv._[0]
    ? path.resolve(__dirname, '../src/**/*.story.@(ts|tsx)').replace(/\\/g, '/')
    : path
        .resolve(
            __dirname,
            `../src/ursa-${argv._[0].replace('@ursa/', '')}/**/*.story.@(js|jsx|ts|tsx)`
        )
        .replace(/\\/g, '/');

    module.exports = {
        stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)", storiesPath],
        addons: [
            'storybook-addon-turbo-build',
            '@storybook/addon-a11y',
            "@storybook/addon-links",
            "@storybook/addon-essentials",
            "@storybook/addon-interactions"
        ],
        webpackFinal: async (config) => {
            config.resolve = {
            ...config.resolve,
            plugins: [
                ...(config.resolve.plugins || []),
                new TsconfigPathsPlugin({
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
                configFile: path.join(__dirname, '../tsconfig.json'),
                }),
            ],
            };

            // Turn off docgen plugin as it breaks bundle with displayName
            config.plugins.pop();

            return config;
        },
    }
    ```

**Where**,

- `stories` - an array of globs that indicates the location of your story files, relative to main.js.
- `addons` - a list of the addons you are using.
- `webpackFinal` - custom webpack configuration.
- `babel` - custom babel configuration.
- `framework` - framework specific configurations to help the loading and building process.
- `features` - An object containing [feature flags](https://storybook.js.org/docs/react/configure/overview#feature-flags).

---

# Component Story Format (CSF)

Storybook is based on one core construct: **the story**. Everyone that uses Storybook writes stories for their component examples. Component Story Format is an expressive, platform-agnostic format that's used across the industry from Netflix to Shopify and beyond. CSF is platform-agnostic, it's now supported by incredible projects across the ecosystem like **RedwoodJS**, **React Styleguidist**, and **UXPin**.

- Storybook 5.2 introduced the **[Component Story Format (CSF)](https://storybook.js.org/blog/component-story-format/)**
- Storybook 6.4 released the **[Component Story Format (CSF) 3.0](https://storybook.js.org/blog/component-story-format-3-0/)**

---

# Theming with Storybook

Ideally, you would like to be able to view how a component looks in different colour themes while storybook is running, without needing to change the theme manually and rebuilding.

**For example:** You want to see how a Modal component looks in Dark Mode and Light Mode. The storybook canvas' background also needs synchronize with this. The ideal solution would be a plugin that allows theme toggling at a click and auto updates the component's props and styling and storybook's background.

Fortunately, we have a plugin, **`@react-theming/storybook-addon`** that does the job.

## Addon Setup

Theming can be setup with various libraries or custom. Emotion.js and Styled Components are examples of CSS-in-JS libraries that provide theming options.

1. We will first install **`@react-theming/storybook-addon`** as a `devDependency`.

   ```s
   # Using NPM
   npm i -D @react-theming/storybook-addon

   # Using YARN
   yarn add -D @react-theming/storybook-addon
   ```

2. We add the addon the **`.storybook/main.js`** file.

   ```js
   module.exports = {
     // other options
     addons: [...otherAddons, '@react-theming/storybook-addon'],
   };
   ```

3. Update the **`.storybook/preview.js`** to have global decorators by adding the **`addDecorator`** property as follows:

   ```js
   import { ThemeProvider } from 'path/to/ThemeProvider';
   import { addDecorator } from '@storybook/react';
   import { withThemes } from '@react-theming/storybook-addon';

   // Make sure the lightTheme and darkTheme have a property, name: 'light' and name: 'dark', respectively.
   import { lightTheme, darkTheme } from 'path/to/styles/themes';

   export const parameters = {
     actions: { argTypesRegex: '^on[A-Z].*' },
     controls: {
       matchers: {
         color: /(background|color)$/i,
         date: /Date$/,
       },
     },
     addDecorators: addDecorator(
       withThemes(ThemeProvider, [lightTheme, darkTheme])
     ),
   };
   ```

   > **Note:** This addon has ability to auto change background color when it detect a dark theme. By default it checks if the theme name contains 'dark'.

---

# Testing React Components with Storybook and Jest

## The Problem

You are using Storybook for your components and writing tests for them with **[Jest](https://www.npmjs.com/package/jest)**, most likely alongside **Enzyme** or **[React Testing Library (@testing-library/react)](https://www.npmjs.com/package/@testing-library/react)**. In your Storybook stories, you already defined the scenarios of your components. You also set up the necessary decorators (theming, routing, state management, etc.) to make them all render correctly. When you're writing tests, you also end up defining scenarios of your components, as well as setting up the necessary decorators. By doing the same thing twice, you feel like you're spending too much effort, making writing and maintaining stories/tests become less like fun and more like a burden.

## The Solution

**[@storybook/testing-react](https://www.npmjs.com/package/@testing-library/react)** is a solution to reuse your Storybook stories in your React tests. By reusing your stories in your tests, you have a catalog of component scenarios ready to be tested. All args and decorators from your story and its meta, and also global decorators, will be composed by this library and returned to you in a simple component. This way, in your unit tests, all you have to do is select which story you want to render, and all the necessary setup will be already done for you. This is the missing piece that allows for better shareability and maintenance between writing tests and writing Storybook stories.

---

## Installation

The addon must be added as a devDependency:

```s
# using NPM
npm i -D @storybook/testing-react

# using YARN
yarn add -D @storybook/testing-react
```

---

## Story Setup

**Storybook 6 and Component Story Format**

This library requires you to be using Storybook version 6, **[Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf)** and **[hoisted CSF annotations](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations)**, which is the recommended way to write stories since Storybook 6.

**Essentially, if you use Storybook 6 and your stories look similar to this, you're good to go!**

```es6
import { Button } from './Button';

// CSF: default export (meta) + named exports (stories)
export default {
  title: 'Example/Button',
  component: Button,
};

const Primary = args => <Button {...args} />; // or with Template.bind({})
Primary.args = {
  primary: true,
};
```

---

## Global Config

> This is an optional step. If you don't have global decorators, there's no need to do this. However, if you do, this is a necessary step for your global decorators to be applied.

If you have global decorators/parameters/etc and want them applied to your stories when testing them, you first need to set this up. You can do this by adding to or creating a jest setup file called **`storybook-setup.js`**:

**Example: Global Decorator:**

In **`.storybook/preview.js`**,

```js
import { ThemeProvider } from '../../src/components/ThemeProvider'; // path of custom theme provider
import { darkTheme } from '../../src/styles'; // path of your theme file

/** Example ThemeProvider as Decorator */
export const decorators = [
  Story => (
    <ThemeProvider theme={darkTheme}>
      <Story />
    </ThemeProvider>
  ),
];
```

In **`storybook-setup.js`**,

```cjs
const { setGlobalConfig } = require('@storybook/testing-react');
const globalStorybookConfig = require('../.storybook/preview'); // path of your preview.js file

setGlobalConfig(globalStorybookConfig);
```

We will also need **Babel** to transpile the ESModule imports that storybook uses.

For this, we need to use the `@babel/preset-env` preset. Additionally if we are using Storybook Global Decorators that use React, we also need the `@babel/preset-react` preset. If using TypeScript, we might also need the `@babel/preset-typescript`.

In **babel.config.js`**

```cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
```

Lastly, we need to modify the **`jest.config.js`** file and add the **`storybook-setup.js`** file to the [`setupFiles`](https://jestjs.io/docs/configuration#setupfiles-array) field.

We will also need to add `jsdom` to the [`testEnvironment`](https://jestjs.io/docs/configuration#testenvironment-string) field. By default, Jest uses the `node` `testEnvironment`. This essentially makes any tests meant for a browser environment invalid.

`jsdom` is an implementation of a browser environment, which supports these types of UI tests.

> **Note:** For Jest version 28 and greater, `jest-environment-jsdom` was removed from the default jest installation to reduce package size. Read: [Breaking changes in Jest 28](https://jestjs.io/blog/2022/04/25/jest-28#breaking-changes)

Therefore, for Jest version >= 28, Install `jest-environment-jsdom`,

```s
# Using NPM
npm i -D jest-environment-jsdom

# Using YARN
yarn add -D jest-environment-jsdom
```

In **`jest.config.js`**

```cjs
module.exports = {
  testEnvironment: 'jsdom', // For Jest >= 28, Install the package: 'jest-environment-jsdom' first.
  setupFiles: ['./path/to/storybook-setup.js'], // path to 'storybook-setup.js'
  snapshotSerializers: [
    /* if needed other snapshotSerializers should go here */
    '@emotion/jest/serializer',
  ],
};
```

---

## Installing devDependencies

That's three primary devDependencies to do our testing! Let's define their roles:

1. **[@testing-library/react](https://www.npmjs.com/package/@testing-library/react)** -
   Simple and complete React DOM testing utilities that encourage good testing
   practices.
2. **[jest](https://www.npmjs.com/package/jest)** - Test Runner and Testing
   Library.
3. **[@storybook/testing-react](https://www.npmjs.com/package/@storybook/testing-react)** -
   Reuse Storybook stories in React tests.

We also may require the following devDependencies to make sure what we intend to do works as intended.

4. **[@types/jest]** - Typings for Jest. (Required: When using Typescript)
5. **[jest-environment-jsdom](https://www.npmjs.com/package/jest-environment-jsdom)** -
   Add `jsdom` testEnvironment for Jest. (Required: Reasons mentioned earlier)
6. **[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)** -
   Custom jest matchers to test the state of the DOM. (Highly Recommended)
7. **[@emotion/jest](https://www.npmjs.com/package/@emotion/jest)** - Test React
   components easily with Emotion.js with the `@emotion/jest/serializer` snapshot
   serializer. (Optional: Only when using the Emotion.js library and using snapshot testing.)
8. **[@storybook/testing-library](https://www.npmjs.com/package/@testing-library/jest-dom)** -
   Storybook integration for Testing Library, instrumented for use with the
   Interactions addon. (Optional: Only when using Interactions)
9. **[@storybook/addon-jest](https://www.npmjs.com/package/@testing-library/addon-jest)** -
   Storybook addon for inspecting Jest unit test results. (Optional: To view Jest tests in storybook)

---

## Writing Tests

## Using `composeStories`

`composeStories` will process all stories from the component you specify, compose args/decorators in all of them and return an object containing the composed stories.

If you use the composed story (e.g. PrimaryButton), the component will render with the args that are passed in the story. However, you are free to pass any props on top of the component, and those props will override the default values passed in the story's args.

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom'; // custom matchers to test DOM state
import * as stories from './Link.story'; // import all stories from the stories file
import { lightTheme } from '../../styles'; // default theme provided to global ThemeProvider decorator

const { DefaultLink } = composeStories(stories);

describe('components/Link', () => {
  it('Renders Default Link', () => {
    render(<DefaultLink>Hello World</DefaultLink>);
    const linkEl = screen.getByTestId('link');
    const linkText = linkEl.querySelector('.Ursa-LinkText');
    expect(linkEl).not.toBeNull();
    expect(linkEl).toHaveAttribute('href', DefaultLink.args.url);
    expect(linkText).toHaveTextContent(linkText.textContent);
    expect(linkEl).toHaveStyle({
      color: lightTheme.color['--ursa-link-primary'],
      'text-decoration': 'underline',
    });
  });
});
```

## Batch Testing all Stories from a File

Rather than specifying test by test manually, you can also run automated tests by using test.each in combination with composeStories. Here's an example for doing snapshot tests in all stories from a file:

```es6
import * as stories from './Button.stories';

const testCases = Object.values(composeStories(stories)).map((Story) => [
  // The ! is necessary in Typescript only, as the property is part of a partial type
  Story.storyName!,
  Story,
]);
// Batch snapshot testing
test.each(testCases)('Renders %s story', async (_storyName, Story) => {
  const tree = await render(<Story />);
  expect(tree.baseElement).toMatchSnapshot();
});
```

---

# References

- **[@react-theming/storybook-addon](https://www.npmjs.com/package/@react-theming/storybook-addon)**
