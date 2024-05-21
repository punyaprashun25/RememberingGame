import { configureStore } from "@reduxjs/toolkit";
import tileReducer from './tileSlice';

const store = configureStore({
    reducer:{
        tile: tileReducer,
    }
})

export default store;