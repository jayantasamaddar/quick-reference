import { legacy_createStore as createStore } from 'redux';

const reducer = (state = { counter: 0 }, action) => {
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

const store = createStore(reducer);

export default store;