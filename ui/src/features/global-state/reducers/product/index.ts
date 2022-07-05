import { createSlice } from "@reduxjs/toolkit";
import { http } from "@/features/services/http";
import { ICart } from "@/features/types";

const initialState: ICart = {
  totalPrice: 0,
  products: null,
  amount: 0,
};

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
});

export const { addProductToCart, removeProductFromCart } = productSlice.actions;

export default productSlice.reducer;
