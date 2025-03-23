// src/components/admin/PupilBox.js
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import "./Cards.css"

function PupilCard() {
  return (
    <Card className="dashboard-column-box">
      <CardContent className="dashboard-column-box-content pupil-box">
        <Typography variant="h5" className="card-title">Pupils</Typography>
        <Button component={Link} to="/pupils" variant="contained" color="primary">
          View Pupils
        </Button>
      </CardContent>
    </Card>
  );
}

export default PupilCard;