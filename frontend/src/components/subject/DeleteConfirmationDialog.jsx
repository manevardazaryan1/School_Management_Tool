// src/components/DeleteConfirmationDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';

function DeleteConfirmationDialog({ open, onClose, item, itemName = "item", onConfirm }) {
    if (!item) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {itemName} "{item.name}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} variant="contained" color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationDialog;