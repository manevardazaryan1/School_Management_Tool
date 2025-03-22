// src/components/admin/TeacherBox.js
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

function TeacherCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Teachers</Typography>
        <Button component={Link} to="/teachers" variant="contained" color="primary">
          View Teachers
        </Button>
      </CardContent>
    </Card>
  );
}

export default TeacherCard;