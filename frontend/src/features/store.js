import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './products/productsSlice'
import { productsApi } from './products/productsApi'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
