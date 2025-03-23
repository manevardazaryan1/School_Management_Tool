//  * SubjectPagination
//  *
//  * This component renders a Material-UI Pagination component for navigating through pages of subjects.
//  *

import { Pagination } from "@mui/material"

function SubjectPagination({ totalPages, page, handlePageChange }) {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="pagination"
        />
    )
}

export default SubjectPagination