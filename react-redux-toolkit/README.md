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

- The `useSelector` hook to extract data from the Redux store state.
- The `useDispatch` hook to dispatch actions that can modify the state.

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

> **Note:** Reducers must be [pure functions](https://en.wikipedia.org/wiki/Pure_function) that are synchronous and side effect free. Thus, we cannot send asynchronous HTTP requests from reducers. This is how we can make asynchronous requests.

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

## Reducers and Actions

### createSlice

A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

This API is the standard approach for writing Redux logic.

Internally, it uses `createAction` and `createReducer`, so you may also use [`Immer`](https://immerjs.github.io/immer/) to write "mutating" immutable updates:

`createSlice` accepts a single configuration object parameter, with the following options:

- **`initialState`**
  The initial state value for this slice of state.

This may also be a "lazy initializer" function, which should return an initial state value when called. This will be used whenever the reducer is called with undefined as its state value, and is primarily useful for cases like reading initial state from localStorage.

- **`name`**
  A string name for this slice of state. Generated action type constants will use this as a prefix.

- **`reducers`**
  An object containing Redux "case reducer" functions (functions intended to handle a specific action type, equivalent to a single case statement in a switch).

The keys in the object will be used to generate string action type constants, and these will show up in the Redux DevTools Extension when they are dispatched. Also, if any other part of the application happens to dispatch an action with the exact same type string, the corresponding reducer will be run. Therefore, you should give the functions descriptive names.

This object will be passed to [`createReducer`](https://redux-toolkit.js.org/api/createReducer), so the reducers may safely "mutate" the state they are given.

```
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
})
// Will handle the action type `'counter/increment'`
```

**Customizing Generated Action Creators​**

If you need to customize the creation of the payload value of an action creator by means of a [`prepare callback`](https://redux-toolkit.js.org/api/createAction#using-prepare-callbacks-to-customize-action-contents), the value of the appropriate field of the `reducers` argument object should be an object instead of a function. This object must contain two properties: `reducer` and `prepare`. The value of the `reducer` field should be the case reducer function while the value of the `prepare` field should be the prepare callback function:

```
import { createSlice, nanoid } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (text) => {
        const id = nanoid()
        return { payload: { id, text } }
      },
    },
  },
})
```

- **`extraReducers`**
  Extra reducers usually refer to middleware invoked reducer functions like that from `redux thunk`.

---

# Making asynchronous requests

Reducer functions must be pure, synchronous functions that have no side effects. There are two ways we can use asynchronous functions with React and Redux.

1. **`useEffect`** hook inside functional components. Available only with React.
2. Create an **`action creator`** using a async middleware like [`redux thunk`](https://github.com/reduxjs/redux-thunk) or [`redux saga`](https://github.com/redux-saga/redux-saga) which allows us to run the asynchronous code.
3. Using Redux Toolkit's [`RTK Query`](https://redux-toolkit.js.org/rtk-query/overview) data fetching API is a purpose built data fetching and caching solution for Redux apps, and can **eliminate the need to write _any_ thunks or reducers to manage data fetching**.

## Using Redux Thunk

[Thunk](https://en.wikipedia.org/wiki/Thunk) is a programming concept where a function is used to delay the evaluation/calculation of an operation.

Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store’s dispatch method, which is then used to dispatch regular synchronous actions inside the function’s body once the asynchronous operations have been completed.

> **Note:** With Redux Toolkit, Redux Thunk is included by default.

## [Redux Thunk vs useEffect](https://stackoverflow.com/a/67040747)

There is a major advantage to the `createAsyncThunk` approach because it will catch any errors that occur in the API call. It will respond to those errors by dispatching a `fetchUserById.rejected` action instead of a `fetchUserById.fulfilled` action. Your reducer doesn't responded to the `rejected` case which is fine. The error is still caught. With your `useEffect` you run the risk of `"Uncaught error in Promise"` errors.

Now, of course you can catch the errors on your own. You can also dispatch a pending action at the start of the effect. But once you start doing that, the `createAsyncThunk` might feel a lot easier by comparison since it automatically dispatches `pending`, `fulfilled`, and `rejected` actions.

Redux is a framework agnostic library, hence we also get access to Redux Thunk, compared to the limited access of useEffect React hook within React.

---

# Redux Middleware

### What is Redux Middleware?

Redux uses a special kind of addon called `middleware` to let us customize the store's `dispatch` function. It's similar in concept to how server frameworks like Express or Koa behave, and multiple middleware instances can be composed together when the store is created.

**Redux middleware provides third-party extension point between the `dispatch` of an action, and the moment it reaches the `reducer`.**

Middleware solves two primary use cases:

- Centralized application-wide behaviour, like logging, crash reporting and talking to an external API
- Enabling user-defined asynchronous behaviour, without hardcoding a specific async pattern into Redux itself.

### Why Does Middleware Exist?

The reason the middleware API exists in the first place is because Redux explicity did not want to prescribe a particular solution for async.

---

# References

1. [Redux Toolkit Docs](https://redux.js.org/introduction/getting-started)
2. [Asynchronous Redux] | [Redux Thunk](https://github.com/reduxjs/redux-thunk)) | [Redux Saga](https://github.com/redux-saga/redux-saga)
3. [RTK Query Quickstart](https://redux-toolkit.js.org/tutorials/rtk-query)
4. [Pure Functions](https://en.wikipedia.org/wiki/Pure_function)
