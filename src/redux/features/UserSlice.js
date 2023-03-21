import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const login = createAsyncThunk(
  "users/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userLoggedIn", data.data.email);
        return data;
      } else if (response.status === 401) {
        throw new Error("Invalid login credentials!");
      } else if (response.status === 400) {
        throw new Error("Please verify your email address");
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let data = await response.json();
      if (response.status === 200) {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    loading: false,
  },
  reducers: {
    clearSomeState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [login.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearSomeState } = UserSlice.actions;
export default UserSlice.reducer;
