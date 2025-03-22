// src/components/TeachersPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTeacher, updateTeacher, deleteTeacher } from '../../redux/slices/teachersSlice';
import {
    removeTeacherFromSubjects,
    updateSubjectTeacherByTeacher,
    updateSubjectTeacherByTeacherAdd,
    addTeacherToSubject,
    removeTeacherFromSubject,
} from '../../redux/slices/subjectsSlice';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import UpdateTeacherDialog from '../../components/teacher/UpdateTeacherDialog';
import DeleteConfirmationDialog from '../../components/teacher/DeleteConfirmationDialog';

function TeachersPage() {
    const teachers = useSelector((state) => state.teachers.teachers);
    const subjects = useSelector((state) => state.subjects.subjects);
    const dispatch = useDispatch();
    const [newTeacherSubjects, setNewTeacherSubjects] = useState([]);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [teacherToUpdate, setTeacherToUpdate] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    const handleOpenUpdateDialog = (teacher) => {
        setTeacherToUpdate(teacher);
        setUpdateDialogOpen(true);
    };

    const handleUpdateTeacher = (updatedName, updatedSubjects) => {
        const { removedSubjects, addedSubjects } = getSubjectChanges(teacherToUpdate.subjectIds, updatedSubjects);

        dispatch(updateTeacher({ id: teacherToUpdate.id, name: updatedName, subjectIds: updatedSubjects }));
        dispatch(updateSubjectTeacherByTeacher({ teacherId: teacherToUpdate.id, subjectIds: updatedSubjects }));

        removedSubjects.forEach((subjectId) => {
            dispatch(removeTeacherFromSubject({ subjectId, teacherId: teacherToUpdate.id }));
        });
        addedSubjects.forEach((subjectId) => {
            dispatch(addTeacherToSubject({ subjectId, teacherId: teacherToUpdate.id }));
        });

        setUpdateDialogOpen(false);
    };

    const handleOpenDeleteConfirm = (teacher) => {
        setTeacherToDelete(teacher);
        setDeleteDialogOpen(true);
    };

    const handleDeleteTeacherConfirm = () => {
        dispatch(removeTeacherFromSubjects({ teacherId: teacherToDelete.id }));
        dispatch(deleteTeacher({ id: teacherToDelete.id }));
        setDeleteDialogOpen(false);
    };

    // const handleSubjectChange = (subjectId) => {
    //     if (newTeacherSubjects.includes(subjectId)) {
    //         setNewTeacherSubjects(newTeacherSubjects.filter((id) => id !== subjectId));
    //     } else {
    //         setNewTeacherSubjects([...newTeacherSubjects, subjectId]);
    //     }
    // };

    const handleUpdateSubjectChange = (subjectId) => {
        if (teacherToUpdate?.subjectIds.includes(subjectId)) {
            setTeacherToUpdate({
                ...teacherToUpdate,
                subjectIds: teacherToUpdate.subjectIds.filter((id) => id !== subjectId),
            });
        } else {
            setTeacherToUpdate({
                ...teacherToUpdate,
                subjectIds: [...(teacherToUpdate?.subjectIds || []), subjectId],
            });
        }
    };

    const getSubjectChanges = (oldSubjects, newSubjects) => {
        const removedSubjects = oldSubjects.filter(id => !newSubjects.includes(id));
        const addedSubjects = newSubjects.filter(id => !oldSubjects.includes(id));
        return { removedSubjects, addedSubjects };
    };

    return (
        <div>
            <h2>Teachers</h2>
            <List>
                {teachers.map((teacher) => (
                    <ListItem key={teacher.id}>
                        <ListItemText
                            primary={teacher.name}
                            secondary={`Subjects: ${teacher.subjectIds
                                .map((id) => subjects.find((subject) => subject.id === id)?.name)
                                .join(', ') || 'None'}`}
                        />
                        <Button onClick={() => handleOpenUpdateDialog(teacher)} size="small">
                            Update
                        </Button>
                        <Button onClick={() => handleOpenDeleteConfirm(teacher)} size="small" color="secondary">
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
            <UpdateTeacherDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                teacher={teacherToUpdate}
                subjects={subjects}
                onUpdate={handleUpdateTeacher}
                onSubjectChange={handleUpdateSubjectChange}
            />
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                item={teacherToDelete}
                itemName="teacher"
                onConfirm={handleDeleteTeacherConfirm}
            />
        </div>
    );
}

export default TeachersPage;