// src/components/UpdateTeacherDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import "./UpdateDeleteTeacher.css"

function UpdateTeacherDialog({ open, onClose, teacher, subjects, onUpdate, onSubjectChange }) {
    const [teacherName, setTeacherName] = useState(teacher ? teacher.name : '');
    const [teacherSubjects, setTeacherSubjects] = useState(teacher ? [...teacher.subjectIds] : []);

    useEffect(() => {
        if (teacher) {
            setTeacherName(teacher.name);
            setTeacherSubjects([...teacher.subjectIds]);
        }
    }, [teacher]);

    const handleSubjectChange = (subjectId) => {
        if (teacherSubjects.includes(subjectId)) {
            setTeacherSubjects(teacherSubjects.filter((id) => id !== subjectId));
        } else {
            setTeacherSubjects([...teacherSubjects, subjectId]);
        }
    };

    const handleUpdate = () => {
        onUpdate(teacherName, teacherSubjects);
    };

    if (!teacher) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Teacher</DialogTitle>
            <DialogContent className="update-teacher-form">
                <TextField
                    label="Teacher Name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="teacher-name-input"
                />
                <FormControl component="fieldset">
                    {subjects.map((subject) => (
                        <FormControlLabel
                            key={subject.id}
                            control={
                                <Checkbox
                                    checked={teacherSubjects.includes(subject.id)}
                                    onChange={() => handleSubjectChange(subject.id)}
                                />
                            }
                            label={subject.name}
                        />
                    ))}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpdate} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateTeacherDialog;