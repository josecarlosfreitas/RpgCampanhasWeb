import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import HistoriaService from '../../services/HistoriaService';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/fundoCampanha.png';
import Menu from '../Menu/Menu';

function CriarHistoriaCampanha() {
  const { id } = useParams(); // ID da campanha
  const navigate = useNavigate();
  const [novaHistoria, setNovaHistoria] = useState({
    campanhaId: parseInt(id, 10),
    titulo: '',
    conteudo: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setNovaHistoria({ ...novaHistoria, [event.target.name]: event.target.value });
  };

  const handleCriarHistoria = async () => {
    try {
      await HistoriaService.create(novaHistoria);
      navigate(`/campanha/editar/${id}`); // Redireciona para a página de edição da campanha
    } catch (error) {
      console.error('Erro ao criar história:', error);
      setError('Erro ao criar a história. Por favor, tente novamente.');
    }
  };

  const handleCancelar = () => {
    navigate(`/campanha/editar/${id}`); // Redireciona para a página de edição da campanha
  };

  return (
    <>
      <Menu />
      <FullScreenBackground imageUrl={backgroundFundo}>
        <Box
          sx={{
            maxWidth: 600,
            margin: '0 auto',
            padding: 4,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: 'black',
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Criar Nova História
          </Typography>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            label="Título"
            name="titulo"
            value={novaHistoria.titulo}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Conteúdo"
            name="conteudo"
            value={novaHistoria.conteudo}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={8}
            margin="normal"
            required
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancelar} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleCriarHistoria}>
              Criar História
            </Button>
          </Box>
        </Box>
      </FullScreenBackground>
    </>
  );
}

export default CriarHistoriaCampanha;
