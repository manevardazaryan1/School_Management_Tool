//  * SubjectListItem
//  *
//  * This component renders a list item for a subject, displaying the subject's name and assigned teachers.
//  * It also provides buttons for updating and deleting the subject.
//  *
//  * 
import { ListItem, ListItemText, Box, Button } from "@mui/material"

function SubjectListItem({ subject, teachers, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    let filteredteachers = teachers.filter((teacher) => teacher.subjectIds.includes(subject.id))

    if (!filteredteachers.length) {
        filteredteachers = "No Teacher"
    } else {
        filteredteachers = filteredteachers.map(teacher => teacher.name).join(", ")
    }
    
    return (
        <ListItem className="list-item" key={subject.id}>
            <ListItemText primary={`${subject.name} (Teacher: ${filteredteachers})`} />
            <Box className="buttons">
                <Button onClick={() => handleOpenUpdateDialog(subject)} size="small">Update</Button>
                <Button onClick={() => handleOpenDeleteConfirm(subject)} size="small" color="secondary">Delete</Button>
            </Box>
        </ListItem>
    )
}

export default SubjectListItem