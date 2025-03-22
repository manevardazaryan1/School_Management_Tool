// src/redux/slices/subjectsSlice.js
import { createSlice } from '@reduxjs/toolkit';

let nextSubjectId = 1;

const initialState = {
    subjects: [
        { id: nextSubjectId++, name: 'Mathematics', teacherIds: [1] },
        { id: nextSubjectId++, name: 'Science', teacherIds: [1] },
        { id: nextSubjectId++, name: 'History', teacherIds: [2] },
    ],
};

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        addSubject: (state, action) => {
            const { name, teacherIds } = action.payload;
            const newSubject = { id: nextSubjectId++, name, teacherIds: teacherIds || [] };
            state.subjects.push(newSubject);
            return state;
        },
        updateSubject: (state, action) => {
            const { id, name, teacherIds } = action.payload;
            const subject = state.subjects.find((subject) => subject.id === id);
            if (subject) {
                subject.name = name;
                subject.teacherIds = teacherIds;
            }
            return state;
        },
        deleteSubject: (state, action) => {
            const { id } = action.payload;
            state.subjects = state.subjects.filter((subject) => subject.id !== id);
            return state;
        },
        removeTeacherFromSubjects: (state, action) => {
            const { teacherId } = action.payload;
            state.subjects.forEach((subject) => {
                subject.teacherIds = subject.teacherIds.filter(id => id !== teacherId);
            });
            return state;
        },
        updateSubjectTeacherByTeacher: (state, action) => {
            const { teacherId, subjectIds } = action.payload;
            state.subjects.forEach((subject) => {
                if (subjectIds.includes(subject.id)) {
                    if (!subject.teacherIds.includes(teacherId)) {
                        subject.teacherIds.push(teacherId);
                    }
                } else {
                    subject.teacherIds = subject.teacherIds.filter(id => id !== teacherId);
                }
            });
            return state;
        },
        updateSubjectTeacherByTeacherAdd: (state, action) => {
            const { teacherId, subjectIds } = action.payload;
            state.subjects.forEach((subject) => {
                if (subjectIds.includes(subject.id)) {
                    if (subject.teacherIds) { // Add this check
                        if (!subject.teacherIds.includes(teacherId)) {
                            subject.teacherIds.push(teacherId);
                        }
                    } else {
                        subject.teacherIds = [teacherId]; // if teacherIds is undefined, initialize it with the teacherId
                    }
                }
            });
            return state;
        },
        addTeacherToSubject: (state, action) => {
            const { subjectId, teacherId } = action.payload;
            const subject = state.subjects.find((subject) => subject.id === subjectId);
            if (subject && !subject.teacherIds.includes(teacherId)) {
                subject.teacherIds.push(teacherId);
            }
            return state;
        },
        removeTeacherFromSubject: (state, action) => {
            const { subjectId, teacherId } = action.payload;
            const subject = state.subjects.find((subject) => subject.id === subjectId);
            if (subject) {
                subject.teacherIds = subject.teacherIds.filter((id) => id !== teacherId);
            }
            return state;
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
} = subjectsSlice.actions;

export default subjectsSlice.reducer;