import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Divider, Tab, Avatar, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Ficha3detService from '../../services/Ficha3detService';
import backgroundImage from '../../images/register.svg';

// Ícones
import PersonIcon from '@mui/icons-material/Person';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Menu from '../Menu/Menu';
import ImageService from '../../services/ImageService';

function EditarFicha3detGenerico() {
  const { id, personagemId, npcId, fichaId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('1');

  const [ficha, setFicha] = useState({
    nome: '',
    pontos: '',
    forca: '',
    habilidade: '',
    resistencia: '',
    armadura: '',
    poderDeFogo: '',
    pontosDeVida: '',
    pontosDeMagia: '',
    pontosDeExperiencia: '',
    tiposDeDano: '',
    magiasConhecidas: '',
    dinheiroEItens: '',
    vantagens: '',
    historia: '',
    desvantagens: '',
    personagemId: personagemId ? parseInt(personagemId, 10) : null,
    npcId: npcId ? parseInt(npcId, 10) : null,
    imagePath: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchFicha();
  }, [fichaId]);

  const fetchFicha = async () => {
    try {
      const response = await Ficha3detService.getById(fichaId);
      setFicha(response.data);
    } catch (error) {
      console.error('Erro ao carregar a ficha 3DeT:', error);
    }
  };

  const handleChangeTab = (event, newValue) => setTab(newValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFicha({ ...ficha, [name]: value });
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('EntityType', 'ficha3det');
    formData.append('EntityId', fichaId);
    formData.append('File', selectedImage);

    try {
      const response = await ImageService.uploadImage(formData);
      setFicha({ ...ficha, imagePath: response.data.imagePath });
      setSelectedImage(null);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const handleSalvarFicha = async () => {
    try {
      await Ficha3detService.update(fichaId, ficha);
      if (selectedImage) {
        await uploadImage();
      }
      if (personagemId) {
        navigate(`/campanha/editar/${id}/personagem/${personagemId}`);
      } else if (npcId) {
        navigate(`/campanha/editar/${id}/npc/${npcId}`);
      }
    } catch (error) {
      console.error('Erro ao salvar alterações na ficha 3DeT:', error);
    }
  };

  const handleCancelar = () => {
    if (personagemId) {
      navigate(`/campanha/editar/${id}/personagem/${personagemId}`);
    } else if (npcId) {
      navigate(`/campanha/editar/${id}/npc/${npcId}`);
    }
  };

  const getTitulo = () => {
    if (personagemId) {
      return 'Editar Ficha de Personagem - 3D&T';
    } else if (npcId) {
      return 'Editar Ficha de NPC - 3D&T';
    }
    return 'Editar Ficha 3D&T'; // Fallback title
  };

  const getNomeLabel = () => {
    if (personagemId) {
      return 'Nome do Personagem';
    } else if (npcId) {
      return 'Nome do NPC';
    }
    return 'Nome'; // Fallback label
  };

  const getVoltarLink = () => {
    if (personagemId) {
      return `/campanha/editar/${id}/personagem/${personagemId}`;
    } else if (npcId) {
      return `/campanha/editar/${id}/npc/${npcId}`;
    }
    return `/campanha/editar/${id}`;
  };

  return (
    <>
      <Menu />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          p: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflowY: 'auto',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 1000,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'serif', fontWeight: 'bold' }}>
            <IconButton component={Link} to={getVoltarLink()} color="primary">
              <ArrowBackIcon />
            </IconButton>
            {getTitulo()}
          </Typography>

          {/* Cabeçalho com nome, pontos e avatar */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label={getNomeLabel()}
                name="nome"
                value={ficha.nome}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Pontos"
                name="pontos"
                value={ficha.pontos}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Avatar
                alt={ficha.nome}
                src={ficha.imagePath ? `${process.env.REACT_APP_API_URL.replace('/api', '')}/${ficha.imagePath}` : ''}
                sx={{ width: 120, height: 120, borderRadius: '8px' }}
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="outlined" color="primary" component="span">
                Selecionar Nova Imagem
              </Button>
            </label>
            {selectedImage && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {selectedImage.name}
              </Typography>
            )}
          </Box>

          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="Abas da Ficha"
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab icon={<PersonIcon />} label="Características" value="1" />
                <Tab icon={<AutoFixHighIcon />} label="Magias & Itens" value="2" />
                <Tab icon={<MenuBookIcon />} label="História" value="3" />
                <Tab icon={<SportsKabaddiIcon />} label="Combate" value="4" />
              </TabList>
            </Box>

            {/* Aba: Características */}
            <TabPanel value="1">
              <Grid container spacing={2}>
                {['forca', 'habilidade', 'resistencia', 'armadura', 'poderDeFogo'].map((attr) => (
                  <Grid item xs={6} sm={4} key={attr}>
                    <TextField
                      fullWidth
                      type="number"
                      label={attr.charAt(0).toUpperCase() + attr.slice(1)}
                      name={attr}
                      value={ficha[attr]}
                      onChange={handleInputChange}
                    />
                  </Grid>
                ))}
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Pontos de Vida"
                    name="pontosDeVida"
                    value={ficha.pontosDeVida}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Pontos de Magia"
                    name="pontosDeMagia"
                    value={ficha.pontosDeMagia}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Pontos de XP"
                    name="pontosDeExperiencia"
                    value={ficha.pontosDeExperiencia}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Aba: Magias & Itens */}
            <TabPanel value="2">
              <TextField
                label="Tipos de Dano"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                name="tiposDeDano"
                value={ficha.tiposDeDano}
                onChange={handleInputChange}
              />
              <TextField
                label="Magias Conhecidas"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                name="magiasConhecidas"
                value={ficha.magiasConhecidas}
                onChange={handleInputChange}
              />
              <TextField
                label="Dinheiro e Itens"
                fullWidth
                multiline
                minRows={3}
                name="dinheiroEItens"
                value={ficha.dinheiroEItens}
                onChange={handleInputChange}
              />
            </TabPanel>

            {/* Aba: História */}
            <TabPanel value="3">
              <TextField
                label="Vantagens"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                name="vantagens"
                value={ficha.vantagens}
                onChange={handleInputChange}
              />
              <TextField
                label="Desvantagens"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                name="desvantagens"
                value={ficha.desvantagens}
                onChange={handleInputChange}
              />
              <TextField
                label="História"
                fullWidth
                multiline
                minRows={4}
                sx={{ mb: 2 }}
                name="historia"
                value={ficha.historia}
                onChange={handleInputChange}
              />
            </TabPanel>

            {/* Aba: Combate */}
            <TabPanel value="4">
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                <strong>Passo 1 • Iniciativa:</strong>
                {` cada combatente rola um dado e acrescenta ao resultado sua Habilidade. Inclua +1 por Aceleração ou +2 por Teleporte (não cumulativos), quando houver. Combatentes com iniciativa mais alta agem primeiro. Em caso de empate, combatentes com Habilidade mais alta agem primeiro. Se mesmo assim houver empate, os combatentes agem ao mesmo tempo. Este teste é feito apenas uma vez, no primeiro turno do combate: o valor de iniciativa é mantido até o final da luta.\n\n`}
                <strong>Passo 2 • Força de Ataque (FA):</strong>
                {` os personagens escolhem seus alvos e fazem seus ataques ou manobras, cada um em sua iniciativa. A Força de Ataque de cada um será igual a H+F+1d (para ataques corpo-a-corpo) ou H+PdF+1d (para ataques à longa distância), à escolha do jogador. Essa escolha deve ser feita antes da rolagem.\n\n`}
                <strong>Exemplo: </strong>
                {`um combatente com H4, F3 e PdF1 rola um dado e consegue um 2. Ele terá uma Força de Ataque 9 (4+3+2) para atacar corpo-a-corpo e FA 7 (4+1+2) para atacar à distância.\n\n`}
                <strong>Passo 3 • Força de Defesa (FD):</strong>
                {` a Força de Defesa da vítima será igual a H+A+1d. Subtraia esse valor da FA do atacante. O resultado final será a quantidade de Pontos de Vida perdidos pela vítima.\n\n`}
                <strong>Exemplo: </strong>
                {`um atacante com H2 e F3 rola um dado, consegue um 5 e ataca com FA 10. Seu alvo tem H2, A1 e rola um 3, defendendo-se com FD 6. 10-6=4. A vítima perde 4 PVs por este ataque. Caso a FD final do alvo seja igual ou superior à FA final do atacante, nenhum dano é provocado.`}
              </Typography>
            </TabPanel>
          </TabContext>

          <Box mt={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancelar} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSalvarFicha}>
              Salvar Alterações
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default EditarFicha3detGenerico;
