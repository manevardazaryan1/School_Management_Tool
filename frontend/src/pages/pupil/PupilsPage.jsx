import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePupil, deletePupil } from '../../redux/slices/pupilsSlice';
import {
    List,
    ListItem,
    Button,
} from '@mui/material';
import ConfirmDeletePupil from '../../components/pupil/DeleteConfirmationDialog';
import UpdatePupilModal from '../../components/pupil/UpdatePupilDialog';

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

    const handleDeletePupil = (id) => {
        setPupilToDelete(id);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        dispatch(deletePupil({ id: pupilToDelete }));
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
        handleCloseModal();
    };

    const handleGradeChange = (subject, value) => {
        const newValue = Math.max(0, Math.min(100, Number(value)));
        setUpdatedGrades((prevGrades) => ({ ...prevGrades, [subject]: newValue }));
    };

    return (
        <div>
            <h2>Pupils</h2>
            <List>
                {pupils.map((pupil) => (
                    <ListItem key={pupil.id} secondaryAction={
                        <div>
                            <Button onClick={() => handleOpenModal(pupil)} size="small" color="primary">Edit</Button>
                            <Button onClick={() => handleDeletePupil(pupil.id)} size="small" color="secondary">Delete</Button>
                        </div>
                    }>
                        {pupil.name} - {pupil.advancedSubject} - {
                            subjects.map((subject) => {
                                return `${subject.name} - ${pupil.grades[subject.name] || 0}`
                            })
                        }
                        {pupil.preference}
                    </ListItem>
                ))}
            </List>

            <UpdatePupilModal
                open={openModal}
                onClose={handleCloseModal}
                selectedPupil={selectedPupil}
                updatedName={updatedName}
                setUpdatedName={setUpdatedName}
                updatedGrades={updatedGrades}
                setUpdatedGrades={setUpdatedGrades}
                updatedPreference={updatedPreference}
                setUpdatedPreference={setUpdatedPreference}
                subjects={subjects}
                handleUpdatePupil={handleUpdatePupil}
                handleGradeChange={handleGradeChange}
            />

            <ConfirmDeletePupil
                open={deleteConfirmationOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                pupilName={pupils.find((pupil) => pupil.id === pupilToDelete)?.name || ''}
            />
        </div>
    );
}

export default PupilsPage;