//  * subjectsSlice
//  *
//  * This file defines a Redux slice for managing the state of subjects in the application.
//  * It uses Redux Toolkit's `createSlice` to simplify the creation of actions and reducers.
//  *

import { createSlice } from "@reduxjs/toolkit"

let nextSubjectId = 1

const initialState = {
    subjects: [
        { id: nextSubjectId++, name: 'Mathematics', teacherIds: [1, 4, 5] },
        { id: nextSubjectId++, name: 'Science', teacherIds: [1, 3, 5] },
        { id: nextSubjectId++, name: 'History', teacherIds: [2, 3, 5] },
    ],
}

export const subjectsSlice = createSlice({
    name: "subjects",
    initialState,
    reducers: {
        addSubject: (state, action) => {
            const { name, teacherIds } = action.payload
            if (!state.subjects.find((subject) => subject.name === name)) {
                const newSubject = { id: nextSubjectId++, name, teacherIds: teacherIds || [] }
                state.subjects = [newSubject, ...state.subjects]
            }
        },
        updateSubject: (state, action) => {
            const { id, name } = action.payload
            const subject = state.subjects.find((subject) => subject.id === id)
            if (subject) {
                subject.name = name
            }
        },
        deleteSubject: (state, action) => {
            const { id } = action.payload
            state.subjects = state.subjects.filter((subject) => subject.id !== id)
        },
        removeTeacherFromSubjects: (state, action) => {
            const { teacherId } = action.payload
            state.subjects.forEach((subject) => {
                subject.teacherIds = subject.teacherIds.filter(id => id !== teacherId)
            });
        },
        updateSubjectTeacherByTeacher: (state, action) => {
            const { teacherId, subjectIds } = action.payload;
            state.subjects.forEach((subject) => {
                if (subjectIds.includes(subject.id)) {
                    if (!subject.teacherIds.includes(teacherId)) {
                        subject.teacherIds.push(teacherId)
                    }
                } else {
                    subject.teacherIds = subject.teacherIds.filter(id => id !== teacherId)
                }
            });
        },
        updateSubjectTeacherByTeacherAdd: (state, action) => {
            const { teacherId, subjectIds } = action.payload;
            state.subjects.forEach((subject) => {
                if (subjectIds.includes(subject.id)) {
                    if (subject.teacherIds) { 
                        if (!subject.teacherIds.includes(teacherId)) {
                            subject.teacherIds.push(teacherId)
                        }
                    } else {
                        subject.teacherIds = [teacherId]
                    }
                }
            });
        },
        addTeacherToSubject: (state, action) => {
            const { subjectId, teacherId } = action.payload
            const subject = state.subjects.find((subject) => subject.id === subjectId)
            if (subject && !subject.teacherIds.includes(teacherId)) {
                subject.teacherIds.push(teacherId)
            }
            return state
        },
        removeTeacherFromSubject: (state, action) => {
            const { subjectId, teacherId } = action.payload
            const subject = state.subjects.find((subject) => subject.id === subjectId)
            if (subject) {
                subject.teacherIds = subject.teacherIds.filter((id) => id !== teacherId)
            }
        },
    },
});

export const {
    addSubject,
    updateSubject,
    deleteSubject,
    removeTeacherFromSubjects,
    updateSubjectTeacherByTeacher,
    updateSubjectTeacherByTeacherAdd,
    addTeacherToSubject,
    removeTeacherFromSubject,
} = subjectsSlice.actions

export default subjectsSlice.reducer