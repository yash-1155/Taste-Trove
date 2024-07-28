import { createSlice } from "@reduxjs/toolkit";
import { Link, useParams, useNavigate } from "react-router-dom";
const addToCart=createSlice({
    name: "addToCart",
    initialState:{cartItems:[],totalAmount:0,cartQuantity:0},
    reducers:{
        addItem: (state, action) => {
            const newItem = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === newItem._id);
        
            if (itemIndex >= 0) {
                // If the item already exists in the cart, update its quantity and totalAmount
                state.cartItems[itemIndex].cartQuantity += 1;
                state.cartItems[itemIndex].totalAmount += newItem.pricePerMeal; // Assuming this is the amount for one item
            } else {
                // If the item doesn't exist in the cart, add it
                state.cartItems.push({
                    ...newItem,
                    cartQuantity: 1, // Initialize cartQuantity to 1 for the new item
                    totalAmount: newItem.pricePerMeal // Assuming this is the amount for one item
                });
            }
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload;
            const index = state.cartItems.findIndex(item => item._id === idToRemove);
            
            if (index !== -1) {
                const removedItem = state.cartItems[index];
                const updatedCartItems = [
                    ...state.cartItems.slice(0, index),
                    ...state.cartItems.slice(index + 1)
                ];
        
                // Calculate the new total amount after removing the item
                // const newTotalAmount = state.totalAmount - removedItem.totalAmount;
        
                return {
                    ...state,
                    cartItems: updatedCartItems
                    // totalAmount: newTotalAmount,
                };
            }
            // Return the state unchanged if the item is not found
            return state;
        },
         increaseCount:(state,action)=>{
            const newItem = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === newItem._id);
            //  const index = action.payload;
             const item = state.cartItems[itemIndex];
             item.cartQuantity++;
             item.totalAmount+=item.pricePerMeal;
            // const index = action.payload;
            // state.totalAmount=state.totalAmount+index.pricePerMeal

         },
         decreaseCount:(state,action)=>{
            const newItem = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === newItem._id);
            //  const index = action.payload;
             const item = state.cartItems[itemIndex];
             if(item.cartQuantity>1){
                item.cartQuantity--;
                item.totalAmount-=item.pricePerMeal;
             }
            //  item.cartQuantity++;
            //  item.totalAmount+=item.pricePerMeal;
         },
         getcart:(state,action)=>{
            return state
         },
         clearCart(state, action) {
            // const navigate=useNavigate();
            state.cartItems = [];
            // navigate("http://localhost:5173/allListings");

          }                
    }
})
export const {addItem,removeItem,increaseCount,decreaseCount,getcart,clearCart}=addToCart.actions;
export default addToCart.reducer