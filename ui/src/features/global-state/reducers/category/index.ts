import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IErorrResponseData,
  ICategoryResponse,
  ICategory,
} from "@/features/interfaces";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

const initialState: ICategoryResponse = {
  pagination: {
    total: 0,
    currentPage: 1,
    prev: {
      page: 0,
      limit: 10,
    },
    next: {
      page: 0,
      limit: 10,
    },
  },
  categories: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

/************************************************************
 *              Get categoeies with filtersed               *
 ***********************************************************/
export const getCategories = createAsyncThunk<
  ICategoryResponse,
  void,
  {
    rejectValue: IErorrResponseData;
  }
>("categories/getCategories", async (_, { rejectWithValue }) => {
  const controller = new AbortController();

  try {
    const response = await http.get(`/categories?page=1&limit=20`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      withCredentials: false,
    });

    // console.log(response.data);
    controller.abort();
    // const products = response.data;

    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return rejectWithValue(errObj as IErorrResponseData);
  }
});

/************************************************************
 *                  CREATE CATEGORy SLICE                    *
 ***********************************************************/
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.categories = payload;
    },
  },
  extraReducers: (builder) => {
    /*************************************************************************
     *                           Get                              *
     ************************************************************************/
    builder.addCase(getCategories.pending, (state, { payload }) => {
      // console.log("Fetch product pending...");
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });

    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      // console.log("Products...", payload);
      state.isLoading = false;
      state.isSuccess = true;
      // state.categories.push({
      //   id: 0,
      //   category_name: "Please select",
      //   description: "Blank selection",
      //   created_at: new Date(Date.now()),
      //   updated_at: new Date(Date.now()),
      // });
      // state.categories.push(...payload.categories);
      state.categories = payload.categories;
      state.pagination = payload.pagination;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload as IErorrResponseData;
    });
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
