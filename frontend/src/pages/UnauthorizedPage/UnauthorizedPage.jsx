import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Paper, Box } from '@mui/material';

function UnauthorizedPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        console.log('Go back clicked');
        console.log('History length:', window.history.length);
        if (window.history.length > 1) {
            console.log('Going back');
            window.history.back();
        } else {
            console.log('Going to home');
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
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
    );
}

export default UnauthorizedPage;