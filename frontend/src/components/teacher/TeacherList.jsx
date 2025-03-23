// src/components/teacher/TeacherList.js
import React from 'react';
import { List } from '@mui/material';
import TeacherListItem from './TeacherListItem';

function TeacherList({ paginatedTeachers, subjects, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    return (
        <List className="items-list">
            {paginatedTeachers.map((teacher) => (
                <TeacherListItem
                    key={teacher.id}
                    teacher={teacher}
                    subjects={subjects}
                    handleOpenUpdateDialog={handleOpenUpdateDialog}
                    handleOpenDeleteConfirm={handleOpenDeleteConfirm}
                />
            ))}
        </List>
    );
}

export default TeacherList;