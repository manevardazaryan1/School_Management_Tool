import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admins: [],
};

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
  },
});

export const { addAdmin } = adminsSlice.actions;
export default adminsSlice.reducer;