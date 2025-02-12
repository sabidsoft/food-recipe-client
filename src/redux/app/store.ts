import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apiSlice/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares({ serializableCheck: false }).concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
