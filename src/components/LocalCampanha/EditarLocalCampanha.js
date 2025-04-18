import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, Avatar, Grid, IconButton } from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import LocalService from '../../services/LocalService'; // Importe o serviço de Local
import ImageService from '../../services/ImageService'; // Importe o serviço de Imagem
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/fundoCampanha.png';
import Menu from '../Menu/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditarLocalCampanha() {
  const { id, localId } = useParams(); // ID da campanha e ID do local
  const navigate = useNavigate();
  const [local, setLocal] = useState({
    campanhaId: parseInt(id, 10),
    nome: '',
    descricao: '',
    imagePath: '', // Adicionado campo para o caminho da imagem
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchLocal();
  }, [localId]);

  const fetchLocal = async () => {
    try {
      const response = await LocalService.getById(localId);
      setLocal(response.data);
    } catch (error) {
      console.error('Erro ao buscar local:', error);
    }
  };

  const handleInputChange = (event) => {
    setLocal({ ...local, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('EntityType', 'local'); // Ajuste para a entidade correta
    formData.append('EntityId', localId);
    formData.append('File', selectedImage);

    try {
      const response = await ImageService.uploadImage(formData);
      setLocal({ ...local, imagePath: response.data.imagePath });
      setSelectedImage(null);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const handleSalvarLocal = async () => {
    try {
      await LocalService.update(localId, local);
      if (selectedImage) {
        await uploadImage();
      }
      navigate(`/campanha/editar/${id}`); // Redireciona para a página de edição da campanha
    } catch (error) {
      console.error('Erro ao salvar local:', error);
    }
  };

  const handleCancelar = () => {
    navigate(`/campanha/editar/${id}`); // Volta para a página de edição da campanha
  };

  const getVoltarLink = () => {
    return `/campanha/editar/${id}`;
  };

  return (
    <>
      <Menu />
      <FullScreenBackground imageUrl={backgroundFundo}>
        <Box
          sx={{
            width: '100%',
            margin: '20px auto',
            padding: 4,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            <IconButton component={Link} to={getVoltarLink()} color="primary">
              <ArrowBackIcon />
            </IconButton>
            Editar Local
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSalvarLocal();
            }}
          >
            <Grid container spacing={2} alignItems="center" marginBottom={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nome"
                  name="nome"
                  value={local.nome}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Descrição"
                  name="descricao"
                  value={local.descricao}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Avatar
                  alt={local.nome}
                  src={local.imagePath ? `${process.env.REACT_APP_API_URL.replace('/api', '')}/${local.imagePath}` : ''}
                  sx={{ width: 120, height: 120, borderRadius: '8px' }}
                />
              </Grid>
            </Grid>

            <Box mt={2}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="outlined" color="primary" component="span">
                  Selecionar Nova Imagem
                </Button>
              </label>
              {selectedImage && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {selectedImage.name}
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancelar} sx={{ mr: 2 }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Salvar Local
              </Button>
            </Box>
          </form>
        </Box>
      </FullScreenBackground>
    </>
  );
}

export default EditarLocalCampanha;
