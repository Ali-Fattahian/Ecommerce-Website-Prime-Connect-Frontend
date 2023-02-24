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
    const { data } = await axios.post("api/orders/add", order, config);
    return data;
  }
);

export const getOrderDetail = createAsyncThunk(
  "orders/getOrderDetail",
  async (orderId) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `JWT ${user.token}`,
        "Content-Type": "application/json",
      },
      baseURL: "http://localhost:8000",
    };
    const { data } = await axios.get(`api/orders/get-order/${orderId}`, config);
    return data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    error: null,
    orderDetail: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderCreate.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        localStorage.removeItem("cartItems");
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
        console.log(state.orderDetail);
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
