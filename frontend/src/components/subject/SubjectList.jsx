//  * SubjectList
//  *
//  * This component renders a list of subjects using the SubjectListItem component.
//  * It maps through the paginatedSubjects array and passes each subject's data along with
//  * teacher data and handler functions to the SubjectListItem component.
//  *

import { List } from "@mui/material"
import SubjectListItem from "./SubjectListItem"

function SubjectList({ paginatedSubjects, teachers, handleOpenUpdateDialog, handleOpenDeleteConfirm }) {
    return (
        <List className="items-list">
            {paginatedSubjects.map((subject) => (
                <SubjectListItem
                    key={subject.id}
                    subject={subject}
                    teachers={teachers}
                    handleOpenUpdateDialog={handleOpenUpdateDialog}
                    handleOpenDeleteConfirm={handleOpenDeleteConfirm}
                />
            ))}
        </List>
    )
}

export default SubjectList