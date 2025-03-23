//  * PupilFilters
//  *
//  * This component renders a set of filters for pupils, allowing users to filter pupils by name,
//  * advanced subject, preference, grade subject, and grade value.
//  * It uses Material-UI components for input fields and dropdowns.
//  *

import { TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material"

function PupilFilters({
    filterName, setFilterName,
    filterAdvancedSubject, setFilterAdvancedSubject,
    filterPreference, setFilterPreference,
    filterGradeSubject, setFilterGradeSubject,
    filterGradeValue, setFilterGradeValue,
    subjects,
}) {
    return (
        <Box className="filter-form">
            <TextField label="Filter by Name" 
                value={filterName} 
                onChange={(e) => setFilterName(e.target.value)} 
                className="filter-input" />
            <TextField label="Filter by Advanced Subject" 
                value={filterAdvancedSubject} 
                onChange={(e) => setFilterAdvancedSubject(e.target.value)}
                className="filter-input" />
            <TextField label="Filter by Preference" 
                value={filterPreference} 
                onChange={(e) => setFilterPreference(e.target.value)} 
                className="filter-input" />
            <FormControl className="filter-select" 
                sx={{ minWidth: 200 }}>
                <InputLabel id="grade-subject-filter-label">Filter by Grade Subject</InputLabel>
                <Select labelId="grade-subject-filter-label" id="grade-subject-filter" 
                value={filterGradeSubject} label="Filter by Grade Subject" 
                onChange={(e) => setFilterGradeSubject(e.target.value)} sx={{ height: 40 }}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {subjects.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField 
            label="Filter by Grade Value" 
            type="number"
            value={filterGradeValue} 
            onChange={(e) => setFilterGradeValue(e.target.value)} 
            className="filter-input" 
            inputProps={{
                min: 0,
                max: 100,
              }}
             />
        </Box>
    )
}

export default PupilFilters