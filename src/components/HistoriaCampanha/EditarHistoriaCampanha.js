import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import HistoriaService from '../../services/HistoriaService';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/fundoCampanha.png';
import Menu from '../Menu/Menu';

function EditarHistoriaCampanha() {
  const { id, historiaId } = useParams(); // ID da campanha e ID da história
  const navigate = useNavigate();
  const [historia, setHistoria] = useState({
    campanhaId: parseInt(id, 10),
    titulo: '',
    conteudo: '',
  });

  useEffect(() => {
    fetchHistoria();
  }, [historiaId]);

  const fetchHistoria = async () => {
    try {
      const response = await HistoriaService.getById(historiaId);
      setHistoria(response.data);
    } catch (error) {
      console.error('Erro ao buscar história:', error);
    }
  };

  const handleInputChange = (event) => {
    setHistoria({ ...historia, [event.target.name]: event.target.value });
  };

  const handleSalvarHistoria = async () => {
    try {
      await HistoriaService.update(historiaId, historia);
      navigate(`/campanha/editar/${id}`); // Redireciona para a página de edição da campanha
    } catch (error) {
      console.error('Erro ao salvar história:', error);
    }
  };

  const handleCancelar = () => {
    navigate(`/campanha/editar/${id}`); // Volta para a página de edição da campanha
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
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Editar História
          </Typography>

          <TextField
            label="Título"
            name="titulo"
            value={historia.titulo}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Conteúdo"
            name="conteudo"
            value={historia.conteudo}
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
            <Button variant="contained" color="primary" onClick={handleSalvarHistoria}>
              Salvar História
            </Button>
          </Box>
        </Box>
      </FullScreenBackground>
    </>
  );
}

export default EditarHistoriaCampanha;
