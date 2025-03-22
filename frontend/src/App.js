import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadStoredUser } from './redux/slices/authSlice';
import UserPage from './pages/User/UserPage';
import TeachersPage from './pages/teacher/TeachersPage';
import PupilsPage from './pages/pupil/PupilsPage';
import SubjectsPage from './pages/subject/SubjectsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStoredUser()); // Check localStorage on app load
  }, [dispatch]);
  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/teachers" element={<TeachersPage/>} />
        <Route path="/pupils" element={<PupilsPage/>} />
        <Route path="/subjects" element={<SubjectsPage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
