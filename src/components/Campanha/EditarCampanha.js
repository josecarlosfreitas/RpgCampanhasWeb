import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  IconButton,
} from '@mui/material';
import Campanhaservice from '../../services/CampanhaService';
import Usuarioservice from '../../services/UsuarioService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';
import backgroundFundo from '../../images/fundoCampanha.png';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PersonagemCampanha from '../PersonagemCampanha/PersonagemCampanha';
import Menu from '../Menu/Menu';
import HistoriaCampanha from '../HistoriaCampanha/HistoriaCampanha';
import NpcCampanha from '../NpcCampanha/NpcCampanha';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalCampanha from '../LocalCampanha/LocalCampanha';

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

  const getVoltarLink = () => {
    return `/campanha`;
  };

  return (
    <>
      <Menu />
      <FullScreenBackground imageUrl={backgroundFundo}>
        <Box
          sx={{
            width: '100%',
            margin: '20px auto',
            padding: 4,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            <IconButton component={Link} to={getVoltarLink()} color="primary">
              <ArrowBackIcon />
            </IconButton>
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
              <PersonagemCampanha campanhaId={id} />
            </TabPanel>
            <TabPanel value="2">
              <HistoriaCampanha campanhaId={id} />
            </TabPanel>
            <TabPanel value="3">
              <NpcCampanha campanhaId={id} />
            </TabPanel>
            <TabPanel value="4">
              <LocalCampanha campanhaId={id} />
            </TabPanel>
          </TabContext>
        </Box>
      </FullScreenBackground>
    </>
  );
}

export default EditarCampanha;
