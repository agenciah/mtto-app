import React, { useState } from 'react';
import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import { useStyles } from './styles';
import background from '../images/reporte de mantenimiento.jpg';

const ReportForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([null, null, null]);
  const [imageNames, setImageNames] = useState(['', '', '']); // Estado para los nombres de las imágenes
  const styles = useStyles();

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    const newImageNames = [...imageNames];
    newImages[index] = e.target.files[0];
    newImageNames[index] = e.target.files[0]?.name || ''; // Guardar el nombre de la imagen cargada
    setImages(newImages);
    setImageNames(newImageNames);
  };

  const handleSubmit = () => {
    // Generar el PDF
    const doc = new jsPDF({
      orientation: 'portrait',
    });

    // Añadir la imagen de fondo
    doc.addImage(background, 'JPEG', 0, 0, 210, 297);
    const maxWidth = 100;

    // Añadir título
    doc.setFontSize(20);
    doc.text(title, styles.title.x, styles.title.y, { maxWidth: maxWidth, align: 'left' });

    // Añadir cuerpo del mensaje
    doc.setFontSize(12);
    doc.text(body, styles.body.x, styles.body.y, { maxWidth: maxWidth, align: 'left' });

    // Añadir imágenes
    images.forEach((image, index) => {
      if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
          doc.addImage(e.target.result, 'JPEG', styles.images[index].x, styles.images[index].y, 62, 62);

          if (index === images.length - 1) {
            doc.save('reporte.pdf');
          }
        };
        reader.readAsDataURL(image);
      }
    });
  };

  return (
    <Card sx={{ mb: 2, bgcolor: '#f9f9f9', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Generar Reporte
        </Typography>
        <Box component="form" sx={{ m: 2 }}>
          <TextField 
            label="Título" 
            fullWidth 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            sx={{ mb: 2 }} 
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            sx={{ mb: 2 }}
          />
          {images.map((image, index) => (
            <div key={index}>
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2, bgcolor: 'primary.main' }}
              >
                Cargar Imagen {index + 1}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
              </Button>
              {imageNames[index] && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {`Imagen cargada: ${imageNames[index]}`}
                </Typography>
              )}
            </div>
          ))}
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Descargar PDF
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
