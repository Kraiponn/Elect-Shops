import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IAuth,
  IAuthInput,
  IErorrResponseData,
  IResponseMessage,
} from "@/features/types";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

import Cookies from "js-cookie";

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

//######### Signup And Login
export const asyncAuth = createAsyncThunk<
  IAuth,
  IAuthInput,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/asyncAuth", async (body, thunkApi) => {
  const controller = new AbortController();
  const { authType, email, password } = body;

  try {
    const response = await http.post(
      authType === "LOGIN" ? `/auth/user/signin` : `/auth/user/signup`,
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
    const err = error as AxiosError;
    // console.log("My error", error as AxiosError);

    if (err.code === "ERR_NETWORK") {
      const errObj = {
        error: "Invalid connection",
        message: "No internet(network) connection or api url is incorrect.",
        statusCode: 500,
      };

      return thunkApi.rejectWithValue(errObj as IErorrResponseData);
    }

    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

//######### Get profile
export const fetchProfileById = createAsyncThunk<
  IAuth,
  void,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/fetchProfileById", async (_, thunkApi) => {
  const controller = new AbortController();
  const accessToken = Cookies.get("access_token");

  try {
    const response = await http.get(`/auth/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });

    controller.abort();
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    // console.log("My error", error as AxiosError);

    if (err.code === "ERR_NETWORK") {
      const errObj = {
        error: "Invalid connection",
        message: "No internet(network) connection or api url is incorrect.",
        statusCode: 500,
      };

      return thunkApi.rejectWithValue(errObj as IErorrResponseData);
    }

    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

//######### Logout
export const systemLogout = createAsyncThunk<
  IResponseMessage,
  void,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/systemLogout", async (_, thunkApi) => {
  const controller = new AbortController();
  const accessToken = Cookies.get("access_token");

  try {
    const response = await http.get(`/auth/user/logout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });

    controller.abort();
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.code === "ERR_NETWORK") {
      const errObj = {
        error: "Invalid connection",
        message: "No internet(network) connection or api url is incorrect.",
        statusCode: 500,
      };

      return thunkApi.rejectWithValue(errObj as IErorrResponseData);
    }

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

      // Cookies.remove("access_token");
      // Cookies.remove("user");
    },
    setAuthSuccess: (
      state,
      {
        payload,
      }: PayloadAction<
        Omit<IAuth, "profile" | "error" | "isLoading" | "isSuccess">
      >
    ) => {
      const { user, access_token } = payload;
      state.user = user;
      state.access_token = access_token;
    },
  },
  extraReducers: (builder) => {
    /**********************************
     *    SIGNUP
     */
    builder.addCase(asyncAuth.pending, (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(asyncAuth.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.user = payload.user;
      state.access_token = payload.access_token;

      Cookies.set("access_token", payload.access_token as string, {
        expires: 7,
      });
      Cookies.set("user", JSON.stringify(payload.user), {
        expires: 7,
      });
    });
    builder.addCase(asyncAuth.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);

      state.error = action.payload ? action.payload : null;
      state.isLoading = false;
      state.isSuccess = false;

      // Cookies.remove("access_token");
      // Cookies.remove("user");
    });

    /**********************************
     *    Get profile by id
     */
    builder.addCase(fetchProfileById.pending, (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchProfileById.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.user = payload.user;
      state.access_token = payload.access_token;

      Cookies.set("access_token", payload.access_token as string, {
        expires: 7,
      });
      Cookies.set("user", JSON.stringify(payload.user), {
        expires: 7,
      });
    });
    builder.addCase(fetchProfileById.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);

      state.error = action.payload ? action.payload : null;
      state.isLoading = false;
      state.isSuccess = false;
    });

    /**********************************
     *    Logout from application
     */
    builder.addCase(systemLogout.pending, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(systemLogout.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.user = null;
      state.profile = null;
      state.access_token = "";

      Cookies.remove("access_token");
      Cookies.remove("user");
    });
    builder.addCase(systemLogout.rejected, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
      state.profile = null;
      state.access_token = "";

      Cookies.remove("user");
      Cookies.remove("access_token");
    });
  },
});

export const { clearErrorAndLoadingState, setAuthSuccess } = authSlice.actions;

export default authSlice.reducer;
