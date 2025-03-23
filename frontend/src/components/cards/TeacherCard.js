// src/components/admin/TeacherBox.js
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import "./Cards.css"

function TeacherCard() {
  return (
    <Card className="dashboard-column-box">
      <CardContent className="dashboard-column-box-content teacher-box">
        <Typography variant="h5" className="card-title">Teachers</Typography>
        <Button component={Link} to="/teachers" variant="contained" color="primary">
          View Teachers
        </Button>
      </CardContent>
    </Card>
  );
}

export default TeacherCard;