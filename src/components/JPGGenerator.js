import React from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import background from '../images/reporte de mantenimiento.jpg';

const JPGGenerator = () => {
  const generateJPG = () => {
    const element = document.querySelector("#capture"); // Asegúrate de que el selector apunte a este ID
    if (element) {
      html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'reporte.jpg';
        link.click();
      });
    } else {
      console.error("Elemento no encontrado: #capture");
    }
  };

  return (
    <Button variant="contained" onClick={generateJPG} sx={{ m: 2 }}>
      Descargar JPG
    </Button>
  );
};

export default JPGGenerator;
