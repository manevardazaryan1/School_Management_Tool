// src/components/SubjectsPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { addSubject, updateSubject, deleteSubject } from '../../redux/slices/subjectsSlice';
import { TextField, Button, Box, Typography } from '@mui/material';
import UpdateSubjectDialog from '../../components/subject/UpdateSubjectDialog';
import DeleteConfirmationDialog from '../../components/subject/DeleteConfirmationDialog';
import SubjectList from '../../components/subject/SubjectList';
import SubjectFilters from '../../components/subject/SubjectFilters';
import SubjectPagination from '../../components/subject/SubjectPagination';
import "./SubjectsPage.css"

function SubjectsPage() {
    const subjects = useSelector((state) => state.subjects.subjects);
    const teachers = useSelector((state) => state.teachers.teachers);
    const dispatch = useDispatch();
    const [newSubjectName, setNewSubjectName] = useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [subjectToUpdate, setSubjectToUpdate] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);
    const [filterName, setFilterName] = useState('');
    const [page, setPage] = useState(1);
    const subjectsPerPage = 1;

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(filterName.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);
    const paginatedSubjects = filteredSubjects.slice((page - 1) * subjectsPerPage, page * subjectsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
        <Box className="subjects-page-container">
            <Typography variant="h2" component="h2" className="page-title">Subjects</Typography>
            <Box className="add-subject-form">
                <TextField label="New Subject" value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} className="add-subject-input" />
                <Button onClick={handleAddSubject} variant="contained" color="primary" className="add-subject-button">Add Subject</Button>
            </Box>
            <SubjectFilters filterName={filterName} setFilterName={setFilterName} />
            <SubjectList
                paginatedSubjects={paginatedSubjects}
                teachers={teachers}
                handleOpenUpdateDialog={handleOpenUpdateDialog}
                handleOpenDeleteConfirm={handleOpenDeleteConfirm}
            />
            <SubjectPagination
                totalPages={totalPages}
                page={page}
                handlePageChange={handlePageChange}
            />
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
        </Box>
    );
}

export default SubjectsPage;