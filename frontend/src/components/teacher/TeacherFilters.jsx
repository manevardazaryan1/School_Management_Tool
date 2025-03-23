// src/components/teacher/TeacherFilters.js
import React from 'react';
import { TextField, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';

function TeacherFilters({ filterName, setFilterName, filterSubject, setFilterSubject, subjects }) {
    return (
        <Box className="filter-form">
            <TextField
                label="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="filter-input"
            />
            <FormControl className="filter-select">
                <InputLabel id="subject-filter-label">Filter by Subject</InputLabel>
                <Select
                    labelId="subject-filter-label"
                    id="subject-filter"
                    value={filterSubject}
                    label="Filter by Subject"
                    onChange={(e) => setFilterSubject(e.target.value)}
                >
                    <MenuItem value=""><em>Subjects</em></MenuItem>
                    {subjects.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default TeacherFilters;