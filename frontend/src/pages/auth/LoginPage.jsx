// src/pages/LoginPage.js

import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { Container, Typography, Paper, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import "./Auth.css"

function LoginPage() {
  return (
    <Container maxWidth="xs" className="auth-section">
      <Paper className="auth-form" elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box width="100%">
          <LoginForm />
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" variant="body2">
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;