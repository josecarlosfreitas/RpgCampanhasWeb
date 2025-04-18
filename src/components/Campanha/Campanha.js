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
} from '@mui/material';
import Campanhaservice from '../../services/CampanhaService';
import Menu from '../Menu/Menu';
import backgroundFundo from '../../images/fundoCampanha.png';
import { Link } from 'react-router-dom';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import RPGLoading from '../RPGLoading/RPGLoading';

function Campanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCampanhas();
  }, []);

  const fetchCampanhas = async () => {
    setIsLoading(true);
    try {
      const response = await Campanhaservice.getAll();
      setCampanhas(response.data);
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
    } finally {
      setIsLoading(false);
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
      <FullScreenBackground imageUrl={backgroundFundo}>
        {isLoading ? (
          <RPGLoading />
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Gerenciamento de Campanhas
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/campanha/criar">
              Criar Campanha
            </Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Mestre</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campanhas.map((campanha) => (
                    <TableRow key={campanha.id}>
                      <TableCell>{campanha.nome}</TableCell>
                      <TableCell>{campanha.descricao}</TableCell>
                      <TableCell>{campanha.mestreNome}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          component={Link}
                          to={`/campanha/editar/${campanha.id}`}
                        >
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
          </>
        )}
      </FullScreenBackground>
    </>
  );
}

export default Campanhas;
