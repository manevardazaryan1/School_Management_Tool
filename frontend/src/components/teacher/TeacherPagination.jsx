// src/components/teacher/TeacherPagination.js
import React from 'react';
import { Pagination } from '@mui/material';

function TeacherPagination({ totalPages, page, handlePageChange }) {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="pagination"
        />
    );
}

export default TeacherPagination;