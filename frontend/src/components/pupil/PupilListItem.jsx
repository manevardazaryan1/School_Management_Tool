//src/components/pupil/PupilListItem.js

import React from 'react';
import { ListItem, Box, Typography, Button } from '@mui/material';

function PupilListItem({ pupil, handleOpenModal, handleDeletePupil, subjects }) {
    return (
        <ListItem className="list-item" key={pupil.id}>
            <Box>
                <Typography variant="h5" component="h5">
                    {pupil.name}
                </Typography>
                <Typography variant="h5" component="h5">
                    {`Advanced Subject: ${pupil.advancedSubject}`}
                </Typography>
                <Typography variant="h5" component="h5">
                    {`Preference: ${pupil.preference}`}
                </Typography>
                <Typography variant="body1" paragraph>
                    {subjects.map((subject) => ` ${subject.name} - ${pupil.grades[subject.name] || 0} `)}
                </Typography>
            </Box>
            <Box className="buttons">
                <Button onClick={() => handleOpenModal(pupil)} size="small" color="primary">Update</Button>
                <Button onClick={() => handleDeletePupil(pupil.id)} size="small" color="secondary">Delete</Button>
            </Box>
        </ListItem>
    );
}

export default PupilListItem;