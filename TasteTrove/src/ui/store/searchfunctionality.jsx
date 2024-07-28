import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"searchvalue",
    initialState:{
        value:""
    },
    reducers:{
        addSearchValue(state,action){
            // console.log(action.payload)
            // state.push(action.payload)
            // console.log(state)
            return {...state, value:action.payload}; 
        },
        removeSearchValue(state,action){
            return {...state, value:action.payload}; 

        }
    }
})
export const {addSearchValue,removeSearchValue}=searchSlice.actions;
export default searchSlice.reducer