//  * Navbar
//  *
//  * This component renders the navigation bar for the application.
//  * It displays the application logo, title, and login/logout buttons based on the user's authentication status.
//  *

import { Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import { Link as RouterLink } from "react-router-dom"
import logo from "../assets/images/logo/logo.png"
import "./Navbar.css"

function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Box className="logo-box">
          <Link component={RouterLink} to="/">
            <img src={logo} alt="School Management Tool Logo"></img>
          </Link>
        </Box>
        <Typography variant="h6" style={{ flexGrow: 1 }} className="app-name">
          School Management Tool
        </Typography>
        {currentUser ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar