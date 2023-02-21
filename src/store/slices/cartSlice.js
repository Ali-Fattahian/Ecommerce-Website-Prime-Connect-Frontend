import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : [],
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "",
  },
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.productDetail.id // n >= 0 found or n = -1 not found
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].productQuantity += action.payload.qty; // Increase the quantity by qty from action.payload
      } else {
        const tempProduct = {
          ...action.payload.productDetail,
          productQuantity: action.payload.qty, // A new product, add qty from payload as a new key, value pair
        };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.productDetail.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].productQuantity = action.payload.qty;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  updateCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
