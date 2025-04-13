import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Tab } from '@mui/material';
import Campanhaservice from '../../services/CampanhaService';
import Usuarioservice from '../../services/UsuarioService';
import { useNavigate, useParams } from 'react-router-dom';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/fundoCampanha.png';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PersonagemCampanha from '../PersonagemCampanha/PersonagemCampanha';

function EditarCampanha() {
  const { id } = useParams();
  const [editCampanha, setEditCampanha] = useState({ nome: '', descricao: '', mestreId: '' });
  const [mestres, setMestres] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = useState('1');

  useEffect(() => {
    fetchCampanha();
    fetchMestres();
  }, [id]);

  const fetchCampanha = async () => {
    try {
      const response = await Campanhaservice.getById(id);
      setEditCampanha(response.data);
    } catch (error) {
      console.error('Erro ao buscar campanha:', error);
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

  const handleInputChange = (event) => {
    setEditCampanha({ ...editCampanha, [event.target.name]: event.target.value });
  };

  const handleUpdateCampanha = async () => {
    try {
      await Campanhaservice.update(id, { ...editCampanha, mestreNome: '' });
      navigate('/campanha');
    } catch (error) {
      console.error('Erro ao atualizar campanha:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FullScreenBackground imageUrl={backgroundFundo}>
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Campanha
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateCampanha();
        }}
      >
        <TextField
          label="Nome"
          name="nome"
          value={editCampanha.nome}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={editCampanha.descricao}
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
            value={editCampanha.mestreId}
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
          Atualizar
        </Button>
      </Box>
      <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="Personagens" value="1" />
              <Tab label="Histórias" value="2" />
              <Tab label="NPCs" value="3" />
              <Tab label="Locais" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {' '}
            <PersonagemCampanha />
          </TabPanel>
          <TabPanel value="2">Histórias</TabPanel>
          <TabPanel value="3">NPCs</TabPanel>
          <TabPanel value="4">Locais</TabPanel>
        </TabContext>
      </Box>
    </FullScreenBackground>
  );
}

export default EditarCampanha;
