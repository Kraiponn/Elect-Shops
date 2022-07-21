import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProduct,
  ICart,
  IErorrResponseData,
  IResponseMessage,
  IInputCart,
  IProductSearchResponse,
} from "@/features/types";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

import Cookies from "js-cookie";

const initialState: ICart = {
  products: [],
  totalPrice: 0,
  orders: [],
  quantity: 0,
  isLoading: false,
  isSuccess: false,
  isError: null,
  keyword: "",
};

export const fetchProducts = createAsyncThunk<
  IProductSearchResponse,
  string,
  {
    rejectValue: IErorrResponseData;
  }
>("products/fetchProducts", async (searchKey, { rejectWithValue }) => {
  const controller = new AbortController();

  try {
    const response = await http.get(
      searchKey
        ? `/products?search=${searchKey}&page=${1}&limit=${12}`
        : `/products?page=${1}&limit=${12}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        withCredentials: false,
      }
    );

    // console.log(response.data);

    controller.abort();
    const products = response.data["products"] as IProduct[];

    return { products, keyword: searchKey };
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return rejectWithValue(errObj as IErorrResponseData);
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
    clearStateWithoutProducts: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
    clearProductState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.products = [];
      state.keyword = ''
    },
  },
  extraReducers: (builder) => {
    /**********************************
     *    Get product
     */
    builder.addCase(fetchProducts.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      // console.log("Products", payload);

      state.isLoading = false;
      state.isSuccess = true;
      state.products = [];
      state.products = payload.products;
      state.keyword = payload.keyword;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);

      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.payload as IErorrResponseData;
    });
  },
});

export const {
  increaseProductToCartWithSpecify,
  increaseProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
  clearProductState,
  clearStateWithoutProducts,
} = productSlice.actions;

export default productSlice.reducer;
