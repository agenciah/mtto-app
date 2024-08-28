import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import { useStyles } from './styles';
import background from '../images/reporte de mantenimiento.jpg';

const PDFGenerator = ({ reportData }) => {
  const styles = useStyles();

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
    });

    // Añadir la imagen de fondo
    doc.addImage(background, 'JPEG', 0, 0, 210, 297);
    const maxWidth = 100;

    // Añadir título
    doc.setFontSize(20);
    doc.text(reportData.title, styles.title.x, styles.title.y, { maxWidth: maxWidth, align: 'left' });

    // Añadir cuerpo del mensaje
    doc.setFontSize(12);
    doc.text(reportData.body, styles.body.x, styles.body.y, { maxWidth: maxWidth, align: 'left' });

    // Añadir imágenes
    reportData.images.forEach((image, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        doc.addImage(e.target.result, 'JPEG', styles.images[index].x, styles.images[index].y, 62, 62);

        if (index === reportData.images.length - 1) {
          doc.save('reporte.pdf');
        }
      };
      reader.readAsDataURL(image);
    });
  };

  return (
    <Button variant="contained" onClick={generatePDF} sx={{ mt: 2 }}>
      Descargar PDF
    </Button>
  );
};

export default PDFGenerator;
