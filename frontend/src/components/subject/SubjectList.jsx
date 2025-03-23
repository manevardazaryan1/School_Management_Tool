// src/components/subject/SubjectList.js
import React from 'react';
import { List } from '@mui/material';
import SubjectListItem from './SubjectListItem';

function SubjectList({ paginatedSubjects, teachers, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    return (
        <List className="items-list">
            {paginatedSubjects.map((subject) => (
                <SubjectListItem
                    key={subject.id}
                    subject={subject}
                    teachers={teachers}
                    handleOpenUpdateDialog={handleOpenUpdateDialog}
                    handleOpenDeleteConfirm={handleOpenDeleteConfirm}
                />
            ))}
        </List>
    );
}

export default SubjectList;