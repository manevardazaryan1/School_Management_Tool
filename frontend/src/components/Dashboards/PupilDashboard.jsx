//  * PupilDashboard
//  *
//  * This component renders the dashboard for a pupil, displaying their information such as name, preferences,
//  * advanced subject, and grades. It fetches pupil data from the Redux store based on the current user's ID.
//  *

import { useSelector } from "react-redux"
import { Typography,
     Box, 
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Paper
    } from "@mui/material"

function PupilDashboard() {
    const currentUserId = useSelector((state) => state.auth.currentUser.id);
    const pupils = useSelector((state) => state.pupils.pupils);
    const pupil = pupils.find((p) => p.userId === currentUserId);

    if (!currentUserId) {
        return <Typography variant="h3" component="h3" >Please log in.</Typography>
    }

    if (!pupil) {
        return <Typography variant="h3" component="h3" 
        style={{textAlign: "center"}}>Pupil information not found.</Typography>
    }

    return (
        <Box>
            <Typography variant="h4" component="h4" gutterBottom className="dashboardTitleInfo">
                Pupil Information
            </Typography>
            <TableContainer component={Paper} style={{marginTop: "20px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Preference</TableCell>
                        <TableCell align="center">Advanced Subject</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {pupil.name[0].toUpperCase() + pupil.name.slice(1).toLowerCase()}
                            </TableCell>
                            <TableCell align="center">
                                {pupil.preference.name || "No preferred subject yet"}
                            </TableCell>
                            <TableCell align="center">
                                {pupil.advancedSubject.name || "No calculated advanced subject"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} style={{marginTop: "20px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.entries(pupil.grades).map(([subject]) => (
                                <TableCell key={subject} align="center">
                                    {subject}
                                </TableCell>
                            ))} 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {Object.entries(pupil.grades).map(([subject, grade]) => (
                            <TableCell key={subject} align="center">
                                {grade}
                            </TableCell>
                        ))} 
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PupilDashboard