import { ICart } from "@/features/types";
import { createSlice } from "@reduxjs/toolkit";

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
      state.totalPrice = 9;
    },
    removeProductFromCart: (state) => {
      state.amount = Number(state.amount) + 1;
      state.totalPrice = 9;
    },
  },
});

export const { addProductToCart, removeProductFromCart } = productSlice.actions;

export default productSlice.reducer;
