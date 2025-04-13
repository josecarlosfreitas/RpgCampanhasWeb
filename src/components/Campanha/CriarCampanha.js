import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Campanhaservice from '../../services/CampanhaService';
import Usuarioservice from '../../services/UsuarioService';
import { useNavigate } from 'react-router-dom';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/fundoCampanha.png';

function CriarCampanha() {
  const [newCampanha, setNewCampanha] = useState({ nome: '', descricao: '', mestreId: '' });
  const [mestres, setMestres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMestres();
  }, []);

  const fetchMestres = async () => {
    try {
      const response = await Usuarioservice.getAllMestres();
      setMestres(response.data);
    } catch (error) {
      console.error('Erro ao buscar mestres:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewCampanha({ ...newCampanha, [event.target.name]: event.target.value });
  };

  const handleCreateCampanha = async () => {
    try {
      await Campanhaservice.create(newCampanha);
      navigate('/campanha');
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
    }
  };

  return (
    <FullScreenBackground imageUrl={backgroundFundo}>
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Campanha
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCampanha();
        }}
      >
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
        <Button variant="contained" color="primary" type="submit">
          Criar
        </Button>
      </Box>
    </FullScreenBackground>
  );
}

export default CriarCampanha;
