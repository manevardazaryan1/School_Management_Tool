//  * TeachersPage
//  *
//  * This component renders the Teachers page, displaying a list of teachers with update, delete,
//  * filtering, and pagination functionalities. It uses Redux for state management and Material-UI for UI components.
//  *

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTeacher, deleteTeacher } from "../../redux/slices/teachersSlice"
import {
    removeTeacherFromSubjects,
    updateSubjectTeacherByTeacher,
    addTeacherToSubject,
    removeTeacherFromSubject,
} from "../../redux/slices/subjectsSlice"
import { Box, Typography, Modal, Button } from "@mui/material"
import { updateUser, deleteUser } from "../../redux/slices/authSlice"
import UpdateTeacherDialog from "../../components/teacher/UpdateTeacherDialog"
import DeleteConfirmationDialog from "../../components/teacher/DeleteConfirmationDialog"
import TeacherList from "../../components/teacher/TeacherList"
import TeacherFilters from "../../components/teacher/TeacherFilters"
import TeacherPagination from "../../components/teacher/TeacherPagination"
import "./TeachersPage.css"


function TeachersPage() {
    const teachers = useSelector((state) => state.teachers.teachers)
    const subjects = useSelector((state) => state.subjects.subjects)
    const dispatch = useDispatch()
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [teacherToUpdate, setTeacherToUpdate] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [teacherToDelete, setTeacherToDelete] = useState(null)
    const [filterName, setFilterName] = useState("")
    const [filterSubject, setFilterSubject] = useState("")
    const [page, setPage] = useState(1)
    const teachersPerPage = 3
    const [openFilterModal, setOpenFilterModal] = useState(false)

    const handleOpenUpdateDialog = (teacher) => {
        setTeacherToUpdate(teacher)
        setUpdateDialogOpen(true)
    };

    const handleUpdateTeacher = (updatedName, updatedSubjects) => {
        const { removedSubjects, addedSubjects } = getSubjectChanges(teacherToUpdate.subjectIds, updatedSubjects)

        dispatch(updateTeacher({ id: teacherToUpdate.id, name: updatedName, subjectIds: updatedSubjects }))
        dispatch(updateSubjectTeacherByTeacher({ teacherId: teacherToUpdate.id, subjectIds: updatedSubjects }))
        dispatch(updateUser({ userId: teacherToUpdate.userId, name: updatedName}))

        removedSubjects.forEach((subjectId) => {
            dispatch(removeTeacherFromSubject({ subjectId, teacherId: teacherToUpdate.id }))
        });
        addedSubjects.forEach((subjectId) => {
            dispatch(addTeacherToSubject({ subjectId, teacherId: teacherToUpdate.id }))
        });

        setUpdateDialogOpen(false)
    };

    const handleOpenDeleteConfirm = (teacher) => {
        setTeacherToDelete(teacher)
        setDeleteDialogOpen(true)
    };

    const handleDeleteTeacherConfirm = () => {
        dispatch(removeTeacherFromSubjects({ teacherId: teacherToDelete.id }))
        dispatch(deleteTeacher({ id: teacherToDelete.id }))
        dispatch(deleteUser(teacherToDelete.userId))
        setDeleteDialogOpen(false)
    };

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
        const removedSubjects = oldSubjects.filter(id => !newSubjects.includes(id))
        const addedSubjects = newSubjects.filter(id => !oldSubjects.includes(id))
        return { removedSubjects, addedSubjects }
    }

    const filteredTeachers = teachers.filter(teacher => {
        const nameMatch = teacher.name.toLowerCase().includes(filterName.toLowerCase())
        const subjectMatch = filterSubject
            ? teacher.subjectIds.includes(parseInt(filterSubject))
            : true
        return nameMatch && subjectMatch
    })

    const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage)
    const paginatedTeachers = filteredTeachers.slice((page - 1) * teachersPerPage, page * teachersPerPage)

    const handlePageChange = (_, value) => {
        setPage(value)
    }

    const handleOpenFilterModal = () => {
        setOpenFilterModal(true)
    }

    const handleCloseFilterModal = () => {
        setOpenFilterModal(false)
    }

    return (
        <Box className="teachers-page-container">
            <Typography variant="h2" component="h2" className="page-title">Teachers</Typography>
            <Button onClick={handleOpenFilterModal} style={{margin: "auto", 
                display: "block", 
                marginRight: "20px", }}>
                Open Filters</Button>
            <Modal open={openFilterModal} onClose={handleCloseFilterModal} className="filter-modal">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <TeacherFilters
                        filterName={filterName}
                        setFilterName={setFilterName}
                        filterSubject={filterSubject}
                        setFilterSubject={setFilterSubject}
                        subjects={subjects}
                    />
                    <Button onClick={handleCloseFilterModal} color="primary" style={{backgroundColor: "#000", float: "right"}} >Close Filters</Button>
                </Box>
            </Modal>
            <TeacherList
                paginatedTeachers={paginatedTeachers}
                subjects={subjects}
                handleOpenUpdateDialog={handleOpenUpdateDialog}
                handleOpenDeleteConfirm={handleOpenDeleteConfirm}
            />
            {   totalPages > 1 && 
                <TeacherPagination
                    totalPages={totalPages}
                    page={page}
                    handlePageChange={handlePageChange}
                />
            }
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
        </Box>
    )
}

export default TeachersPage