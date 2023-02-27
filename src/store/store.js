import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer,
    products: productReducer,
  },
});
