# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Storybook?](#what-is-storybook)
- [Why use Storybook?](#why-use-storybook)
- [Installation](#installation)
- [Configuration](#configuration)
    - [Default Setup](#default-setup)
    - [Customized Setup](#customized-setup)
- [Theming with Storybook](#theming-with-storybook)
  - [Setup](#setup)
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

# Theming with Storybook

Ideally, you would like to be able to view how a component looks in different colour themes while storybook is running, without needing to change the theme manually and rebuilding.

**For example:** You want to see how a Modal component looks in Dark Mode and Light Mode. The storybook canvas' background also needs synchronize with this. The ideal solution would be a plugin that allows theme toggling at a click and auto updates the component's props and styling and storybook's background.

Fortunately, we have a plugin that does the job.

## Setup

Theming can be setup with various libraries or custom. Emotion.js and Styled Components (CSS-in-JS) provide theming options.

1. We will first install **`@react-theming/storybook-addon`** as a `devDependency`.

   ```s
   # Using NPM
   npm i -D @react-theming/storybook-addon

   # Using YARN
   yarn add -D @react-theming/storybook-addon
   ```

2. We add the addon the `.storybook/main.js` file.

   ```js
   module.exports = {
     // other options
     addons: [...otherAddons, '@react-theming/storybook-addon'],
   };
   ```

3. Update the `.storybook/preview.js` by adding the `addDecorator` property as follows:

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

# References

- **[@react-theming/storybook-addon](https://www.npmjs.com/package/@react-theming/storybook-addon)**
