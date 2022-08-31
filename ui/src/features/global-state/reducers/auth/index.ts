import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAuth,
  IAuthInput,
  IAuthPayload,
  IErorrResponseData,
  IInputEditPassword,
  IInputEditProfile,
  IProfile,
  IResponseMessage,
} from "@/features/interfaces";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";
import Cookies from "js-cookie";

// INITIAL STATE
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
        withCredentials: false,
      }
    );

    controller.abort();
    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

//######### Get profile
export const fetchProfileById = createAsyncThunk<
  IProfile,
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
    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

/*****************************************************
 *                  UPDATE PROFILE                   *
 ****************************************************/
export const updateProfile = createAsyncThunk<
  IProfile,
  IInputEditProfile,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/updateProfile", async (formData, thunkApi) => {
  const controller = new AbortController();
  const accessToken = Cookies.get("access_token");
  const { form, userId } = formData;

  try {
    const response = await http.put(`/auth/user/update-profile`, form, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });

    // console.log("Update profile...", response.data);
    controller.abort();
    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

/*****************************************************
 *                  UPDATE PASSWORD                  *
 ****************************************************/
export const updatePassword = createAsyncThunk<
  IResponseMessage,
  IInputEditPassword,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/updatePassword", async (formData, thunkApi) => {
  const controller = new AbortController();
  const accessToken = Cookies.get("access_token");
  const { currentPassword, newPassword, userId } = formData;

  try {
    const response = await http.put(
      `/auth/user/update-password/${userId}`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      }
    );

    // console.log("Update password...", response.data);
    controller.abort();
    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

/*****************************************************
 *                  REMOVE ACCOUNT                   *
 ****************************************************/
export const removeAccount = createAsyncThunk<
  IResponseMessage,
  number,
  {
    rejectValue: IErorrResponseData;
  }
>("auth/removeAccount", async (userId, thunkApi) => {
  const controller = new AbortController();
  const accessToken = Cookies.get("access_token");

  try {
    const response = await http.delete(`/auth/user/${userId}`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });

    // console.log("Remove profile...", response.data);
    controller.abort();
    return response.data;
  } catch (error) {
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
      withCredentials: false,
    });

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
    builder.addCase(fetchProfileById.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(fetchProfileById.fulfilled, (state, { payload }) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.error = null;
      state.profile = payload;

      state.user = {
        sub: payload.id,
        email: payload.email,
        user_name: `${payload.first_name} ${payload.last_name}`,
        role: payload.role,
        image_url: payload.image_url as string,
      };
      state.access_token = Cookies.get("access_token");
      Cookies.set("user", JSON.stringify(state.user));
    });
    builder.addCase(fetchProfileById.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.error = action.payload ? action.payload : null;
      state.isLoading = false;
      state.isSuccess = false;
    });

    /**********************************
     *    UPDATE PROFILE
     */
    builder.addCase(updateProfile.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      const user: IAuthPayload = {
        sub: payload.id,
        email: payload.email,
        user_name: `${payload.first_name} ${payload.last_name}`,
        role: payload.role,
        image_url: payload.image_url as string,
      };

      state.isSuccess = true;
      state.isLoading = false;
      state.user = user;
      state.profile = payload;

      Cookies.set("user", JSON.stringify(user), {
        expires: 7,
      });
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.error = action.payload ? action.payload : null;
      state.isLoading = false;
      state.isSuccess = false;
    });

    /**********************************
     *    UPDATE PASSWORD
     */
    builder.addCase(updatePassword.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(updatePassword.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.error = action.payload ? action.payload : null;
      state.isLoading = false;
      state.isSuccess = false;
    });

    /**********************************
     *    DELETE ACCOUNT
     */
    builder.addCase(removeAccount.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(removeAccount.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.error = null;
      state.access_token = "";
      state.user = null;
      state.profile = null;

      Cookies.remove("user");
      Cookies.remove("access_token");
    });
    builder.addCase(removeAccount.rejected, (state, action) => {
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
