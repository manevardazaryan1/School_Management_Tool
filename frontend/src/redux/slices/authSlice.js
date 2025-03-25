//  * authSlice
//  *
//  * This file defines a Redux slice for managing user authentication and related state.
//  * It uses Redux Toolkit's `createSlice` to simplify the creation of actions and reducers.
//  * It also includes asynchronous actions for handling user registration and dispatching user data
//  * to other slices based on the user's role.
//  *

import { createSlice } from "@reduxjs/toolkit"
import { addTeacher } from "./teachersSlice"
import { addPupil } from "./pupilsSlice"
import { addAdmin } from "./adminsSlice"

let nextUserId = 0

const initialState = {
  users: [
    { id: nextUserId++, name: "Mane", email: "mane@gmail.com", password: "Admin_12345", role: "admin" },
    { id: nextUserId++, name: "Mr. Smith", email: "smith@example.com", password: "Smith_12345", role: "teacher" },
    { id: nextUserId++, name: "Ms. Liam", email: "liam@example.com", password: "Liam_12345", role: "teacher" },
    { id: nextUserId++, name: "Mr. James", email: "james@example.com", password: "James_12345", role: "teacher" },
    { id: nextUserId++, name: "Mr. Oliver", email: "oliver@example.com", password: "Oliver_12345", role: "teacher" },
    { id: nextUserId++, name: "Ms. Johnson", email: "johnson@example.com", password: "Johnson_12345", role: "teacher" },
    { id: nextUserId++, name: "Alice Johnson", email: "alice@example.com", password: "Alice_12345", role: "pupil" },
    { id: nextUserId++, name: "Emma Brown", email: "emma@example.com", password: "Emma_12345", role: "pupil" },
  ],
  currentUser: null,
  loginError: null,
  registerError: null,
}

let userExists = false

export const authSlice = createSlice({
  name: "auth",
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
        localStorage.setItem("currentUser", JSON.stringify(user))
      } else {
        state.currentUser = null
        state.loginError = "Invalid email or password."
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser")
    },
    loadStoredUser: (state) => {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        try {
          state.currentUser = JSON.parse(storedUser)
        } catch (error) {
          localStorage.removeItem("currentUser")
          state.currentUser = null
        }
      }
    },
    register: (state, action) => {
      const { name, email, password, role, } = action.payload;

      const existingUser = state.users.find((user) => user.email === email)
      if (existingUser) {
        state.registerError = "Email already in use."
        userExists = true
        return;
      }
      const newUser = {
        id: ++nextUserId,
        name,
        email,
        password,
        role,
      };

      state.users.push(newUser);
      state.currentUser = newUser
      state.registerError = null;
      localStorage.setItem('currentUser', JSON.stringify(newUser))

    },
    clearRegisterError: (state) => {
      state.registerError = null
    },
    updateUser: (state, action) => {
      const { userId, name } = action.payload
      const userIndex = state.users.findIndex(user => user.id === userId)
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          name,
        }
      }
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload
      state.users = state.users.filter(user => user.id !== idToDelete)
      if(state.currentUser && state.currentUser.id === idToDelete){
        localStorage.removeItem("currentUser")
        state.currentUser = null
      }
    },
  },
});

export const { login, logout, loadStoredUser, register, clearRegisterError, updateUser, deleteUser } =
  authSlice.actions


export const registerAndDispatch = (userData) => (dispatch) => {
    dispatch(authSlice.actions.register(userData))
  
    if (userExists) return
    
    if (userData.role.toUpperCase() === "TEACHER") {
      dispatch(addTeacher({...userData, userId: nextUserId}))
    } else if (userData.role.toUpperCase() === "PUPIL") {
      dispatch(addPupil({...userData, userId: nextUserId}))
    } else if (userData.role.toUpperCase() === "ADMIN") {
      dispatch(addAdmin({...userData, userId: nextUserId}))
    }
}
  
export default authSlice.reducer