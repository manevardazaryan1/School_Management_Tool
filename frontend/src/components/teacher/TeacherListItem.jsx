// src/components/teacher/TeacherListItem.js
import React from 'react';
import { ListItem, ListItemText, Box, Button } from '@mui/material';

function TeacherListItem({ teacher, subjects, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    return (
        <ListItem key={teacher.id} className="list-item">
            <ListItemText
                primary={teacher.name}
                secondary={`Subjects: ${teacher.subjectIds
                    .map((id) => subjects.find((subject) => subject.id === id)?.name)
                    .join(', ') || 'None'}`}
                className="subjects-list"
            />
            <Box className="buttons">
                <Button onClick={() => handleOpenUpdateDialog(teacher)} size="small">
                    Update
                </Button>
                <Button onClick={() => handleOpenDeleteConfirm(teacher)} size="small" color="secondary">
                    Delete
                </Button>
            </Box>
        </ListItem>
    );
}

export default TeacherListItem;