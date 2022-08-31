import Cookies from "js-cookie";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IErorrResponseData,
  IInputOrder,
  IOrderState,
  IProductResponse,
} from "@/features/interfaces";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

/************************************************************
 *               SEND PRODUCTS ORDER TO API                 *
 ***********************************************************/
export const createdOrder = createAsyncThunk<
  IProductResponse,
  IInputOrder,
  {
    rejectValue: IErorrResponseData;
  }
>("orders/createdOrder", async (body, { rejectWithValue }) => {
  const controller = new AbortController();
  const accessToken = Cookies.get("access_token");

  try {
    const response = await http.post("/orders", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });

    //  console.log(response.data);
    controller.abort();

    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return rejectWithValue(errObj as IErorrResponseData);
  }
});

const initialState: IOrderState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

/************************************************************
 *                   CREATE ORDER SLICE                     *
 ***********************************************************/
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /*************************************************************************
     *                       CREATED PRODUCTS ORDER                          *
     ************************************************************************/
    builder.addCase(createdOrder.pending, (state) => {
      // console.log("Order start and pending...");
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(
      createdOrder.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        // console.log("Products", payload);
        state.error = null;
        state.isLoading = false;
        state.isSuccess = true;
      }
    );
    builder.addCase(createdOrder.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.error = action.payload as IErorrResponseData;
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
