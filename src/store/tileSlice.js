import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tileList : []
}

const tileSlice = createSlice({
    name: 'tile',
    initialState: initialState,
    reducers: {
        addTile(state, action){
            state.tileList.push(action.payload);
        },
        removeUnMatchingTiles(state){
            state.tileList.pop();
            state.tileList.pop();
        },
        clearTile(state){
            state.tileList = [];
        }
    }
})

export const {addTile, removeUnMatchingTiles, clearTile} = tileSlice.actions;
export default tileSlice.reducer;