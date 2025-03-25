//  * teachersSlice
//  *
//  * This file defines a Redux slice for managing the state of teachers in the application.
//  * It uses Redux Toolkit's `createSlice` to simplify the creation of actions and reducers.
//  *

import { createSlice } from "@reduxjs/toolkit"

let nextTeacherId = 1

const initialState = {
    teachers: [
        { id: nextTeacherId++, userId: 2, name: "Mr. Smith", subjectIds: [1, 2] },
        { id: nextTeacherId++, userId: 3, name: "Ms. Liam", subjectIds: [3] },
        { id: nextTeacherId++, userId: 4, name: "Mr. James", subjectIds: [2, 3] },
        { id: nextTeacherId++, userId: 5, name: "Mr. Oliver", subjectIds: [1] },
        { id: nextTeacherId++, userId: 6, name: "Ms. Johnson", subjectIds: [1, 2, 3] },
    ],
}

export const teachersSlice = createSlice({
    name: "teachers",
    initialState,
    reducers: {
        addTeacher: (state, action) => {
            const { name, userId } = action.payload
            const newTeacher = { id: nextTeacherId++, subjectIds: [], name, userId }
            state.teachers.push(newTeacher)
            return state
        },
        updateTeacher: (state, action) => {
            const { id, name, subjectIds } = action.payload
            const teacher = state.teachers.find((teacher) => teacher.id === id)
            if (teacher) {
                teacher.name = name
                teacher.subjectIds = subjectIds || []
            }
            return state
        },
        deleteTeacher: (state, action) => {
            const { id } = action.payload
            state.teachers = state.teachers.filter((teacher) => teacher.id !== id)
            return state
        },
        updateTeacherBySubjectDelete: (state, action) => {
            const subjectId = action.payload
            state.teachers.forEach((teacher) => {
                teacher.subjectIds = teacher.subjectIds.filter((id) => id !== subjectId)
            })
        }
    },
})

export const { addTeacher, updateTeacher, deleteTeacher, updateTeacherBySubjectDelete } = teachersSlice.actions
export default teachersSlice.reducer