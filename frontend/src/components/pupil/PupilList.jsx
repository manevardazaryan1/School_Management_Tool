// src/components/pupil/PupilList.js
import React from 'react';
import { List } from '@mui/material';
import PupilListItem from './PupilListItem';

function PupilList({ paginatedPupils, handleOpenModal, handleDeletePupil, subjects }) {
    return (
        <List className="items-list">
            {paginatedPupils.map((pupil) => (
                <PupilListItem
                    key={pupil.id}
                    pupil={pupil}
                    handleOpenModal={handleOpenModal}
                    handleDeletePupil={handleDeletePupil}
                    subjects={subjects}
                />
            ))}
        </List>
    );
}

export default PupilList;