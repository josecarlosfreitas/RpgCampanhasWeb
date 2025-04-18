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
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import HistoriaService from '../../services/HistoriaService';
import truncateText from '../../utils/utils';

function HistoriaCampanha() {
  const { id } = useParams(); // 'id' é o ID da campanha
  const [historias, setHistorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHistorias();
  }, [id]);

  const fetchHistorias = async () => {
    setIsLoading(true);
    try {
      const response = await HistoriaService.getByCampanhaId(id);
      setHistorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar histórias da campanha:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistoria = async (historiaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta história?')) {
      try {
        await HistoriaService.delete(historiaId);
        fetchHistorias();
      } catch (error) {
        console.error('Erro ao excluir história:', error);
      }
    }
  };

  if (isLoading) {
    return <Typography>Carregando histórias...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Histórias da Campanha
      </Typography>
      <Button variant="contained" color="primary" component={Link} to={`/campanha/editar/${id}/historia/criar`}>
        Adicionar Nova História
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Conteudo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historias.map((historia) => (
              <TableRow key={historia.id}>
                <TableCell>{historia.titulo}</TableCell>
                <TableCell>{truncateText(historia.conteudo, 90)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/campanha/editar/${id}/historia/${historia.id}/editar`}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDeleteHistoria(historia.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default HistoriaCampanha;
