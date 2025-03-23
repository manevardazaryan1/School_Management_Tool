// src/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { addTeacher } from './teachersSlice';
import { addPupil } from './pupilsSlice';
import { addAdmin } from './adminsSlice';

const initialState = {
  users: [
    { id: 1, name: "user1", email: 'user1@example.com', password: 'password1', role: 'admin' },
    { id: 2, name: "user2", email: 'user2@example.com', password: 'password2', role: 'teacher' },
    { id: 3, name: "user3", email: 'user3@example.com', password: 'password3', role: 'pupil' },
  ],
  currentUser: null,
  loginError: null,
  registerError: null,
};

let nextUserId = 4; // Initialize a unique ID for new users
let userExists = false

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
          localStorage.removeItem('currentUser'); // Clear invalid data
          state.currentUser = null;
        }
      }
    },
    register: (state, action) => {
      const { name, email, password, role, } = action.payload;

      const existingUser = state.users.find((user) => user.email === email);
      if (existingUser) {
        state.registerError = 'Email already in use.';
        userExists = true
        return;
      }
      const newUser = {
        id: nextUserId++,
        name,
        email,
        password,
        role,
      };

      state.users.push(newUser);
      state.currentUser = newUser
      state.registerError = null;
      localStorage.setItem('currentUser', JSON.stringify(newUser)); //save to localstorage

    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    updateUser: (state, action) => {
      const { userId, name } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          name,
        };
      }
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload;
      state.users = state.users.filter(user => user.id !== idToDelete);
      if(state.currentUser && state.currentUser.id === idToDelete){
        localStorage.removeItem('currentUser');
        state.currentUser = null;
      }
    },
  },
});

export const { login, logout, loadStoredUser, register, clearRegisterError, updateUser, deleteUser } =
  authSlice.actions;


export const registerAndDispatch = (userData) => (dispatch) => {
    dispatch(authSlice.actions.register(userData));
  
    if (userExists) return
    
    if (userData.role.toUpperCase() === 'TEACHER') {
      dispatch(addTeacher({...userData, userId: nextUserId - 1}));
    } else if (userData.role.toUpperCase() === 'PUPIL') {
      dispatch(addPupil({...userData, userId: nextUserId - 1}));
    } else if (userData.role.toUpperCase() === 'ADMIN') {
      dispatch(addAdmin({...userData, userId: nextUserId - 1}));
    }
};
  
export default authSlice.reducer;