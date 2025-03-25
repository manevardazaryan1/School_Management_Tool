//  * UpdatePupilModal
//  *
//  * This component renders a modal for updating pupil information, including name, grades, and preferences.
//  * It uses Material-UI Dialog and Form components to display and handle user input.
//  *

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material"

function UpdatePupilModal({
    open,
    onClose,
    selectedPupil,
    updatedName,
    setUpdatedName,
    updatedGrades,
    updatedPreference,
    setUpdatedPreference,
    subjects,
    handleUpdatePupil,
    handleGradeChange,
}) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Pupil</DialogTitle>
            <DialogContent>
                {selectedPupil && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                fullWidth
                                style={{marginTop: "10px"}}
                            />
                        </Grid>
                        {subjects.map((subject) => (
                            <Grid item xs={12} sm={6} key={subject.id}>
                                <TextField
                                    label={`${subject.name} Grade`}
                                    type="number"
                                    inputProps={{ min: 0, max: 100 }}
                                    value={updatedGrades[subject.name] || ''}
                                    onChange={(e) => handleGradeChange(subject.name, e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="preference-select-label">Preference</InputLabel>
                                <Select
                                    labelId="preference-select-label"
                                    id="preference-select"
                                    value={updatedPreference}
                                    label="Preference"
                                    onChange={(e) => setUpdatedPreference(e.target.value)}
                                >
                                    {subjects.map((subject) => (
                                        <MenuItem key={subject.id} value={subject.name}>{subject.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="text" style={{color: "#000"}} color="primary">Cancel</Button>
                <Button onClick={handleUpdatePupil} variant="contained" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdatePupilModal