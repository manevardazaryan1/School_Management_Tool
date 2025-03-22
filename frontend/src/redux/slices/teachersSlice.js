// src/redux/slices/teachersSlice.js
import { createSlice } from '@reduxjs/toolkit';

let nextTeacherId = 1;

const initialState = {
    teachers: [
        { id: nextTeacherId++, userId: 2, name: 'Mr. Smith', subjectIds: [1, 2] }, // Math and Science
        { id: nextTeacherId++, userId: null, name: 'Ms. Johnson', subjectIds: [3] }, // History
    ],
};

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        addTeacher: (state, action) => {
            const { name, userId } = action.payload;
            const newTeacher = { id: nextTeacherId++, subjectIds: [], name, userId };
            state.teachers.push(newTeacher);
            return state;
        },
        updateTeacher: (state, action) => {
            const { id, name, subjectIds } = action.payload;
            const teacher = state.teachers.find((teacher) => teacher.id === id);
            if (teacher) {
                teacher.name = name;
                teacher.subjectIds = subjectIds || [];
            }
            return state;
        },
        deleteTeacher: (state, action) => {
            const { id } = action.payload;
            state.teachers = state.teachers.filter((teacher) => teacher.id !== id);
            return state;
        },
    },
});

export const { addTeacher, updateTeacher, deleteTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;