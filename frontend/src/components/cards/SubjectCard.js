import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

function SubjectCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Subjects</Typography>
        <Button component={Link} to="/subjects" variant="contained" color="primary">
          View Subjects
        </Button>
      </CardContent>
    </Card>
  );
}

export default SubjectCard;