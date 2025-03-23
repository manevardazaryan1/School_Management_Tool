//  * NotFoundPage
//  *
//  * This component renders a 404 Not Found page with a message and a button to navigate back to the homepage.
//  * It uses Material-UI components for layout and styling.
//  *

import { useNavigate } from "react-router-dom"
import { Button, Typography, Container, Paper, Box } from "@mui/material"
import "./NotFoundPage.css"

function NotFoundPage() {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate("/")
    };

    return (
        <Container maxWidth="sm" className="not-found-page-container ">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                    <Typography variant="h1" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The page you are looking for does not exist.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleGoHome}>
                        Go Home
                    </Button>
                </Paper>
            </Box>
        </Container>
    )
}

export default NotFoundPage