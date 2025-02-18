import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api/axios";
import { authStateType } from "@/types/store";
import { RootState } from "..";

const initialState: authStateType = {
  loginState: false,
  name: "",
  email: "",
  loading: false,
};

export const signInAction = createAsyncThunk(
  "auth/signin",
  async ({ name, email }: { name: string; email: string }) => {
    const response = await api.post("/auth/login", {
      name,
      email,
    });
    return response.data;
  }
);

export const signOutAction = createAsyncThunk("auth/signout", async () => {
  const response = await api.post("/auth/logout");
  return response.data;
});

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStoreAction: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        state.loginState = action.payload === "OK" ? true : false;
        state.loading = false;
      })
      .addCase(signInAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signOutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutAction.fulfilled, (state, action) => {
        state.loginState = action.payload === "OK" ? false : true;
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        state.loading = false;
      })
      .addCase(signOutAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStoreAction } = authReducer.actions;

export const selectLoginState = (state: RootState) => state.auth;

export default authReducer.reducer;
