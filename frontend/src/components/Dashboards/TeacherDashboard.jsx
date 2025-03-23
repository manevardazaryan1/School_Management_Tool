//  * TeacherDashboard.js
//  *
//  * This component renders the dashboard for a teacher, displaying their information such as name and assigned subjects.
//  * It fetches teacher and subject data from the Redux store based on the current user's ID.
//  *

import { useSelector } from "react-redux"
import { Typography, Box } from "@mui/material"
import  "./Dashboards.css"

function TeacherDashboard() {
    const currentUserId = useSelector((state) => state.auth.currentUser.id)
    const teachers = useSelector((state) => state.teachers.teachers)
    const subjects = useSelector((state) => state.subjects.subjects)

    const teacher = teachers.find((t) => t.userId === currentUserId)
    if (!currentUserId) {
        return <Typography variant="body1" paragraph>Please log in.</Typography>
    }

    if (!teacher) {
        return <Typography variant="h3" component="h3" 
        style={{textAlign: "center"}}>Teacher information not found.</Typography>
    }

    const getSubjectNames = (subjectIds) => {
        if (!subjectIds || subjectIds.length === 0) {
            return "No subjects assigned";
        }
        return subjectIds.map((id) => {
            const subject = subjects.find((s) => s.id === id);
            return subject ? subject.name : "Unknown Subject";
        }).join(", ");
    };

    return (
        <Box className="teacher-dashboard-card">
            <Typography variant="h4" component="h4" gutterBottom className="dashboardTitleInfo">
                Teacher Information
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom className="dashboardTitleName">
                {`Name: ${teacher.name.toUpperCase()}`}
            </Typography>
            <Typography variant="body1" paragraph className="dashboardParagraph">
                {`Subjects: ${getSubjectNames(teacher.subjectIds)}`}
            </Typography>
        </Box>
    )
}

export default TeacherDashboard