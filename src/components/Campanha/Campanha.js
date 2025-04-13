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
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Campanhaservice from '../../services/CampanhaService';
import Usuarioservice from '../../services/UsuarioService';
import Menu from '../Menu/Menu';
import backgroundFundo from '../../images/fundo.png';

function Campanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCampanha, setNewCampanha] = useState({ nome: '', descricao: '', mestreId: '' });
  const [editCampanha, setEditCampanha] = useState(null);
  const [mestres, setMestres] = useState([]);

  useEffect(() => {
    fetchCampanhas();
    fetchMestres();
  }, []);

  const fetchCampanhas = async () => {
    try {
      const response = await Campanhaservice.getAll();
      setCampanhas(response.data);
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
    }
  };

  const fetchMestres = async () => {
    try {
      const response = await Usuarioservice.getAllMestres();
      setMestres(response.data);
    } catch (error) {
      console.error('Erro ao buscar mestres:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCampanha({ nome: '', descricao: '', mestreId: '' });
    setEditCampanha(null);
  };

  const handleInputChange = (event) => {
    setNewCampanha({ ...newCampanha, [event.target.name]: event.target.value });
  };

  const handleCreateCampanha = async () => {
    try {
      await Campanhaservice.create(newCampanha);
      fetchCampanhas();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
    }
  };

  const handleEditCampanha = (campanha) => {
    setEditCampanha(campanha);
    setNewCampanha({ nome: campanha.nome, descricao: campanha.descricao, mestreId: campanha.mestreId });
    handleOpenDialog();
  };

  const handleUpdateCampanha = async () => {
    try {
      await Campanhaservice.update(editCampanha.id, newCampanha);
      fetchCampanhas();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao atualizar campanha:', error);
    }
  };

  const handleDeleteCampanha = async (id) => {
    try {
      await Campanhaservice.delete(id);
      fetchCampanhas();
    } catch (error) {
      console.error('Erro ao excluir campanha:', error);
    }
  };

  return (
    <>
      <Menu />
      <Container maxWidth="lg">
        <img src={backgroundFundo} alt="Background" className="home-background-image" />
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Campanhas
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Criar Campanha
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campanhas.map((campanha) => (
                <TableRow key={campanha.id}>
                  <TableCell>{campanha.nome}</TableCell>
                  <TableCell>{campanha.descricao}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEditCampanha(campanha)}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteCampanha(campanha.id)}>
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editCampanha ? 'Editar Campanha' : 'Criar Campanha'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              name="nome"
              value={newCampanha.nome}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={newCampanha.descricao}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="mestre-label">Mestre</InputLabel>
              <Select
                labelId="mestre-label"
                id="mestreId"
                name="mestreId"
                value={newCampanha.mestreId}
                onChange={handleInputChange}
                label="Mestre"
              >
                {mestres.map((mestre) => (
                  <MenuItem key={mestre.id} value={mestre.id}>
                    {mestre.nome}
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
              onClick={editCampanha ? handleUpdateCampanha : handleCreateCampanha}
            >
              {editCampanha ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Campanhas;
