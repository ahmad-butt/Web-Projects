import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';
import userReducer from '../features/user/userSlice';
import detailReducer from '../features/movie/movieSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
    detail: detailReducer,
  },
});
