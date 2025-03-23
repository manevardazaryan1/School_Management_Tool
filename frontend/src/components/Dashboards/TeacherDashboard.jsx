import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import  "./Dashboards.css"

export default function TeacherDashboard() {
    const currentUserId = useSelector((state) => state.auth.currentUser.id); // Adjust to your auth state
    const teachers = useSelector((state) => state.teachers.teachers);
    const subjects = useSelector((state) => state.subjects.subjects); // Assuming you have subjects in Redux

    const teacher = teachers.find((t) => t.userId === currentUserId);
    if (!currentUserId) {
        return <p>Please log in.</p>;
    }

    if (!teacher) {
        return <Typography variant="h3" component="h3" style={{textAlign: "center"}}>Teacher information not found.</Typography>
    }

    // Function to get subject names
    const getSubjectNames = (subjectIds) => {
        if (!subjectIds || subjectIds.length === 0) {
            return 'No subjects assigned';
        }
        return subjectIds.map((id) => {
            const subject = subjects.find((s) => s.id === id);
            return subject ? subject.name : 'Unknown Subject';
        }).join(', ');
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
    );
}