// src/pages/RegisterPage.js

import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import { Container, Typography, Paper, Box } from '@mui/material';
import "./Auth.css"

function RegisterPage() {
  return (
    <Container maxWidth="xs" className="auth-section">
      <Paper className="auth-form" elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <Box width="100%">
          <RegisterForm />
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;