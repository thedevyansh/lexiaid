import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import ttfReducer from './slices/ttfSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    ttf: ttfReducer
  },
});
