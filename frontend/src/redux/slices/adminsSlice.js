//  * adminsSlice
//  *
//  * This file defines a Redux slice for managing the state of administrators in the application.
//  * It uses Redux Toolkit's `createSlice` to simplify the creation of actions and reducers.
//  *

import { createSlice } from "@reduxjs/toolkit"


let nextAdminId = 1

const initialState = {
  admins: [
      { id: nextAdminId++, 
        userId: 1, name: "AdminName", 
        email: "admin@example.com", 
        password: "Admin_12345", 
        role: "admin" },
    ],
}

export const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      nextAdminId++
      state.admins.push({...action.payload, nextAdminId})
    },
  },
})

export const { addAdmin } = adminsSlice.actions
export default adminsSlice.reducer