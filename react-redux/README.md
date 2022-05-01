# What is Redux?
Redux is an open-source JavaScript state management library for managing and centralizing application state via a single data store. It is most commonly used with libraries such as React or Angular for building user interfaces.

# Benefits of using Redux to manage application state
1. **Predictable** - Redux helps you write applications that **behave consistently**, run in different environments (client, server, and native), and are **easy to test**.
2. **Centralized** - Centralizing your application's state and logic enables powerful capabilities like **undo/redo**, **state persistence**, and much more.
3. **Debuggable** - The Redux DevTools make it easy to trace **when, where, why, and how your application's state changed**. Redux's architecture lets you log changes, use **"time-travel debugging"**, and even send complete error reports to a server.
4. **Flexible** - Redux **works with any UI layer**, and has **a large ecosystem of addons** to fit your needs.

# Concepts

### Reducers
Redux uses Reducer functions that manages the state and returns the newly updated state.

### Actions

### Dispatch


# Using Redux with React

## Installation and Setup
- Install React - `npx i create-react-app .`
- Install Redux and React-Redux - `npm i redux react-redux`
- Create a `store` folder inside the `src` folder that will contain all the state management tools.
- Create an `index.js` file inside the `store` folder. This file will handle all of the React states in the single `index.`js file.


## Anatomy of a Basic Counter App

In **`index.js` inside `store` folder**
- Import `createStore` from `redux`.
- Create a `reducer` function. 
- Initialize `createStore` as `createStore(reducer)` and store in a variable `store`.
- Export `store`.

In **`index.js` inside `src` folder**
- `import { Provider } from 'react-redux'`
- `import store from './store'` 
- Add a Provider (Similar to Context Provider in React Context API) to wrap over all Components: `<Provider store={store}>{children}</provider>`

In **`app.js` inside `src` folder**
- `import { Provider } from 'react-redux'`
- `import store from './store'` 
- Add a Provider (Similar to Context Provider in React Context API) to wrap over all Components: `<Provider store={store}>{children}</provider>`

**Syntax**

In **`index.js` inside `store`**
```
/**
 * createStore is now deprecated. Redux recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore.

import { legacy_createStore as createStore } from 'redux';

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */

const reducer = (state = { counter: 0 }, action) => {
    /**
     * state contains the initial state
     * action is an object that contains two properties: 
     *  1. type
     *  2. payload
     * The reducer function should be a synchronous function
     * state should not be mutated (use a copy of the state so that main state isn't updated)
    
    // Reducer Function Conditional logic for each value of 'action.type' or 'action.payload' or a combination of both.

    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.counter >= 0 ? state.counter + 1 : 0 };
        case 'DECREMENT':
            return { ...state, counter: state.counter === 0 ? 0 : state.counter - 1 };
        case 'ADD': 
            return { ...state, counter: state.counter + action.payload };
        default:
            return state;
    }

}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }

const store = createStore(reducer)

export default store;
```

In **`index.js`** in the parent `src` folder
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
```

In **`app.js`** in the parent `src` folder
```
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

export default function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };
  const addBy10 = () => {
    dispatch({ type: 'ADD', payload: 10 });
  };

  return (
    <div className="counterApp">
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <div className="buttons">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={addBy10}>+10</button>
      </div>
    </div>
  );
}
```
