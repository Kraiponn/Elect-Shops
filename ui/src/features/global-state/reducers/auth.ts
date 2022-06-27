import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuth, IAuthForm } from "@/features/types";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorMessage } from "@/features/services/errors";

interface IErrorMessage {
  message: string;
}

const initialState: IAuth = {
  user: null,
  profile: null,
  access_token: "",
  error: "",
  isLoading: false,
  isSuccess: false,
};

/*************************
 *  Async method
 */
export const asyncSignup = createAsyncThunk<
  IAuth,
  IAuthForm,
  {
    rejectValue: IErrorMessage;
  }
>("auth/asyncSignup", async (body, thunkApi) => {
  const controller = new AbortController();
  const { email, password } = body;

  try {
    const response = await http.post(
      // `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signup`,
      `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signup`,
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
    const errMsg = getHttpErrorMessage(error as AxiosError);
    return thunkApi.rejectWithValue({ message: errMsg } as IErrorMessage);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   /**********************************
    *    SIGNUP
    */
    builder.addCase(asyncSignup.pending, (state, { payload }) => {
      state.error = "";
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
      console.log("Error on rejected", action.payload);

      state.error = action.payload?.message;
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
