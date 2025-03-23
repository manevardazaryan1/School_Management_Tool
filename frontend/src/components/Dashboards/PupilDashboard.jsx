import { useSelector } from 'react-redux';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

export default function PupilDashboard() {
    const currentUserId = useSelector((state) => state.auth.currentUser.id);
    const pupils = useSelector((state) => state.pupils.pupils);

    const pupil = pupils.find((p) => p.userId === currentUserId);

    if (!currentUserId) {
        return <p>Please log in.</p>;
    }

    if (!pupil) {
        return <Typography variant="h3" component="h3" style={{textAlign: "center"}}>Pupil information not found.</Typography>
    }

    return (
        <Box>
            <Typography variant="h4" component="h4" gutterBottom className="dashboardTitleInfo">
                Pupil Information
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom className="dashboardTitleName">
                {`Name: ${pupil.name.toUpperCase()}`}
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom className="dashboardTitleInfo">
                {`Preference: ${pupil.preference || "No preferred subject yet"}`}
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom className="dashboardTitleInfo">
                {`Advanced Subject: ${pupil.advancedSubject || "No calculated advanced subject"}`}
            </Typography>
            <Box>
                <Typography variant="h5" component="h5" gutterBottom className="dashboardTitleInfo">
                   Grades:
                </Typography>
                <List>
                    {Object.entries(pupil.grades).map(([subject, grade]) => (
                        <ListItem key={subject}>
                            <ListItemText>{subject}: {grade}</ListItemText>
                        </ListItem>
                    ))} 
                </List>
            </Box>
        </Box>
    );
}