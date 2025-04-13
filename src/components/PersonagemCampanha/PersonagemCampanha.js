import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import UsuarioService from '../../services/UsuarioService';
import { useParams } from 'react-router-dom';
import PersonagemService from '../../services/PersonagemService';

function PersonagemCampanha() {
  const { id } = useParams();
  const [personagens, setPersonagens] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPersonagem, setNewPersonagem] = useState({ nome: '', jogadorId: '' });
  const [editPersonagem, setEditPersonagem] = useState(null);
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    fetchPersonagens();
    fetchJogadores();
  }, [id]);

  const fetchPersonagens = async () => {
    try {
      const response = await PersonagemService.getByCampanhaId(id);
      setPersonagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPersonagem({ nome: '', jogadorId: '' });
    setEditPersonagem(null);
  };

  const handleInputChange = (event) => {
    setNewPersonagem({ ...newPersonagem, [event.target.name]: event.target.value });
  };

  const handleCreatePersonagem = async () => {
    try {
      await PersonagemService.create({ ...newPersonagem, campanhaId: id, mestreNome: '', id: 0, jogadorNome: '' });
      fetchPersonagens();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao criar personagem:', error);
    }
  };

  const handleEditPersonagem = (personagem) => {
    setEditPersonagem(personagem);
    setNewPersonagem({ nome: personagem.nome, jogadorId: personagem.jogadorId });
    handleOpenDialog();
  };

  const handleUpdatePersonagem = async () => {
    try {
      await PersonagemService.update(editPersonagem.id, newPersonagem);
      fetchPersonagens();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
    }
  };

  const handleDeletePersonagem = async (personagemId) => {
    try {
      await PersonagemService.delete(personagemId);
      fetchPersonagens();
    } catch (error) {
      console.error('Erro ao excluir personagem:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Gerenciamento de Personagens
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Criar Personagem
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Jogador</TableCell>
              <TableCell>Tipo de Ficha</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personagens.map((personagem) => (
              <TableRow key={personagem.id}>
                <TableCell>{personagem.nome}</TableCell>
                <TableCell>{personagem.jogadorNome}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditPersonagem(personagem)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeletePersonagem(personagem.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editPersonagem ? 'Editar Personagem' : 'Criar Personagem'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="nome"
            value={newPersonagem.nome}
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
              value={newPersonagem.jogadorId}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={editPersonagem ? handleUpdatePersonagem : handleCreatePersonagem}
          >
            {editPersonagem ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PersonagemCampanha;
