import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  orders: [],
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
    const errObj = getHttpErrorObject(error as AxiosError);
    return thunkApi.rejectWithValue(errObj as IErorrResponseData);
  }
});

/************************************************************
 *                  CREATE PRODUCT SLICE                    *
 ***********************************************************/
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increaseProductToCart: (state, { payload }: PayloadAction<IProduct>) => {
      let amount: number = 0;
      let totalPrice: number = 0;
      const orderIndex = state.orders.findIndex(
        (order) => payload.id === order.product.id
      );

      if (orderIndex !== -1) {
        amount = state.orders[orderIndex].amount + 1;
        totalPrice = state.orders[orderIndex].totalPrice + payload.unit_price;

        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          amount,
          totalPrice,
        };
      } else {
        state.orders.push({
          product: payload,
          amount: 1,
          totalPrice: payload.unit_price,
        });
      }

      state.amount = state.orders.reduce((accumulate, { amount }) => {
        return accumulate + amount;
      }, 0);

      state.totalPrice = state.orders.reduce((accumulate, { totalPrice }) => {
        return accumulate + totalPrice;
      }, 0);
    },
    decreaseProductFromCart: (state, { payload }: PayloadAction<IProduct>) => {
      const productId = payload.id;
      const orderIndex = state.orders.findIndex(
        (order) => productId === order.product.id
      );

      const order = state.orders[orderIndex];
      const amount = order.amount - 1;
      const totalPrice = order.totalPrice - order.product.unit_price;

      if (order.amount === 1) {
        state.orders.splice(orderIndex, 1);
      } else {
        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          amount,
          totalPrice,
        };
      }

      state.amount = state.orders.reduce((accumulate, { amount }) => {
        return accumulate + amount;
      }, 0);

      state.totalPrice = state.orders.reduce((accumulate, { totalPrice }) => {
        return accumulate + totalPrice;
      }, 0);
    },
    removeProductFromCart: (state, { payload }: PayloadAction<IProduct>) => {
      const productId = payload.id;

      const orderIndex = state.orders.findIndex(
        (order) => productId === order.product.id
      );
      state.orders.splice(orderIndex, 1);

      state.amount = state.orders.reduce((accumulate, { amount }) => {
        return accumulate + amount;
      }, 0);

      state.totalPrice = state.orders.reduce((accumulate, { totalPrice }) => {
        return accumulate + totalPrice;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    /**********************************
     *    Get product
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

export const {
  increaseProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
} = productSlice.actions;

export default productSlice.reducer;
