// src/components/pupil/PupilsPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePupil, deletePupil } from '../../redux/slices/pupilsSlice';
import { Box, Typography } from '@mui/material';
import ConfirmDeletePupil from '../../components/pupil/DeleteConfirmationDialog';
import UpdatePupilModal from '../../components/pupil/UpdatePupilDialog';
import PupilList from '../../components/pupil/PupilList';
import PupilFilters from '../../components/pupil/PupilFilters';
import PupilPagination from '../../components/pupil/PupilPagination';
import "./PupilsPage.css"
import { updateUser, deleteUser } from '../../redux/slices/authSlice';

function PupilsPage() {
    const pupils = useSelector((state) => state.pupils.pupils);
    const subjects = useSelector((state) => state.subjects.subjects);
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [selectedPupil, setSelectedPupil] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedGrades, setUpdatedGrades] = useState({});
    const [updatedPreference, setUpdatedPreference] = useState('');
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [pupilToDelete, setPupilToDelete] = useState(null);

    const [filterName, setFilterName] = useState('');
    const [filterAdvancedSubject, setFilterAdvancedSubject] = useState('');
    const [filterGradeSubject, setFilterGradeSubject] = useState('');
    const [filterGradeValue, setFilterGradeValue] = useState('');
    const [filterPreference, setFilterPreference] = useState('');
    const [page, setPage] = useState(1);
    const pupilsPerPage = 5;

    const filteredPupils = pupils.filter(pupil => {
        const nameMatch = pupil.name.toLowerCase().includes(filterName.toLowerCase());
        const advancedSubjectMatch = filterAdvancedSubject
            ? pupil.advancedSubject.toLowerCase().includes(filterAdvancedSubject.toLowerCase())
            : true;
        const preferenceMatch = filterPreference
            ? pupil.preference.toLowerCase().includes(filterPreference.toLowerCase())
            : true;
        const gradeMatch = filterGradeSubject && filterGradeValue
            ? pupil.grades[subjects.find(s => s.id === parseInt(filterGradeSubject))?.name] === parseInt(filterGradeValue)
            : true;
        return nameMatch && advancedSubjectMatch && preferenceMatch && gradeMatch;
    });

    const totalPages = Math.ceil(filteredPupils.length / pupilsPerPage);
    const paginatedPupils = filteredPupils.slice((page - 1) * pupilsPerPage, page * pupilsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDeletePupil = (id) => {
        setPupilToDelete(id);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        dispatch(deletePupil({ id: pupilToDelete }));
        dispatch(deleteUser(pupils.find(pupil => pupil.id === pupilToDelete).userId))
        setDeleteConfirmationOpen(false);
        setPupilToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteConfirmationOpen(false);
        setPupilToDelete(null);
    };

    const handleOpenModal = (pupil) => {
        setSelectedPupil(pupil);
        setUpdatedName(pupil.name);
        setUpdatedGrades({ ...pupil.grades });
        setUpdatedPreference(pupil.preference);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPupil(null);
    };

    const handleUpdatePupil = () => {
        dispatch(updatePupil({
            id: selectedPupil.id,
            name: updatedName,
            grades: updatedGrades,
            preference: updatedPreference,
            subjectsList: subjects
        }));
        dispatch(updateUser({ userId: selectedPupil.userId, name: updatedName }))
        handleCloseModal();
    };

    const handleGradeChange = (subject, value) => {
        const newValue = Math.max(0, Math.min(100, Number(value)));
        setUpdatedGrades((prevGrades) => ({ ...prevGrades, [subject]: newValue }));
    };

    return (
        <Box className="pupils-page-container">
            <Typography variant="h2" component="h2" className="page-title">Pupils</Typography>
            <PupilFilters
                filterName={filterName} setFilterName={setFilterName}
                filterAdvancedSubject={filterAdvancedSubject} setFilterAdvancedSubject={setFilterAdvancedSubject}
                filterPreference={filterPreference} setFilterPreference={setFilterPreference}
                filterGradeSubject={filterGradeSubject} setFilterGradeSubject={setFilterGradeSubject}
                filterGradeValue={filterGradeValue} setFilterGradeValue={setFilterGradeValue}
                subjects={subjects}
            />
            <PupilList paginatedPupils={paginatedPupils} handleOpenModal={handleOpenModal} handleDeletePupil={handleDeletePupil} subjects={subjects} />
            <PupilPagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
            <UpdatePupilModal open={openModal} onClose={handleCloseModal} selectedPupil={selectedPupil} updatedName={updatedName} setUpdatedName={setUpdatedName} updatedGrades={updatedGrades} setUpdatedGrades={setUpdatedGrades} updatedPreference={updatedPreference} setUpdatedPreference={setUpdatedPreference} subjects={subjects} handleUpdatePupil={handleUpdatePupil} handleGradeChange={handleGradeChange} />
            <ConfirmDeletePupil open={deleteConfirmationOpen} onClose={cancelDelete} onConfirm={confirmDelete} pupilName={pupils.find((pupil) => pupil.id === pupilToDelete)?.name || ''} />
        </Box>
    );
}

export default PupilsPage;