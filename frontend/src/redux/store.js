// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teachersReducer from './slices/teachersSlice';
import pupilsReducer from './slices/pupilsSlice';
import adminsReducer from './slices/adminsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    pupils: pupilsReducer,
    admins: adminsReducer,
  },
});

export default store;