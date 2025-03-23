//  * ConfirmDeletePupil
//  *
//  * This component renders a confirmation dialog for deleting a pupil.
//  * It uses Material-UI Dialog components to display a confirmation message and action buttons.
//  *

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material"

function ConfirmDeletePupil({ open, onClose, onConfirm, pupilName }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                {`Are you sure you want to delete ${pupilName}?`}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="text" style={{color: "#000"}}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeletePupil