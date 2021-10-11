import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productReducers';
import userReducer from '../reducers/userReducers';

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    },
  });