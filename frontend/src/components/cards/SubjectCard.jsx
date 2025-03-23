//  * SubjectCard
//  *
//  * This component renders a Material-UI Card that displays a link to the subjects page.
//  * It's used within the admin dashboard to provide quick navigation.
//  *

import { Link } from "react-router-dom"
import { Card, CardContent, Typography, Button } from "@mui/material"
import "./Cards.css"

function SubjectCard() {
  return (
    <Card className="dashboard-column-box">
      <CardContent className="dashboard-column-box-content subject-box">
        <Typography variant="h5" className="card-title">Subjects</Typography>
        <Button component={Link} to="/subjects" variant="contained" color="primary">
          View Subjects
        </Button>
      </CardContent>
    </Card>
  )
}

export default SubjectCard