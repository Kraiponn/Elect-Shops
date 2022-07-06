import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IProduct,
  ICart,
  IErorrResponseData,
  IResponseMessage,
} from "@/features/types";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

import Cookies from "js-cookie";

const initialState: ICart = {
  totalPrice: 0,
  products: null,
  amount: 0,
};

export const fetchProducts = createAsyncThunk<
  IProduct,
  void,
  {
    rejectValue: IErorrResponseData;
  }
>("products/fetchProducts", async (_, thunkApi) => {
  const controller = new AbortController();

  try {
    const response = await http.post(`/products?page=${1}&linit=${10}`, {
      headers: {
        "Content-Type": "application/json",
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductToCart: (state) => {
      state.amount = Number(state.amount) + 1;
      state.totalPrice = 0;
    },
    removeProductFromCart: (state) => {
      state.amount = Number(state.amount) - 1;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    /**********************************
     *    SIGNUP
     */
    builder.addCase(fetchProducts.pending, (state, { payload }) => {});
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      console.log("Products", payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error on rejected", action.payload);
      // Cookies.remove("access_token");
      // Cookies.remove("user");
    });
  },
});

export const { addProductToCart, removeProductFromCart } = productSlice.actions;

export default productSlice.reducer;
