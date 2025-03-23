// src/components/pupil/PupilPagination.js
import React from 'react';
import { Pagination } from '@mui/material';

function PupilPagination({ totalPages, page, handlePageChange }) {
    return (
        <Pagination count={totalPages} page={page} onChange={handlePageChange} className="pagination" />
    );
}

export default PupilPagination;