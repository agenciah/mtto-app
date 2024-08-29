import React from 'react';
import jsPDF from 'jspdf';
import { pdfStyles } from './pdfStyles';
import background from "../images/reporte de mantenimiento.jpg";
import { Button } from '@mui/material';

function PDFGeneration({ title, comments, images }) {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Cargar imagen de fondo
    if (background) {
      doc.addImage(
        background,
        'JPEG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );
    } else {
      console.error("La imagen de fondo no se ha podido cargar.");
    }

    // Estilo del título
    const titleX = pdfStyles.title.x || 10;
    const titleY = pdfStyles.title.y || 10;
    const maxWidth = 100; // Ajustar ancho máximo del título

    doc.setFontSize(pdfStyles.title.fontSize || 16);
    doc.setFont(pdfStyles.title.fontStyle || 'bold');
    doc.setTextColor(pdfStyles.title.color || '#000000');
    
    // Dibujar el título y obtener la altura ocupada
    doc.text(
      title || 'Reporte de Mantenimiento',
      titleX,
      titleY,
      { maxWidth }
    );

    const titleHeight = doc.getTextDimensions(
      title || 'Reporte de Mantenimiento',
      { maxWidth }
    ).h;

    let currentY = titleY + titleHeight + 10; // 10 es el margen entre el título y el cuerpo del texto

    // Estilo del cuerpo del mensaje (Comentarios)
    if (comments) {
      doc.setFontSize(pdfStyles.comments.fontSize || 12);
      doc.setFont(pdfStyles.comments.fontStyle || 'normal');
      doc.setTextColor(pdfStyles.comments.color || '#000000');

      doc.text(
        pdfStyles.comments.title || 'Mensaje:',
        pdfStyles.comments.x || 10,
        currentY
      );

      currentY += 6;

      doc.text(
        comments,
        pdfStyles.comments.x || 20,
        currentY,
        {
          maxWidth,
        }
      );

      currentY += doc.getTextDimensions(comments, { maxWidth }).h + 10;
    }

    // Añadir imágenes
    if (images && Array.isArray(images)) {
      images.forEach((image, index) => {
        if (image && pdfStyles.images[index]) {
          const { x, y, width, height } = pdfStyles.images[index];
          doc.addImage(image, 'JPEG', x, y, width, height);
        }
      });
    }

    // Guardar el PDF
    doc.save('Reporte.pdf');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#FF0000',
          '&:hover': {
            backgroundColor: '#D00000', // Un rojo más oscuro al pasar el cursor
          },
        }}
        onClick={handleGeneratePDF}
      >
        Descargar PDF
      </Button>
    </div>
  );
}

export default PDFGeneration;
