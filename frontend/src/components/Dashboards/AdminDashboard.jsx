//  * AdminDashboard
//  *
//  * This component renders the admin dashboard layout, displaying cards for teachers, pupils, and subjects.
//  * It uses Material-UI Grid to organize the cards in a responsive layout.
//  *

import { Grid } from "@mui/material"
import TeacherBox from "../cards/TeacherCard"
import PupilBox from "../cards/PupilCard"
import SubjectBox from "../cards/SubjectCard"
import "./Dashboards.css"

function AdminDashboard() {
  return (
    <Grid container spacing={2} className="dashboard-row">
      <Grid item xs={12} lg={4} className="dashboard-column">
        <TeacherBox />
      </Grid>
      <Grid item xs={12} lg={4}>
        <PupilBox />
      </Grid>
      <Grid item xs={12} lg={4}>
        <SubjectBox />
      </Grid>
    </Grid>
  )
}

export default AdminDashboard