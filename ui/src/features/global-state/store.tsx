import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "@/features/global-state/reducers/auth";
import guiReducer from "@/features/global-state/reducers/gui";
import dashboardReducer from "@/features/global-state/reducers/dashboard";
import productReducer from "@/features/global-state/reducers/product";
import categoryReducer from "@/features/global-state/reducers/category";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gui: guiReducer,
    dashboard: dashboardReducer,
    product: productReducer,
    category: categoryReducer,
  },
  devTools: true,
});

const makeStore = () => store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
