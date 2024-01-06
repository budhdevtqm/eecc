import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import homeReducer from "./homeSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import profileReducer from './profileSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    category: categoryReducer,
    product: productReducer,
    home: homeReducer,
    cart: cartReducer,
    order: orderReducer,
    profile: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
