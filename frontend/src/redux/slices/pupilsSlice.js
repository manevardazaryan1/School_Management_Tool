// src/redux/slices/pupilsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { calculateAdvancedSubject } from '../../utils/helpers';

let nextPupilId = 1;

const initialState = {
  pupils: [
    {
      id: nanoid(),
      name: 'Alice Johnson',
      grades: {
        Mathematics: 85,
        Science: 92,
        History: 78,
      },
      preference: 'Mathematics',
      advancedSubject: 'Mathematics',
    },
  ],
};

export const pupilsSlice = createSlice({
  name: 'pupils',
  initialState,
  reducers: {
    addPupil: (state, action) => {
      const { name, grades = null, preference = null, subjects = null } = action.payload;
      state.pupils.push({ id: nextPupilId++, name, grades, preference, advancedSubject: calculateAdvancedSubject(grades, preference, subjects) });
    },
    deletePupil: (state, action) => {
      const { id } = action.payload;
      state.pupils = state.pupils.filter((pupil) => pupil.id !== id);
    },
    updatePupil: (state, action) => {
      const { id, name, grades, preference, subjectsList } = action.payload;
      const pupilIndex = state.pupils.findIndex((pupil) => pupil.id === id);

      if (pupilIndex !== -1) {
          state.pupils[pupilIndex] = {
              ...state.pupils[pupilIndex],
              name,
              grades,
              preference,
              advancedSubject: calculateAdvancedSubject(grades, preference, subjectsList)
          };
      }
  },
  },
});

export const { addPupil, updatePupil, deletePupil } = pupilsSlice.actions;

export default pupilsSlice.reducer;