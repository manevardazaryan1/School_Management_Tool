//  * SubjectFilters
//  *
//  * This component renders a filter input field for subjects, allowing users to filter subjects by name.
//  * It uses Material-UI TextField and Box components.
//  *

import { TextField, Box } from "@mui/material"

function SubjectFilters({ filterName, setFilterName }) {
    return (
        <Box className="filter-form">
            <TextField
                label="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="filter-input"
            />
        </Box>
    )
}

export default SubjectFilters