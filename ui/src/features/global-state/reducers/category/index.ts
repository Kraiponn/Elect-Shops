import Cookies from "js-cookie";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IErorrResponseData,
  ICategoryResponse,
  ICategory,
  ISearchCategory,
  IInputCategory,
  ICUCategoryResponse,
} from "@/features/interfaces";
import { http } from "@/features/services/http";
import { AxiosError } from "axios";
import { getHttpErrorObject } from "@/features/services/errors";

const initialState: ICategoryResponse & { singleCategory: ICategory | null } = {
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
  singleCategory: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

/************************************************************
 *              Get categories with filtersed               *
 ***********************************************************/
export const getCategories = createAsyncThunk<
  ICategoryResponse,
  ISearchCategory,
  {
    rejectValue: IErorrResponseData;
  }
>("categories/getCategories", async (params, { rejectWithValue }) => {
  const controller = new AbortController();
  const { page, limit, noPrefixZeroIndex, searchKey } = params;
  // console.log(params);

  try {
    const response = await http.get(
      `/categories?page=${page}&limit=${limit}&noPrefixZeroIndex=${noPrefixZeroIndex}&search=${searchKey}`,
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

    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return rejectWithValue(errObj as IErorrResponseData);
  }
});

/************************************************************
 *                  GET CATEGORY BY ID                      *
 ***********************************************************/
export const getCategoryById = createAsyncThunk<
  ICategory,
  number,
  {
    rejectValue: IErorrResponseData;
  }
>("categories/getCategoryById", async (categoryId, { rejectWithValue }) => {
  const controller = new AbortController();

  try {
    const response = await http.get(`/categories/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      withCredentials: false,
    });

    // console.log(response.data);
    controller.abort();

    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return rejectWithValue(errObj as IErorrResponseData);
  }
});

/************************************************************
 *               CREATE & UPDATE CATEGORY                   *
 ***********************************************************/
export const cuCategory = createAsyncThunk<
  ICUCategoryResponse,
  IInputCategory,
  {
    rejectValue: IErorrResponseData;
  }
>("categories/cuCategory", async (body, { rejectWithValue }) => {
  const controller = new AbortController();
  const { id, category_name, description } = body;
  // console.log("On Reducer", Cookies.get("access_token"));

  try {
    const response = id
      ? await http.put(
          `/categories/${id}`,
          {
            category_name,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            signal: controller.signal,
            withCredentials: false,
          }
        )
      : await http.post(
          `/categories`,
          {
            category_name,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            signal: controller.signal,
            withCredentials: false,
          }
        );

    // console.log(response.data);
    controller.abort();

    return response.data;
  } catch (error) {
    const errObj = getHttpErrorObject(error as AxiosError);
    return rejectWithValue(errObj as IErorrResponseData);
  }
});

/************************************************************
 *                  CREATE CATEGORY SLICE                   *
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
    clearCategoryState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /*************************************************************************
     *                       GET CATEGORY AND FILTER                         *
     ************************************************************************/
    builder.addCase(getCategories.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });

    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = payload.categories;
      state.pagination = payload.pagination;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload as IErorrResponseData;
    });

    /*************************************************************************
     *                          GET CATEGORY BY ID                           *
     ************************************************************************/
    builder.addCase(getCategoryById.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });

    builder.addCase(getCategoryById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.singleCategory = payload;
    });

    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload as IErorrResponseData;
    });

    /*************************************************************************
     *                           CREATE CATEGORY                             *
     ************************************************************************/
    builder.addCase(cuCategory.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });

    builder.addCase(cuCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(cuCategory.rejected, (state, action) => {
      // console.log("Error on rejected", action.payload);
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload as IErorrResponseData;
    });
  },
});

export const { setCategories, clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
