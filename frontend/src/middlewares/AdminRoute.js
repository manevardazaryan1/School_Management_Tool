//  * AdminRoute
//  *
//  * This component is a protected route that only renders its children if the current user has the "ADMIN" role.
//  * If the user is not an admin, they are redirected to the "/unauthorized" route.
//  *

import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { CircularProgress, Box } from "@mui/material"

function AdminRoute({ children }) {
    const userRole = useSelector((state) => state.auth.currentUser?.role)
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [userRole])


    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        )
    }

    if (!userRole || userRole.toUpperCase() !== "ADMIN") {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />
    }

    return children
}

export default AdminRoute