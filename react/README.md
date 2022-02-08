# What is React?

# What are React's primary tasks?

- Work with the DOM/Browser to render UI to the page.
- Manage State for us between render cycles (i.e. state values are remembered from one render to the next)
- Keep the user interface updated when state changes occur

# What can't React handle on its own?

- (Out)side effects - Anything that lives outside React's purview. (E.g. localStorage, API/database interactions, subscriptions/web sockets, syncing two different internal states together)

# Controlled Components
In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

For example, if we want to make the previous example log the name when it is submitted, we can write the form as a controlled component:

Workflow
- Input form has value that triggers onChange a function that stores the state.
- Use the state to change back the value of the input field...so as to have a single source of truth

------------------------------------------------------------------------------------------------------

# React Hooks

### `useState()`

**Syntax:**

```
import React from 'react;

const [state, setState] = React.useState("initial_value");

const setterFunction() => {
  setState("new_state");
}

<button onClick={setterFunction}>Change State</button>
```

Where,
**`state`** is the state variable,
**`setState`** is a setter function for the state variable
**`setterFunction`** is a function that executes the setState function onClick of the button


### Lazy State
All state variables initialize, everytime there are any changes to any State in the page as changes in state to any, refreshes the entire page. While this is a key feature of React, sometimes the calls can be expensive.

*For example*: a State that is holding the value after Fetching data from a REST API or localStorage.

We may not want to fetch data everytime there are any changes but once.

For this React has a way to make sure this happens only once. This is called Lazy State initialization.
This is done by providing a function instead of a value to state

Syntax:
```
import React from 'react;

const [state, setState] = React.useState("initial_value");

const [lazyLoad, setLazyLoad] = React.useState(() => console.log("Load during first initialization));

const setterFunction() => {
  setState("new_state");
}

<button onClick={setterFunction}>Change State</button>
```

------------------------------------------------------------------------------------------------------


### `useEffect()`

1. What is a "side effect" in React? What are some examples?
- Any code that affects an outside system.
- local storage, API, websockets, two states to keep in sync


2. What is NOT a "side effect" in React? Examples?
- Anything that React is in charge of.
- Maintaining state, keeping the UI in sync with the data, 
  render DOM elements


3. When does React run your useEffect function? When does it NOT run
   the effect function?
- As soon as the component loads (first render)
- On every re-render of the component (assuming no dependencies array)
- Will NOT run the effect when the values of the dependencies in the
  array stay the same between renders


4. How would you explain what the "dependecies array" is?
- Second paramter to the useEffect function
- A way for React to know whether it should re-run the effect function


useEffect takes a function as its parameter. If that function
returns something, it needs to be a cleanup function. Otherwise,
it should return nothing. If we make it an async function, it
automatically retuns a promise instead of a function or nothing.
Therefore, if you want to use async operations inside of useEffect,
you need to define the function separately inside of the callback
function, as seen below:

```
React.useEffect(() => {
    async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes);
    }
        getMemes();
}, []);
```

------------------------------------------------------------------------------------------------------

# References

- [A Complete Guide to useEffect - Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Using the Effect Hook (useEffect) - Reactjs](https://reactjs.org/docs/hooks-effect.html)
- [How are Function Components Different than Classes - Dan Abramov](https://overreacted.io/how-are-function-components-different-from-classes/)
- 