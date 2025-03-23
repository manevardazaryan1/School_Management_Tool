// src/components/UpdateSubjectDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function UpdateSubjectDialog({ open, onClose, subject, onUpdate }) {
    const [subjectName, setSubjectName] = useState(subject ? subject.name : '');

    useEffect(() => {
        if (subject) {
            setSubjectName(subject.name);
        }
    }, [subject]);

    const handleUpdate = () => {
        onUpdate(subjectName);
    };

    if (!subject) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Subject</DialogTitle>
            <DialogContent>
                <TextField
                    label="Subject Name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    style={{marginTop: "10px"}}
                />
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

export default UpdateSubjectDialog;