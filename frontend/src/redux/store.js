// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'; // Change import
import { thunk } from 'redux-thunk';
import authReducer from './slices/authSlice';
import teachersReducer from './slices/teachersSlice';
import pupilsReducer from './slices/pupilsSlice';
import adminsReducer from './slices/adminsSlice';
import subjectsReducer  from './slices/subjectsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    pupils: pupilsReducer,
    admins: adminsReducer,
    subjects: subjectsReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), //apply middleware
});

export default store;