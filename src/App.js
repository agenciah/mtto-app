import React from 'react';
import ReportForm from './components/ReportForm';
import { Container, Grid } from '@mui/material';

function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          {/* El componente ReportForm ahora manejará la generación y descarga del PDF */}
          <ReportForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
