import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pupils: [],
};

export const pupilsSlice = createSlice({
  name: 'pupils',
  initialState,
  reducers: {
    addPupil: (state, action) => {
      state.pupils.push(action.payload);
    },
  },
});

export const { addPupil } = pupilsSlice.actions;
export default pupilsSlice.reducer;