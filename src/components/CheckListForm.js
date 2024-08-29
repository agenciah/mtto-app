import React, { useState, useEffect } from 'react';
import CommentsSection from './CommentsSection';
import PDFGeneration from './PDFGeneration';
import { Box, Button, Typography, TextField } from '@mui/material';
import ImageCropDialog from './Crop/ImageCropDialog';

function ChecklistForm() {
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [images, setImages] = useState([null, null, null, null]);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [croppingIndex, setCroppingIndex] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setTitle(savedData.title || '');
      setComments(savedData.comments || '');
    }
  }, []);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setCroppingIndex(index);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    const newImages = [...images];
    newImages[croppingIndex] = croppedImage;
    setImages(newImages);
    setImageToCrop(null);
  };

  const handleSaveToLocalStorage = () => {
    const formData = { title, comments };
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Datos guardados');
  };

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      padding: 3,
      borderRadius: 2,
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2, }}
      >
      <Typography variant="h5" sx={{ color: 'rgb(1, 98, 153)', marginBottom: 2 }}>
        Reporte de Mantenimiento
      </Typography>

      <TextField
        label="Título del Mensaje"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <CommentsSection
        comments={comments}
        handleComentariosChange={(e) => setComments(e.target.value)}
      />

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">Agregar imágenes "Opcional"</Typography>
        {[0, 1, 2].map((index) => (
          <Box key={index} sx={{ my: 1 }}>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, index)} />
          </Box>
        ))}
      </Box>

      {imageToCrop && (
        <ImageCropDialog
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
          onClose={() => setImageToCrop(null)}
        />
      )}

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSaveToLocalStorage}
        sx={{
          backgroundColor: 'rgb(38, 169, 225)',
          '&:hover': { backgroundColor: 'rgb(1, 98, 153)' },
          color: 'white',
        }}
      >
        Guardar Datos
      </Button>

      <PDFGeneration title={title} comments={comments} images={images || []} />
    </Box>
  );
}

export default ChecklistForm;
