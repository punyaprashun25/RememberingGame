import { configureStore } from "@reduxjs/toolkit";
import tileReducer from './tileSlice';

const store = configureStore({
    reducer:{
        tile: tileReducer,
    }
})

export default store;


background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);