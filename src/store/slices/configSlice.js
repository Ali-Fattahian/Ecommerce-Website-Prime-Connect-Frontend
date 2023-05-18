import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    baseURL: "https://prime-connect.onrender.com/api",
    // baseURL: 'http://localhost:8000/api/'
  },
  reducers: {},
});

export default configSlice.reducer;
