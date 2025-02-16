import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api/axios";
import { authStateType } from "@/types/store";
import { name, email } from "@/test/data";
import { RootState } from "..";

const initialState: authStateType = {
  loginState: false,
  name: "",
  email: "",
  loading: false,
};

export const signInAction = createAsyncThunk("get/breeds", async () => {
  const response = await api.post("/auth/login", {
    name,
    email,
  });
  return response.data;
});

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      });
  },
});

export const selectLoginState = (state: RootState) => state.auth.loginState;
export const selectLoginLoading = (state: RootState) => state.auth.loading;

export default authReducer.reducer;
