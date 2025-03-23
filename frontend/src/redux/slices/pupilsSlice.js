//  * pupilsSlice
//  *
//  * This file defines a Redux slice for managing the state of pupils in the application.
//  * It uses Redux Toolkit's `createSlice` to simplify the creation of actions and reducers.
//  * It also imports a helper function `calculateAdvancedSubject` to determine the advanced subject
//  * for each pupil based on their grades and preferences.
//  *
 
import { createSlice } from "@reduxjs/toolkit"
import { calculateAdvancedSubject } from "../../utils/helpers"

let nextPupilId = 1

const initialState = {
  pupils: [
    {
      id: nextPupilId++,
      userId: 7,
      name: "Alice Johnson",
      grades: {
        Mathematics: 85,
        Science: 92,
        History: 78,
      },
      preference: "History",
      advancedSubject: "History",
    },

    {
      id: nextPupilId++,
      userId: 8,
      name: "Emma Brown",
      grades: {
        Mathematics: 82,
        Science: 86,
        History: 98,
      },
      preference: "Mathematics",
      advancedSubject: "Mathematics",
    },
  ],
}

export const pupilsSlice = createSlice({
  name: "pupils",
  initialState,
  reducers: {
    addPupil: (state, action) => {
      const { name, userId } = action.payload
      state.pupils.push({ id: nextPupilId++, name, userId, grades: {}, preference: "", advancedSubject: "" })
    },
    deletePupil: (state, action) => {
      const { id } = action.payload
      state.pupils = state.pupils.filter((pupil) => pupil.id !== id)
    },
    updatePupil: (state, action) => {
      const { id, name, grades, preference, subjectsList } = action.payload
      const pupilIndex = state.pupils.findIndex((pupil) => pupil.id === id)

      if (pupilIndex !== -1) {
          state.pupils[pupilIndex] = {
              ...state.pupils[pupilIndex],
              name,
              grades,
              preference,
              advancedSubject: calculateAdvancedSubject(grades, preference, subjectsList)
          }
      }
  },
  },
})

export const { addPupil, updatePupil, deletePupil } = pupilsSlice.actions

export default pupilsSlice.reducer