//  * UserPage
//  *
//  * This component renders the user's dashboard based on their role. It fetches the current user
//  * from the Redux store and displays the appropriate dashboard component (AdminDashboard,
//  * TeacherDashboard, or PupilDashboard). It also handles navigation if the user is not authenticated.
//  *
 
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Container, Typography } from "@mui/material"
import AdminDashboard from "../../components/Dashboards/AdminDashboard"
import TeacherDashboard from "../../components/Dashboards/TeacherDashboard"
import PupilDashboard from "../../components/Dashboards/PupilDashboard"
import "./UserPage.css"

function UserPage() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser === null && !loading) {
      navigate("/")
    } else {
        setLoading(false)
    }
  }, [currentUser, navigate, loading])

  const renderDashboard = () => {
    switch (currentUser.role.toUpperCase()) {
      case "ADMIN":
        return <AdminDashboard />
      case "TEACHER":
        return <TeacherDashboard />
      case "PUPIL":
        return <PupilDashboard />
      default:
        return <Typography variant="body1" paragraph>Unknown role.</Typography>
    }
  }

  if (loading) {
    return <Typography variant="body1" paragraph>Loading...</Typography>
  }

  if (!currentUser) {
    return null
  }

  return (
    <Container className="user-container">
      <Box className="user-dashboard-box">
        <Typography variant="h3" component="h2" gutterBottom className="user-page-title">
          {currentUser.role.toUpperCase()} {currentUser.name.toUpperCase()}
        </Typography>
        <Box className="dashboard">
          {renderDashboard()}
        </Box>
      </Box>
    </Container>
  )
}

export default UserPage