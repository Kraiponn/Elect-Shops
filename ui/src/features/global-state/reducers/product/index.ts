import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProduct,
  ICart,
  IErorrResponseData,
  IResponseMessage,
  IInputCart,
} from "@/features/types";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

import Cookies from "js-cookie";

const initialState: ICart = {
  totalPrice: 0,
  orders: [],
  quantity: 0,
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
    increaseProductToCartWithSpecify: (
      state,
      { payload }: PayloadAction<IInputCart>
    ) => {
      let mQuantity: number = 0;
      let mTotalPrice: number = 0;
      const { product, quantity } = payload;

      const orderIndex = state.orders.findIndex(
        (order) => product.id === order.product.id
      );

      // Loop for add exists products
      if (orderIndex !== -1) {
        mQuantity = state.orders[orderIndex].quantity;
        mTotalPrice = state.orders[orderIndex].totalPrice;

        for (let index = 0; index < quantity; index++) {
          mQuantity += 1;
          mTotalPrice += product.unit_price;
        }

        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          quantity: mQuantity,
          totalPrice: mTotalPrice,
        };
      } else {
        let onceLoop = true;

        for (let index = 0; index < quantity; index++) {
          if (onceLoop) {
            onceLoop = false;
            state.orders.push({
              product: product,
              quantity: 1,
              totalPrice: product.unit_price,
            });
          } else {
            const index = state.orders.findIndex(
              (order) => order.product.id === product.id
            );
            const _quantity = state.orders[index].quantity;
            const _totalPrice = state.orders[index].totalPrice;

            mQuantity = _quantity + 1;
            mTotalPrice = _totalPrice + product.unit_price;

            state.orders[index] = {
              ...state.orders[index],
              quantity: mQuantity,
              totalPrice: mTotalPrice,
            };
          }
        }
      }

      state.quantity = state.orders.reduce((accumulate, { quantity }) => {
        return accumulate + quantity;
      }, 0);

      state.totalPrice = state.orders.reduce((accumulate, { totalPrice }) => {
        return accumulate + totalPrice;
      }, 0);
    },
    increaseProductToCart: (state, { payload }: PayloadAction<IProduct>) => {
      let quantity: number = 0;
      let totalPrice: number = 0;
      const orderIndex = state.orders.findIndex(
        (order) => payload.id === order.product.id
      );

      if (orderIndex !== -1) {
        quantity = state.orders[orderIndex].quantity + 1;
        totalPrice = state.orders[orderIndex].totalPrice + payload.unit_price;

        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          quantity,
          totalPrice,
        };
      } else {
        state.orders.push({
          product: payload,
          quantity: 1,
          totalPrice: payload.unit_price,
        });
      }

      state.quantity = state.orders.reduce((accumulate, { quantity }) => {
        return accumulate + quantity;
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

      if (orderIndex <= -1) return;

      const order = state.orders[orderIndex];
      const quantity = order.quantity - 1;
      const totalPrice = order.totalPrice - order.product.unit_price;

      if (order.quantity === 1) {
        state.orders.splice(orderIndex, 1);
      } else {
        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          quantity,
          totalPrice,
        };
      }

      state.quantity = state.orders.reduce((accumulate, { quantity }) => {
        return accumulate + quantity;
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

      state.quantity = state.orders.reduce((accumulate, { quantity }) => {
        return accumulate + quantity;
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
  increaseProductToCartWithSpecify,
  increaseProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
} = productSlice.actions;

export default productSlice.reducer;
