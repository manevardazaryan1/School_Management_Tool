//  * SubjectsPage
//  *
//  * This component renders the Subjects page, displaying a list of subjects with add, update, delete,
//  * filtering, and pagination functionalities. It uses Redux for state management and Material-UI for UI components.
//  *

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addSubject, updateSubject, deleteSubject } from "../../redux/slices/subjectsSlice"
import { updatePupilBySubjectDelete, updatePupilBySubjectUpdate } from "../../redux/slices/pupilsSlice" 
import { updateTeacherBySubjectDelete } from "../../redux/slices/teachersSlice"
import { TextField, Button, Box, Typography, Modal } from "@mui/material"
import UpdateSubjectDialog from "../../components/subject/UpdateSubjectDialog"
import DeleteConfirmationDialog from "../../components/subject/DeleteConfirmationDialog"
import SubjectList from "../../components/subject/SubjectList"
import SubjectFilters from "../../components/subject/SubjectFilters"
import SubjectPagination from "../../components/subject/SubjectPagination"
import "./SubjectsPage.css"

function SubjectsPage() {
    const subjects = useSelector((state) => state.subjects.subjects)
    const teachers = useSelector((state) => state.teachers.teachers)
    const dispatch = useDispatch()
    const [newSubjectName, setNewSubjectName] = useState("")
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [subjectToUpdate, setSubjectToUpdate] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [subjectToDelete, setSubjectToDelete] = useState(null)
    const [filterName, setFilterName] = useState("")
    const [page, setPage] = useState(1)
    const subjectsPerPage = 3
    const [openFilterModal, setOpenFilterModal] = useState(false)
    const [openAddSubjectModal, setOpenAddSubjectModal] = useState(false)

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(filterName.toLowerCase())
    )

    const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);
    const paginatedSubjects = filteredSubjects.slice((page - 1) * subjectsPerPage, page * subjectsPerPage)

    const handlePageChange = (event, value) => {
        setPage(value)
    };

    const handleAddSubject = () => {
        if (newSubjectName.trim()) {
            dispatch(addSubject({ name: newSubjectName }))
            setNewSubjectName("")
        }
    };

    const handleOpenUpdateDialog = (subject) => {
        setSubjectToUpdate(subject)
        setUpdateDialogOpen(true)
    };

    const handleUpdateSubject = (updatedName) => {
        if (updatedName.trim()) {
            dispatch(updateSubject({ id: subjectToUpdate.id, name: updatedName }))
            dispatch(updatePupilBySubjectUpdate({subjectId: subjectToUpdate.id, prevName: subjectToUpdate.name, newName: updatedName}))
            setUpdateDialogOpen(false)
        }
    };

    const handleOpenDeleteConfirm = (subject) => {
        setSubjectToDelete(subject)
        setDeleteDialogOpen(true)
    };

    const handleDeleteSubjectConfirm = () => {
        dispatch(deleteSubject({ id: subjectToDelete.id }))
        dispatch(updatePupilBySubjectDelete(subjectToDelete.name))
        dispatch(updateTeacherBySubjectDelete(subjectToDelete.id))
        setDeleteDialogOpen(false)
    }

    const handleOpenFilterModal = () => {
        setOpenFilterModal(true)
    }

    const handleCloseFilterModal = () => {
        setOpenFilterModal(false)
    }

    const handleOpenaddSubjectModal = () => {
        setOpenAddSubjectModal(true)
    }

    const handleCloseAddSubjectModal = () => {
        setOpenAddSubjectModal(false)
    }

    return (
        <Box className="subjects-page-container">
            <Typography variant="h2" component="h2" className="page-title">Subjects</Typography>
            <Box className="subjectsPageButtons">
                <Button onClick={handleOpenFilterModal} style={{margin: "auto", 
                    display: "block"}}>
                    Open Filters</Button>
                <Button onClick={handleOpenaddSubjectModal} style={{margin: "auto", 
                    display: "block"}}>
                Add Subject</Button>                
            </Box>
            <Modal open={openAddSubjectModal} onClose={handleCloseAddSubjectModal} className="filter-modal">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Box className="add-subject-form">
                        <TextField label="New Subject" 
                        value={newSubjectName} 
                        onChange={(e) => setNewSubjectName(e.target.value)} 
                        className="add-subject-input" />
                        <Button onClick={handleAddSubject} variant="contained" 
                    color="primary" className="add-subject-button">Add Subject</Button>
                    </Box>
                    <Button onClick={handleCloseAddSubjectModal} color="primary" style={{backgroundColor: "#000", float: "right"}} >Close Modal</Button>
                </Box>
            </Modal>
            <Modal open={openFilterModal} onClose={handleCloseFilterModal} className="filter-modal">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <SubjectFilters filterName={filterName} setFilterName={setFilterName} />
                    <Button onClick={handleCloseFilterModal} color="primary" style={{backgroundColor: "#000", float: "right"}} >Close Filters</Button>
                </Box>
            </Modal>
            <SubjectList
                paginatedSubjects={paginatedSubjects}
                teachers={teachers}
                handleOpenUpdateDialog={handleOpenUpdateDialog}
                handleOpenDeleteConfirm={handleOpenDeleteConfirm}
            />
            {   totalPages > 1 && 
                <SubjectPagination
                    totalPages={totalPages}
                    page={page}
                    handlePageChange={handlePageChange}
                /> 
            }
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
    )
}

export default SubjectsPage