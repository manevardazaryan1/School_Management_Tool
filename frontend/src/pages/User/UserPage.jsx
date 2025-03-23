// src/components/UserPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from '../../components/Dashboards/AdminDashboard';
import TeacherDashboard from '../../components/Dashboards/TeacherDashboard';
import PupilDashboard from '../../components/Dashboards/PupilDashboard';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import "./UserPage.css"

function UserPage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (currentUser === null && !loading) {
      navigate('/');
    } else {
        setLoading(false);
    }
  }, [currentUser, navigate, loading]);

  const renderDashboard = () => {
    switch (currentUser.role.toUpperCase()) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'TEACHER':
        return <TeacherDashboard />;
      case 'PUPIL':
        return <PupilDashboard />;
      default:
        return <p>Unknown role.</p>;
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  if (!currentUser) {
    return null; // or return a loading indicator
  }

  return (
    <Container className="user-container">
      <Box className="user-dashboard-box">
        <Typography variant="h3" component="h2" gutterBottom className="user-page-title">
          {currentUser.role} {currentUser.name.toUpperCase()}
        </Typography>
        <Box className="dashboard">
          {renderDashboard()}
        </Box>
      </Box>
    </Container>
  );
}

export default UserPage;