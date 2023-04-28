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

export const orderDelete = createAsyncThunk(
  "orders/orderDelete",
  async ({ orderId, token }) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `http://localhost:8000/api/orders/delete-order/${orderId}`,
      config
    );
    return data;
  }
);

export const updateOrderToDelivered = createAsyncThunk(
  "orders/updateOrderToDelivered",
  async ({ orderId, token }) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/orders/deliver-order/${orderId}`,
      {},
      config
    );
    return data;
  }
);

export const updateOrderToPaid = createAsyncThunk(
  "orders/updateOrderToPaid",
  async ({ orderId, token, totalPrice }) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/orders/pay/${orderId}`,
      { totalPrice },
      config
    );
    return data;
  }
);

export const getOrderDetail = createAsyncThunk(
  "orders/getOrderDetail",
  async ({ orderId, token }) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:8000/api/orders/get-order/${orderId}`,
      config
    );
    return data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    error: null,
    orderDetail: localStorage.getItem("orderDetail")
      ? JSON.parse(localStorage.getItem("orderDetail"))
      : null,
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
        localStorage.setItem("lastOrder", JSON.stringify(action.payload));
      })
      .addCase(orderCreate.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while creating the order, Make sure you have a stable internet connection";
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetail = action.payload;
        localStorage.setItem("orderDetail", JSON.stringify(action.payload));
      })
      .addCase(getOrderDetail.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while fetching the order details, Make sure you have a stable internet connection";
      })
      .addCase(updateOrderToPaid.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderToPaid.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.orderDetail = null;
        localStorage.removeItem("orderDetail");
        state.orderDetail = null;
      })
      .addCase(updateOrderToPaid.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured during the payment, Make sure you have a stable internet connection";
      })
      .addCase(orderDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderDelete.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(orderDelete.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while deleting the order, Make sure you have a stable internet connection";
      })
      .addCase(updateOrderToDelivered.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderToDelivered.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        localStorage.removeItem("orderDetail");
        state.orderDetail = null;
      })
      .addCase(updateOrderToDelivered.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error =
          "A problem occured while changing the delivered status, Make sure you have a stable internet connection";
      });
  },
});

export default orderSlice.reducer;
