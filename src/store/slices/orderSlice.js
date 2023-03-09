import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const orderCreate = createAsyncThunk(
  "orders/orderCreate",
  async (order) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `JWT ${user.token}`,
        "Content-Type": "application/json",
      },
      baseURL: "http://localhost:8000",
    };
    const { data } = await axios.post("api/orders/create", order, config);
    return data;
  }
);

export const getOrderDetail = createAsyncThunk(
  "orders/getOrderDetail",
  async ({orderId, token}) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`http://localhost:8000/api/orders/get-order/${orderId}`, config);
    return data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    error: null,
    orderDetail: localStorage.getItem('orderDetail') ? JSON.parse(localStorage.getItem('orderDetail')): null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        localStorage.removeItem("cartItems");
        localStorage.setItem('lastOrder', JSON.stringify(action.payload))
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetail = action.payload;
        localStorage.setItem('orderDetail', JSON.stringify(action.payload))
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
