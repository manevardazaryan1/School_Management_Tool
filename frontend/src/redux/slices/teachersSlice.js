import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachers: [],
};

export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
  },
});

export const { addTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;