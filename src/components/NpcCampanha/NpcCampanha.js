import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
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
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import NpcService from '../../services/NpcService';
import truncateText from '../../utils/utils';

function NpcCampanha() {
  const { id } = useParams();
  const [npcs, setNpcs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newNpc, setNewNpc] = useState({ nome: '', descricao: '' });

  useEffect(() => {
    fetchNpcs();
  }, [id]);

  const fetchNpcs = async () => {
    try {
      const response = await NpcService.getByCampanhaId(id);
      setNpcs(response.data);
    } catch (error) {
      console.error('Erro ao buscar NPCs:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewNpc({ nome: '', descricao: '' });
  };

  const handleInputChange = (event) => {
    setNewNpc({ ...newNpc, [event.target.name]: event.target.value });
  };

  const handleCreateNpc = async () => {
    try {
      await NpcService.create({ ...newNpc, campanhaId: id });
      fetchNpcs();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao criar NPC:', error);
    }
  };

  const handleDeleteNpc = async (npcId) => {
    try {
      await NpcService.delete(npcId);
      fetchNpcs();
    } catch (error) {
      console.error('Erro ao excluir NPC:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        NPCs da Campanha
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Criar NPC
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
            {npcs.map((npc) => (
              <TableRow key={npc.id}>
                <TableCell>{npc.nome}</TableCell>
                <TableCell>{truncateText(npc.descricao, 90)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/campanha/editar/${id}/npc/${npc.id}`}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDeleteNpc(npc.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Criar NPC</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="nome"
            value={newNpc.nome}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={newNpc.descricao}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleCreateNpc}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NpcCampanha;
