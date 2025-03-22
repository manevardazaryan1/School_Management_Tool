import { Grid } from '@mui/material';
import TeacherBox from '../cards/TeacherCard';
import PupilBox from '../cards/PupilCard';
import SubjectBox from '../cards/SubjectCard';

function AdminDashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TeacherBox />
      </Grid>
      <Grid item xs={12} sm={4}>
        <PupilBox />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SubjectBox />
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;