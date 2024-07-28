import { createSlice } from "@reduxjs/toolkit";

const userSlice1=createSlice({
    name:"user",
    initialState:[],
    reducers:{
        addUser(state,action){
            // console.log(action.payload)
            // state.push(action.payload)
            // console.log(state)
            return [...state, action.payload]; 
        },
        removeUser(state,action){
            state.splice(action.payload,2);
        }
    }
})
export const {addUser,removeUser}=userSlice1.actions;
export default userSlice1.reducer