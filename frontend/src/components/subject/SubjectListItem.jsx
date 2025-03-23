// src/components/subject/SubjectListItem.js
import React from 'react';
import { ListItem, ListItemText, Box, Button } from '@mui/material';

function SubjectListItem({ subject, teachers, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    const teacherNames = subject.teacherIds && subject.teacherIds.length > 0
        ? subject.teacherIds
            .map(teacherId => teachers.find(teacher => teacher.id === teacherId)?.name)
            .filter(Boolean)
            .join(', ')
        : 'No Teacher';

    return (
        <ListItem className="list-item" key={subject.id}>
            <ListItemText primary={`${subject.name} (Teacher: ${teacherNames})`} />
            <Box className="buttons">
                <Button onClick={() => handleOpenUpdateDialog(subject)} size="small">Update</Button>
                <Button onClick={() => handleOpenDeleteConfirm(subject)} size="small" color="secondary">Delete</Button>
            </Box>
        </ListItem>
    );
}

export default SubjectListItem;