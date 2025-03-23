//  * PupilFilters
//  *
//  * This component renders a set of filters for pupils, allowing users to filter pupils by name,
//  * advanced subject, preference, grade subject, and grade value.
//  * It uses Material-UI components for input fields and dropdowns.
//  *
 
import { List } from "@mui/material"
import PupilListItem from "./PupilListItem"

function PupilList({ paginatedPupils, handleOpenModal, handleDeletePupil, subjects }) {
    return (
        <List className="items-list">
            {paginatedPupils.map((pupil) => (
                <PupilListItem
                    key={pupil.id}
                    pupil={pupil}
                    handleOpenModal={handleOpenModal}
                    handleDeletePupil={handleDeletePupil}
                    subjects={subjects}
                />
            ))}
        </List>
    )
}

export default PupilList