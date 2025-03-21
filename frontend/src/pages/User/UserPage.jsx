// src/components/UserPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from '../../components/AdminDashboard';
import TeacherDashboard from '../../components/TeacherDashboard';
import PupilDashboard from '../../components/PupilDashboard';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>User Page</h2>
      {renderDashboard()}
    </div>
  );
}

export default UserPage;