// src/components/SubjectsPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSubject, updateSubject, deleteSubject } from '../../redux/slices/subjectsSlice';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
} from '@mui/material';
import UpdateSubjectDialog from '../../components/subject/UpdateSubjectDialog';
import DeleteConfirmationDialog from '../../components/subject/DeleteConfirmationDialog';

function SubjectsPage() {
    const subjects = useSelector((state) => state.subjects.subjects);
    const teachers = useSelector((state) => state.teachers.teachers);
    const dispatch = useDispatch();
    const [newSubjectName, setNewSubjectName] = useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [subjectToUpdate, setSubjectToUpdate] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const handleAddSubject = () => {
        if (newSubjectName.trim()) {
            dispatch(addSubject({ name: newSubjectName }));
            setNewSubjectName('');
        }
    };

    const handleOpenUpdateDialog = (subject) => {
        setSubjectToUpdate(subject);
        setUpdateDialogOpen(true);
    };

    const handleUpdateSubject = (updatedName) => {
        if (updatedName.trim()) {
            dispatch(updateSubject({ id: subjectToUpdate.id, name: updatedName }));
            setUpdateDialogOpen(false);
        }
    };

    const handleOpenDeleteConfirm = (subject) => {
        setSubjectToDelete(subject);
        setDeleteDialogOpen(true);
    };

    const handleDeleteSubjectConfirm = () => {
        dispatch(deleteSubject({ id: subjectToDelete.id }));
        setDeleteDialogOpen(false);
    };

    return (
        <div>
            <h2>Subjects</h2>
            <TextField label="New Subject" value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} />
            <Button onClick={handleAddSubject} variant="contained" color="primary">Add Subject</Button>
            <List>
                {subjects.map((subject) => (
                    <ListItem key={subject.id} secondaryAction={
                        <div>
                            <Button onClick={() => handleOpenUpdateDialog(subject)} size="small">Update</Button>
                            <Button onClick={() => handleOpenDeleteConfirm(subject)} size="small" color="secondary">Delete</Button>
                        </div>
                    }>
                        <ListItemText primary={
                            `${subject.name} (Teacher: ${
                                subject.teacherIds && subject.teacherIds.length > 0
                                    ? subject.teacherIds
                                        .map(teacherId => teachers.find(teacher => teacher.id === teacherId)?.name)
                                        .filter(Boolean)
                                        .join(', ')
                                    : 'No Teacher'
                            })`
                        } />
                    </ListItem>
                ))}
            </List>
            <UpdateSubjectDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                subject={subjectToUpdate}
                onUpdate={handleUpdateSubject}
            />
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                item={subjectToDelete}
                itemName="subject"
                onConfirm={handleDeleteSubjectConfirm}
            />
        </div>
    );
}

export default SubjectsPage;