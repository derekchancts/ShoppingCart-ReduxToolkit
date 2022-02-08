import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './products/productsSlice'
import { productsApi } from './products/productsApi'
import cartReducer  from './products/cartSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
