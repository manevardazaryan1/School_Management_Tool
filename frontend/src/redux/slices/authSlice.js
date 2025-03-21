// src/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { addTeacher } from './teachersSlice';
import { addPupil } from './pupilsSlice';
import { addAdmin } from './adminsSlice';

const initialState = {
  users: [
    { id: 1, email: 'user1@example.com', password: 'password1', role: 'admin' },
    { id: 2, email: 'user2@example.com', password: 'password2', role: 'teacher' },
    { id: 3, email: 'user3@example.com', password: 'password3', role: 'pupil' },
  ],
  currentUser: null,
  loginError: null,
  registerError: null,
};

let nextUserId = 4; // Initialize a unique ID for new users

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        state.currentUser = user;
        state.loginError = null;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        state.currentUser = null;
        state.loginError = 'Invalid email or password.';
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    loadStoredUser: (state) => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          state.currentUser = JSON.parse(storedUser);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('currentUser'); // Clear invalid data
          state.currentUser = null;
        }
      }
    },
    register: (state, action) => {
      const { email, password, role, dispatch } = action.payload;

      const existingUser = state.users.find((user) => user.email === email);
      if (existingUser) {
        state.registerError = 'Email already in use.';
        return;
      }
      const newUser = {
        id: nextUserId++,
        email,
        password,
        role,
      };

      state.users.push(newUser);
      state.currentUser = newUser
      state.registerError = null;
      localStorage.setItem('currentUser', JSON.stringify(newUser)); //save to localstorage

      // Dispatch role-specific actions
      if (role.toUpperCase() === 'TEACHER') {
        dispatch(addTeacher(newUser));
      } else if (role.toUpperCase() === 'PUPIL') {
        dispatch(addPupil(newUser));
      } else if (role.toUpperCase() === 'ADMIN') {
        dispatch(addAdmin(newUser));
      }
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
  },
});

export const { login, logout, loadStoredUser, register, clearRegisterError } =
  authSlice.actions;

export default authSlice.reducer;