//  * TeacherListItem
//  *
//  * This component renders a list item for a teacher, displaying the teacher's name and assigned subjects.
//  * It also provides buttons for updating and deleting the teacher.
//  *
  
import { ListItem, ListItemText, Box, Button } from "@mui/material"

function TeacherListItem({ teacher, subjects, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    return (
        <ListItem key={teacher.id} className="list-item">
            <ListItemText
                primary={teacher.name}
                secondary={`Subjects: ${teacher.subjectIds
                    .map((id) => subjects.find((subject) => subject.id === id)?.name)
                    .join(', ') || "None"}`}
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
    )
}

export default TeacherListItem