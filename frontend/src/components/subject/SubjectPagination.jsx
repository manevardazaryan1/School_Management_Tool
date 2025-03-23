// src/components/subject/SubjectPagination.js
import React from 'react';
import { Pagination } from '@mui/material';

function SubjectPagination({ totalPages, page, handlePageChange }) {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="pagination"
        />
    );
}

export default SubjectPagination;