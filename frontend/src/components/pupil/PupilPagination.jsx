//  * PupilPagination
//  *
//  * This component renders a Material-UI Pagination component for navigating through pages of pupils.
//  *

import { Pagination } from "@mui/material"

function PupilPagination({ totalPages, page, handlePageChange }) {
    return (
        <Pagination count={totalPages} page={page} onChange={handlePageChange} className="pagination" />
    )
}

export default PupilPagination