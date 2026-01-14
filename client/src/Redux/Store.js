import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './Slices/AuthSlice';
import RestaurantSlice from './Slices/RestaurantSlice'
import MenuSlice from './Slices/MenuSlice';
import CartSlice from './Slices/CartSlice';
import OrderSlice from './Slices/OrderSlice'
const Store=configureStore({
    reducer:{
        auth:AuthSlice,
        restaurant:RestaurantSlice,
        menu:MenuSlice,
        cart:CartSlice,
        order:OrderSlice
    }
})

export default Store;