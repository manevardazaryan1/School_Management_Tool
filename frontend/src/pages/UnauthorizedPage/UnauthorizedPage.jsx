//  * UnauthorizedPage
//  *
//  * This component renders an Unauthorized (403) page with a message and a button to navigate back.
//  * It uses Material-UI components for layout and styling.
//  *
 
import { useNavigate } from "react-router-dom"
import { Button, Typography, Container, Paper, Box } from "@mui/material"
import "./UnauthorizedPage.css"

function UnauthorizedPage() {
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back()
        } else {
            console.log("Going to home")
            navigate("/")
        }
    }

    return (
        <Container maxWidth="sm" className="unauthorized-page-container">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
                    <Typography variant="h4" gutterBottom>
                        Unauthorized Access
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You do not have permission to access this page.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleGoBack}>
                        Go Back
                    </Button>
                </Paper>
            </Box>
        </Container>
    )
}

export default UnauthorizedPage