import React, { useState, useEffect } from 'react';
import {
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
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import LocalService from '../../services/LocalService';

function LocalCampanha() {
  const { id } = useParams(); // 'id' é o ID da campanha
  const [locais, setLocais] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newLocal, setNewLocal] = useState({ nome: '', descricao: '' });

  useEffect(() => {
    fetchLocais();
  }, [id]);

  const fetchLocais = async () => {
    try {
      const response = await LocalService.getByCampanhaId(id);
      setLocais(response.data);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewLocal({ nome: '', descricao: '' });
  };

  const handleInputChange = (event) => {
    setNewLocal({ ...newLocal, [event.target.name]: event.target.value });
  };

  const handleCreateLocal = async () => {
    try {
      await LocalService.create({
        ...newLocal,
        campanhaId: id,
      });
      fetchLocais();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao criar local:', error);
    }
  };

  const handleDeleteLocal = async (localId) => {
    try {
      await LocalService.delete(localId);
      fetchLocais();
    } catch (error) {
      console.error('Erro ao excluir local:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" gutterBottom>
        Gerenciamento de Locais
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Criar Local
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
            {locais.map((local) => (
              <TableRow key={local.id}>
                <TableCell>{local.nome}</TableCell>
                <TableCell>{local.descricao}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/campanha/editar/${id}/local/${local.id}`}
                  >
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteLocal(local.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Criar Local</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="nome"
            value={newLocal.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={newLocal.descricao}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleCreateLocal}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LocalCampanha;
