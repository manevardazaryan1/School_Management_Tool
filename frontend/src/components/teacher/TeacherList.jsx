//  * TeacherList
//  *
//  * This component renders a list of teachers using the TeacherListItem component.
//  * It maps through the paginatedTeachers array and passes each teacher's data along with
//  * subject data and handler functions to the TeacherListItem component.
//  *
 
import { List } from "@mui/material"
import TeacherListItem from "./TeacherListItem"

function TeacherList({ paginatedTeachers, subjects, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    return (
        <List className="items-list">
            {paginatedTeachers.map((teacher) => (
                <TeacherListItem
                    key={teacher.id}
                    teacher={teacher}
                    subjects={subjects}
                    handleOpenUpdateDialog={handleOpenUpdateDialog}
                    handleOpenDeleteConfirm={handleOpenDeleteConfirm}
                />
            ))}
        </List>
    )
}

export default TeacherList