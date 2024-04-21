import { configureStore } from '@reduxjs/toolkit';
import genelResponseReducer from "./slicer";

const store = configureStore({
    reducer: {
        genelResponse: genelResponseReducer
    }
});

export default store;
