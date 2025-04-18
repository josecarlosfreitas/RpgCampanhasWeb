import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import NpcService from '../../services/NpcService';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/register.svg';
import Menu from '../Menu/Menu';
import ImageService from '../../services/ImageService';
import Ficha3DeTService from '../../services/Ficha3detService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditarNpcCampanha() {
  const { id, npcId } = useParams();
  const navigate = useNavigate();
  const [editNpc, setEditNpc] = useState({ nome: '', descricao: '', imagePath: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [fichas3DeT, setFichas3DeT] = useState([]);

  useEffect(() => {
    fetchNpc();
    fetchFicha3DeT();
  }, [npcId]);

  const fetchNpc = async () => {
    try {
      const response = await NpcService.getById(npcId);
      setEditNpc(response.data);
    } catch (error) {
      console.error('Erro ao buscar NPC:', error);
    }
  };

  const fetchFicha3DeT = async () => {
    try {
      const response = await Ficha3DeTService.getByNpcId(npcId);
      setFichas3DeT(response.data);
    } catch (error) {
      console.error('Erro ao buscar fichas 3DeT do NPC:', error);
    }
  };

  const handleInputChange = (event) => {
    setEditNpc({ ...editNpc, [event.target.name]: event.target.value });
  };

  const handleUpdateNpc = async () => {
    try {
      await NpcService.update(npcId, editNpc);
      if (selectedImage) {
        await uploadImage();
      }
      navigate(`/campanha/editar/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar NPC:', error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('EntityType', 'npc');
    formData.append('EntityId', npcId);
    formData.append('File', selectedImage);

    try {
      const response = await ImageService.uploadImage(formData);
      setEditNpc({ ...editNpc, imagePath: response.data.imagePath });
      setSelectedImage(null);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const handleDeleteFicha3det = async (ficha3detId) => {
    try {
      await Ficha3DeTService.delete(ficha3detId);
      fetchFicha3DeT();
    } catch (error) {
      console.error('Erro ao excluir ficha 3det:', error);
    }
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
            width: '80% !important',
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
            Editar NPC
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateNpc();
            }}
          >
            <Grid container spacing={2} alignItems="center" marginBottom={2} marginRight={10}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nome"
                  name="nome"
                  value={editNpc.nome}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  size="small"
                  required
                />
                <TextField
                  label="Descrição"
                  name="descricao"
                  value={editNpc.descricao}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Avatar
                  alt={editNpc.nome}
                  src={
                    editNpc.imagePath ? `${process.env.REACT_APP_API_URL.replace('/api', '')}/${editNpc.imagePath}` : ''
                  }
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

            <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
              Atualizar NPC
            </Button>
          </form>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to={`/campanha/editar/${id}/npc/${npcId}/ficha3det/criar`}
            >
              Adicionar Ficha 3DeT
            </Button>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Fichas 3DeT
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Força</TableCell>
                  <TableCell>Habilidade</TableCell>
                  <TableCell>Resistência</TableCell>
                  <TableCell>Armadura</TableCell>
                  <TableCell>Poder de Fogo</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fichas3DeT.map((ficha) => (
                  <TableRow key={ficha.id}>
                    <TableCell>{ficha.nome}</TableCell>
                    <TableCell>{ficha.forca}</TableCell>
                    <TableCell>{ficha.habilidade}</TableCell>
                    <TableCell>{ficha.resistencia}</TableCell>
                    <TableCell>{ficha.armadura}</TableCell>
                    <TableCell>{ficha.poderDeFogo}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`/campanha/editar/${id}/npc/${npcId}/ficha3det/${ficha.id}/editar`} // Crie esta rota
                      >
                        Editar
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleDeleteFicha3det(ficha.id)}>
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </FullScreenBackground>
    </>
  );
}

export default EditarNpcCampanha;
