import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuth, IAuthForm, IErorrResponseData } from "@/features/types";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

const initialState: IAuth = {
  user: null,
  profile: null,
  access_token: "",
  error: null,
  isLoading: false,
  isSuccess: false,
};

/***************************************************************
 *                Asynchronous Method
 **************************************************************/
export const asyncSignup = createAsyncThunk<
  IAuth,
  IAuthForm,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/asyncSignup", async (body, thunkApi) => {
  const controller = new AbortController();
  const { email, password } = body;

  try {
    const response = await http.post(
      `/auth/user/signup`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );

    controller.abort();
    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

/***************************************************************
 *              Create a slice of rducer
 **************************************************************/
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrorAndLoadingState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /**********************************
     *    SIGNUP
     */
    builder.addCase(asyncSignup.pending, (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(asyncSignup.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.user = payload.user;
      state.access_token = payload.access_token;
    });
    builder.addCase(asyncSignup.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);

      state.error = action.payload ? action.payload : null;
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const { clearErrorAndLoadingState } = authSlice.actions;

export default authSlice.reducer;
