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
} from '@mui/material';
import UsuarioService from '../../services/UsuarioService';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PersonagemService from '../../services/PersonagemService';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/register.svg';
import Menu from '../Menu/Menu';
import Ficha3DeTService from '../../services/Ficha3detService';

function EditarPersonagemCampanha() {
  const { id, personagemId } = useParams();
  const navigate = useNavigate();
  const [editPersonagem, setEditPersonagem] = useState({ nome: '', jogadorId: '', jogadorNome: '' });
  const [jogadores, setJogadores] = useState([]);
  const [fichas3DeT, setFichas3DeT] = useState([]);

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
      navigate(`/campanha/editar/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
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
          <TextField
            label="Nome"
            name="nome"
            value={editPersonagem.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
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
          <Button variant="contained" color="primary" type="submit">
            Atualizar
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
        <Typography variant="h5" component="h2" gutterBottom>
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
