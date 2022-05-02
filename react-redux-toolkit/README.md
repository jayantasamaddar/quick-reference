# What is Redux?
**[Redux](https://redux.js.org/)** is an open-source JavaScript state management library for managing and centralizing application state via a single data store. It is most commonly used with libraries such as React or Angular for building user interfaces.

Redux is really:

- A single store containing "global" state
- Dispatching plain object actions to the store when something happens in the app
- Pure reducer functions looking at those actions and returning immutably updated state

While it's not required, [your Redux code also normally includes](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns):

- Action creators that generate those action objects
- Middleware to enable side effects
- Thunk functions that contain sync or async logic with side effects
- Normalized state to enable looking up items by ID
- Memoized selector functions with the Reselect library for optimizing derived data
- The Redux DevTools Extension to view your action history and state changes
- TypeScript types for actions, state, and other functions

Additionally, Redux is normally used with the React-Redux library to let your React components talk to a Redux store.

---

# What is Redux-Toolkit?
The **[Redux Toolkit](https://redux-toolkit.js.org)** package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

It provides the necessary tooling, utilities and abstractions that lets the user simplify their application code.

Redux Toolkit also includes a powerful data fetching and caching capability that we've dubbed **["RTK Query"](https://redux-toolkit.js.org/introduction/getting-started#rtk-query)**. It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic yourself.

---

# Benefits of using Redux/Redux Toolkit to manage application state
1. **Predictable** - Redux helps you write applications that **behave consistently**, run in different environments (client, server, and native), and are **easy to test**.
2. **Centralized** - Centralizing your application's state and logic enables powerful capabilities like **undo/redo**, **state persistence**, and much more.
3. **Debuggable** - The Redux DevTools make it easy to trace **when, where, why, and how your application's state changed**. Redux's architecture lets you log changes, use **"time-travel debugging"**, and even send complete error reports to a server.
4. **Flexible** - Redux **works with any UI layer**, and has **a large ecosystem of addons** to fit your needs.

---

# Using Redux Toolkit with React

### Installation
- **Option 1**: Install with [Create React App](https://github.com/facebook/create-react-app)
```
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```
- **Option 2**: Install for an existing app via - `npm i @reduxjs/toolkit react-redux`

### Libraries Included in the Package
- **[`redux`](https://redux.js.org/)** - Core Library for State Management
- **[`immer`](https://immerjs.github.io/immer/)** - [Allows to mutate state](https://redux-toolkit.js.org/usage/immer-reducers)
- **[`redux-thunk`](https://github.com/reduxjs/redux-thunk)** - Handles async actions
- **[`reselect`](https://github.com/reduxjs/reselect)** - Simplifies reducer functions
- **[`rtk-query`](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching and caching

### Extras
- **[`redux devtools`](https://github.com/zalmoxisus/redux-devtools-extension)** - Developer tools for Redux workflow
- **[`combineReducers`](https://redux.js.org/api/combinereducers)** - Combines multiple reducers into a single reducer function

### react-redux
connects our app to redux

---

# Core APIs

## Store Setup

### [configureStore](https://redux-toolkit.js.org/api/configureStore)
A friendly abstraction over the standard Redux `createStore` function that adds useful defaults to the store setup for a better development experience.

`configureStore` accepts a single configuration object parameter, with the following options:

- **`reducer`** 
If this is a single function, it will be directly used as the root reducer for the store.
If it is an object of slice reducers, like {users : usersReducer, posts : postsReducer}, `configureStore` will automatically create the root reducer by passing this object to the Redux [`combineReducers` utility](https://redux.js.org/api/combinereducers).

- **`middleware`** 
If provided, adds middleware functions you want added to the store. `configureStore` will automatically pass them to `applyMiddleware`. If not provided, `configureStore` will call `getDefaultMiddleware` and use the array of middleware functions it returns. For more details, see the [`getDefaultMiddleware` docs page](https://redux-toolkit.js.org/api/getDefaultMiddleware)

- **`devTools`**
- If this is a boolean, it will be used to indicate whether configureStore should automatically enable support for the [Redux DevTools browser extension](https://github.com/zalmoxisus/redux-devtools-extension).

- **`preloadedState`**
An optional initial state value to be passed to the Redux `createStore` function.

- **`enhancers`**
An optional array of Redux store enhancers, or a callback function to customize the array of enhancers. 
If defined as an array, these will be passed to the [Redux `compose` function](https://redux.js.org/api/compose), and the combined enhancer will be passed to createStore.

---

### 

---

# References
1. [Redux Toolkit Docs](https://redux.js.org/introduction/getting-started)
2. [RTK Query Quickstart](https://redux-toolkit.js.org/tutorials/rtk-query)