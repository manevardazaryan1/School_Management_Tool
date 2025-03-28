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
      preference: {id: 3, name: "History"},
      advancedSubject: {id: 3, name: "History"},
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
      preference: {id: 1, name: "Mathematics"},
      advancedSubject: {id: 1, name: "Mathematics"},
    },
  ],
}

export const pupilsSlice = createSlice({
  name: "pupils",
  initialState,
  reducers: {
    addPupil: (state, action) => {
      const { name, userId, subjects } = action.payload
      console.log(subjects)
      const grades = {}
      subjects.forEach((subject) => {
        grades[subject.name] = 0
      })

      state.pupils.push({ id: nextPupilId++, 
        name, userId,       
        grades: grades,
        preference: {}, advancedSubject: {} })
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
              preference: subjectsList.find((subject) => subject.name === preference) || {},
              advancedSubject: calculateAdvancedSubject(grades, preference, subjectsList) || {}
          }
      }
    },
    updatePupilBySubjectDelete: (state, action) => {
      const subjectName = action.payload
      state.pupils.forEach((pupil) => {
        if (pupil.advancedSubject.name === subjectName) {
          pupil.advancedSubject = {}
        }

        if (pupil.preference.name === subjectName) {
          pupil.preference = {}
        }

        delete pupil.grades[subjectName]
      })
    },
    updatePupilBySubjectUpdate: (state, action) => {
      const { subjectId, prevName, newName } = action.payload
      
      state.pupils.forEach((pupil) => {
        if (pupil.preference.id === subjectId) {
          pupil.preference.name = newName
        }

        if (pupil.advancedSubject.id === subjectId) {
          pupil.advancedSubject.name = newName
        }

        pupil.grades[newName] = pupil.grades[prevName]
        delete pupil.grades[prevName]
      })
    }
  },
})

export const { addPupil, 
  updatePupil,
  deletePupil, 
  updatePupilBySubjectDelete, 
  updatePupilBySubjectUpdate } = pupilsSlice.actions

export default pupilsSlice.reducer