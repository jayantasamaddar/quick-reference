import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0
    },
    reducers: {
        increment: (state) => {
            state.counter += state.counter >= 0 ? 1 : 0;
        },
        decrement: (state) => {
            state.counter -= state.counter === 0 ? 0 : 1;
        },
        add: (state, action) => {
            state.counter += action.payload;
        }
    }
});

const store = configureStore({
    reducer: counterSlice.reducer,
    devTools: true,
    middleware: [],
    preloadedState: {
        counter: 0
    },
    enhancers: [],
    serializeState: (state) => JSON.stringify(state),
    deserializeState: (state) => JSON.parse(state),
});

export default store;
export const actions = counterSlice.actions;