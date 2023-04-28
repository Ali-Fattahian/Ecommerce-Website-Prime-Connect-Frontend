import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: null,
  userProfile: localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile"))
    : null,
  usersList: localStorage.getItem("usersList")
    ? JSON.parse(localStorage.getItem("usersList"))
    : [],
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:8000",
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const { data } = await axios.post(
      "api/users/login",
      {
        email: email,
        password: password,
      },
      config
    );
    return data;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ fullname, email, password }) => {
    const { data } = await axios.post(
      "api/users/register",
      {
        fullname: fullname,
        email: email,
        password: password,
      },
      config
    );
    return data;
  }
);

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (token) => {
    const { data } = await axios.get("api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      baseURL: "http://localhost:8000",
    });
    return data;
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async ({ token, userId }) => {
    const { data } = await axios.get(`api/users/get-profile/${userId}`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      baseURL: "http://localhost:8000/",
    });
    return data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updateData) => {
    const token = updateData.token;
    delete updateData.token;
    const { data } = await axios.put(
      `api/users/update-profile/${updateData.id}`,
      updateData,
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        baseURL: "http://localhost:8000",
      }
    );
    return data;
  }
);

export const deleteUserProfile = createAsyncThunk(
  "user/deleteUserProfile",
  async ({ id, token }) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/users/get-profile/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      }
    );
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userProfile");
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      window.location.reload();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Authentication failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.error =
          "There was a problem creating your account, Make sure to fill all the fields correctly";
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        localStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
        state.error =
          "A problem occured while fetching the profile information, Make sure you have a stable internet connection";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo.email = action.payload.email;
        state.userInfo.fullname = action.payload.fullname;
        state.userInfo.isAdmin = action.payload.isAdmin;
        state.userProfile.email = action.payload.email;
        state.userProfile.fullname = action.payload.fullname;
        state.userProfile.isAdmin = action.payload.isAdmin;
        localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.loading = false;
        state.error =
          "A problem occured while update the profile, Make sure you have a stable internet connection";
      })
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.loading = false;
        localStorage.setItem("usersList", JSON.stringify(action.payload));
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          "A problem occured while fetching the profiles, Make sure you have a stable internet connection";
      })
      .addCase(deleteUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserProfile.fulfilled, (state) => {
        getUserList(state.userInfo.token);
        state.loading = false;
      })
      .addCase(deleteUserProfile.rejected, (state) => {
        state.loading = false;
        state.error =
          "A problem occured while deleting the profile, Make sure you have a stable internet connection";
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
