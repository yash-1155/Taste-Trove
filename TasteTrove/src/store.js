import { configureStore } from '@reduxjs/toolkit';
import userSlice1 from './ui/store/user';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import searchSlice from './ui/store/searchfunctionality'
import addToCart from './ui/store/addTocart'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    userdata:userSlice1,
    searchValue:searchSlice,
    cartFunction:addToCart
  },
});

export default store;
