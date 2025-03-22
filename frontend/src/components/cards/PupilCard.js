// src/components/admin/PupilBox.js
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

function PupilCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Pupils</Typography>
        <Button component={Link} to="/pupils" variant="contained" color="primary">
          View Pupils
        </Button>
      </CardContent>
    </Card>
  );
}

export default PupilCard;