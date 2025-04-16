import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
} from '@mui/material';
import UsuarioService from '../../services/UsuarioService';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PersonagemService from '../../services/PersonagemService';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/register.svg';
import Menu from '../Menu/Menu';
import Ficha3DeTService from '../../services/Ficha3detService';
import ImageService from '../../services/ImageService';

function EditarPersonagemCampanha() {
  const { id, personagemId } = useParams();
  const navigate = useNavigate();
  const [editPersonagem, setEditPersonagem] = useState({ nome: '', jogadorId: '', jogadorNome: '', imagePath: '' });
  const [jogadores, setJogadores] = useState([]);
  const [fichas3DeT, setFichas3DeT] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPersonagem();
    fetchJogadores();
    fetchFicha3DeT();
  }, [personagemId]);

  const fetchFicha3DeT = async () => {
    try {
      const response = await Ficha3DeTService.getByPersonagemId(personagemId);
      setFichas3DeT(response.data);
    } catch (error) {
      console.error('Erro ao buscar fichas 3DeT:', error);
    }
  };

  const fetchPersonagem = async () => {
    try {
      const response = await PersonagemService.getById(personagemId);
      setEditPersonagem(response.data);
    } catch (error) {
      console.error('Erro ao buscar personagem:', error);
    }
  };

  const fetchJogadores = async () => {
    try {
      const response = await UsuarioService.getAllJogadores();
      setJogadores(response.data);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
    }
  };

  const handleInputChange = (event) => {
    setEditPersonagem({ ...editPersonagem, [event.target.name]: event.target.value });
  };

  const handleUpdatePersonagem = async () => {
    try {
      await PersonagemService.update(personagemId, editPersonagem);
      if (selectedImage) {
        await uploadImage();
      }
      navigate(`/campanha/editar/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('EntityType', 'personagem');
    formData.append('EntityId', personagemId);
    formData.append('File', selectedImage);

    try {
      const response = await ImageService.uploadImage(formData);
      setEditPersonagem({ ...editPersonagem, imagePath: response.data.imagePath });
      setSelectedImage(null);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  return (
    <>
      <Menu />
      <FullScreenBackground imageUrl={backgroundFundo}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Personagem
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdatePersonagem();
          }}
        >
          <Grid container spacing={2} alignItems="center" marginBottom={2} marginRight={10}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome"
                name="nome"
                value={editPersonagem.nome}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                size="small"
              />
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel id="jogador-label">Jogador</InputLabel>
                <Select
                  labelId="jogador-label"
                  id="jogadorId"
                  name="jogadorId"
                  value={editPersonagem.jogadorId}
                  onChange={handleInputChange}
                  label="Jogador"
                >
                  {jogadores.map((jogador) => (
                    <MenuItem key={jogador.id} value={jogador.id}>
                      {jogador.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Avatar
                alt={editPersonagem.nome}
                src={
                  editPersonagem.imagePath
                    ? `${process.env.REACT_APP_API_URL.replace('/api', '')}/${editPersonagem.imagePath}`
                    : ''
                }
                sx={{ width: 120, height: 120 }}
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
            Atualizar Personagem
          </Button>
        </form>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/campanha/editar/${id}/personagem/${personagemId}/ficha3det/criar`}
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
                      to={`/campanha/editar/${id}/personagem/${personagemId}/ficha3det/${ficha.id}/editar`}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FullScreenBackground>
    </>
  );
}

export default EditarPersonagemCampanha;
