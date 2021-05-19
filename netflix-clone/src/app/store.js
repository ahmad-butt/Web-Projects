import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter1/counterSlice';
import movieReducer from '../features/movie/movieSlice';
import userReducer from '../features/user/userSlice';
import detailReducer from '../features/movie/movieSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movie: movieReducer,
    user: userReducer,
    detail: detailReducer,
  },
});
