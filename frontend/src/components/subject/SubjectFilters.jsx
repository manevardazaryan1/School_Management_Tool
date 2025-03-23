// src/components/subject/SubjectFilters.js
import React from 'react';
import { TextField, Box } from '@mui/material';

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
    );
}

export default SubjectFilters;