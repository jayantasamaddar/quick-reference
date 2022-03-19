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

### cloneElement

`cloneElement` is used to pass props progammatically. Often combined with the `Children` Top-Level API, it can take all the children for instance and pass a certain function as props to each child.

**Inside a Form Component**
```
import NewContactForm from '../NewContactForm'
const NewForm = () => {
  return (
    <DataLookup label="Contact" name="contact_name" placeholder="Contact Name" onChange={handleChange} errors={errors.contact_name} dataURL="/api/v1/contacts" fields = {["email", "phone"]} addButton>
      <NewContactForm />
    </DataLookupField>
  )
}
```

**Inside `DataLookupField`**
```
import { useState, useEffect, useRef, Children, cloneElement } from 'react';
import axios from 'axios';
import { NewContactForm } from '../../blocks';
import { Card } from '../cards';
import { Modal } from '../modal';

const DataLookupField = (
    {className, name, label, placeholder, dataURL, fields, onChange, addButton, errors, children }) => {

    /*********************************************************************************/
    // Initialize State and Refs
    /********************************************************************************/

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [ID, setID] = useState("");
    const [displayState, setDisplayState] = useState(false);

    const childrenArray = Children.toArray(children);

    const [openModal, setOpenModal] = useState(false);
    const [renderLookup, setRenderLookup] = useState(true);
    
    const toggleRef = useRef();
    const inputRef = useRef();
    const optionsRef = useRef([]);

    /*********************************************************************************/
    // Event Constructor
    /********************************************************************************/
    const clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    /*********************************************************************************/
    // useEffect - Fetch Data
    /********************************************************************************/
    useEffect(() => {
        if(dataURL && renderLookup) {
            (async () => {
                try {
                    const { data: dataArray, status } = await axios.get(dataURL || "" + fields?.join());
                    if(status === 200) setData(dataArray);
                }
                catch(error) {console.log(error)}  
            })();
            return renderLookup ? setRenderLookup(false) : null;
        }
    },[dataURL, fields, renderLookup]);

    /*********************************************************************************/
    // useEffect - Close dropdown on clicking outside
    /********************************************************************************/
    useEffect(() => {
        const handler = (event) => {
            try {
                if(!toggleRef.current.contains(event.target)) setDisplayState(false);
                else return;
            }
            catch(error) {return}
        }
        document.addEventListener("mousedown", handler);

        return () => {
            try {
                document.removeEventHandler("mousedown", handler);
            } catch(e) {}
        };
    },[displayState]);

    /*********************************************************************************/
    // State Modifier Functions
    /********************************************************************************/

    const toggleDisplay = () => setDisplayState(prev => !prev);

    const setSearchValue = (event) => {
        setSearch(event.target.closest(".Ursa-LookupCard").querySelector(".name").textContent);
        setDisplayState(false);
        setID(event.target.closest(".Ursa-LookupCard").dataset.id);
        inputRef.current.focus();
        //inputRef.current.readOnly = true;
    }

    const onChangeHandler = (event) => {
        setID("");
        const val = event.target.value
        val.length > 0 ? setDisplayState(true) : setDisplayState(false)
        setSearch(val);
        onChange(event);
    }
    
    const turnModalOn = () => setOpenModal(true);

    const refreshList = ({status, data, lookup}) => {
        if([200, 201].includes(status)) {
            setRenderLookup(true);
            setSearch(data?.[lookup] || data?.[name]);
            setID(data?.id || data?._id);
            inputRef.current.focus();
            inputRef.current.dispatchEvent(clickEvent);
            toggleDisplay();
        }
    }

    /*********************************************************************************/
    // Render JSX
    /********************************************************************************/

    return (
    <>
    <div className={`Ursa-LookupFieldGroup flex-col w-full ${className || ""}`} >
        <div className="Ursa-LookupFieldAutoComplete flex flex-col" ref={toggleRef}>
            
            <div className="Ursa-LookupFieldInput flex-col" data-field={name} data-id={ID} data-value={search}>
                <label className="" htmlFor={name}>{label}</label>
                
                <input id={name} className="text-standard" type="text" name={name} value={search} 
                placeholder={placeholder} onClick={toggleDisplay} onChange={onChangeHandler} onSelect={onChange} ref={inputRef} autoComplete="off" />
                
                <input id={`${label?.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, "-").toLowerCase()}_id`} type="hidden" 
                name={`${label?.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, "-").toLowerCase()}_id`} value={ID} onSelect={onChange} />
            </div>

            {displayState && <div className="Ursa-LookupFieldOptionsGroup relative">
                <div className="Ursa-LookupFieldOptionsContainer flex-col absolute w-full top-full z-10">
                    <div className="Ursa-LookupFieldOptions flex flex-col options bg-slate-900 overflow-x-auto overscroll-x-contain">
                        <ul className="max-h-[250px]">
                            {data
                                .filter(e => e[name].toLowerCase().indexOf(search.toLowerCase()) >= 0 )
                                .map((item, index) => {
                                return (
                                <li className="Ursa-LookupCard hover:bg-orange-700 cursor-pointer" key={index} onClick={setSearchValue} 
                                    ref={card => optionsRef.current[index] = card} data-id={item?.id || item?._id}>
                                    <Card name={item[name]} fields={ Object.entries(item).filter(e => fields?.includes(e[0])) } />
                                </li>)
                            })}
                        </ul>
                    </div>
                    {addButton && <div className="Ursa-LookupFieldAddNew flex p-20 cursor-pointer bg-slate-800 hover:bg-slate-700 items-center"
                        onClick={turnModalOn}>
                        <i className="fas fa-plus-circle text-l"></i>
                        <span className="px-8 text-standard">Add New</span>
                    </div>}
                </div>
            </div>}
            {/* Error Handling - If errors = [] is passed as props */}
            {errors?.length > 0 && 
            <div className="alert">
                    {errors?.map((error, indx) => <p className="alert text-red-500" key={indx}>{error}</p>)}
            </div>}
        </div>
    </div>

    <Modal isOpen={openModal} onClose={() => setOpenModal(false)} scrollHeight={document.body.scrollHeight}>
        {childrenArray.map(child => cloneElement(child, { onSuccess: refreshList }))}
    </Modal>
    
    </>
  )
}

export default DataLookupField
```

------------------------------------------------------------------------------------------------------

# References

- [A Complete Guide to useEffect - Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Using the Effect Hook (useEffect) - Reactjs](https://reactjs.org/docs/hooks-effect.html)
- [How are Function Components Different than Classes - Dan Abramov](https://overreacted.io/how-are-function-components-different-from-classes/)
- 