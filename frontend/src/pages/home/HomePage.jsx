//  * HomePage
//  *
//  * This component renders the homepage of the application.
//  * It displays a welcome message and a brief description of the application.
//  * If a user is logged in, they are redirected to the "/user" route.
//  *
 
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Container, Typography, Box } from "@mui/material"

import "./HomePage.css"

function HomePage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    if (currentUser) {
      navigate("/user")
    }
  }, [currentUser, navigate])

  return (
     <Container  
      disableGutters
      sx={{
        padding: 0,
        margin: 0,
      }} className="main">
      <Box className="hero-section">
        <Box className="hero-image"/>
        <Box className="hero-content">
          <Typography variant="h4" component="h1" className="hero-title">Welcome to the School Management Tool!</Typography>
          <Typography variant="body1" paragraph className="hero-text">
            Streamline your school's operations with our comprehensive management tool. 
            From attendance and grades to communication and resource management, we provide 
            the tools you need to focus on what matters most: student success.
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage