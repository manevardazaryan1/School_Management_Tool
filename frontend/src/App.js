//  * App
//  *
//  * This is the main component of the application. It sets up routing using React Router,
//  * initializes the Redux store with the stored user from local storage, and renders the
//  * navigation bar and routes.
//  *

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadStoredUser } from "./redux/slices/authSlice"
import Navbar from "./layouts/Navbar"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import UserPage from "./pages/User/UserPage"
import TeachersPage from "./pages/teacher/TeachersPage"
import PupilsPage from "./pages/pupil/PupilsPage"
import SubjectsPage from "./pages/subject/SubjectsPage"
import AdminRoute from "./middlewares/AdminRoute"
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStoredUser());
  }, [dispatch])

  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/pupils" element={<AdminRoute><PupilsPage /></AdminRoute>} />
        <Route path="/teachers" element={<AdminRoute><TeachersPage /></AdminRoute>} />
        <Route path="/subjects" element={<AdminRoute><SubjectsPage /></AdminRoute>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
