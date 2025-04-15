import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Divider, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams, useNavigate } from 'react-router-dom';
import Ficha3detService from '../../services/Ficha3detService';
import backgroundImage from '../../images/register.svg';

// Ícones
import PersonIcon from '@mui/icons-material/Person';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import Menu from '../Menu/Menu';

function CriarFicha3det() {
  const { id, personagemId } = useParams();
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
    personagemId: parseInt(personagemId, 10),
    npcId: null,
  });

  const handleChangeTab = (event, newValue) => setTab(newValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFicha({ ...ficha, [name]: value });
  };

  const handleSalvarFicha = async () => {
    try {
      await Ficha3detService.create(ficha);
      navigate(`/campanha/editar/${id}/personagem/${personagemId}`);
    } catch (error) {
      console.error('Erro ao criar ficha 3DeT:', error);
    }
  };

  const handleCancelar = () => {
    navigate(`/campanha/editar/${id}/personagem/${personagemId}`);
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
            Ficha de Personagem - 3D&T Alpha
          </Typography>

          {/* Cabeçalho com nome e pontos */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Nome do Personagem"
                name="nome"
                value={ficha.nome}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Pontos" name="pontos" value={ficha.pontos} onChange={handleInputChange} />
            </Grid>
          </Grid>

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
                <strong>Passo 1 • Iniciativa:</strong>{' '}
                {` cada combatente rola um dado e acrescenta ao resultado sua Habilidade. Inclua +1 por Aceleração ou +2 por Teleporte (não cumulativos), quando houver. Combatentes com iniciativa mais alta agem primeiro. Em caso de empate, combatentes com Habilidade mais alta agem primeiro. Se mesmo assim houver empate, os combatentes agem ao mesmo tempo. Este teste é feito apenas uma vez, no primeiro turno do combate: o valor de iniciativa é mantido até o final da luta.\n\n`}
                <strong>Passo 2 • Força de Ataque (FA):</strong>{' '}
                {` os personagens escolhem seus alvos e fazem seus ataques ou manobras, cada um em sua iniciativa. A Força de Ataque de cada um será igual a H+F+1d (para ataques corpo-a-corpo) ou H+PdF+1d (para ataques à longa distância), à escolha do jogador. Essa escolha deve ser feita antes da rolagem.\n\n`}
                <strong>Exemplo: </strong>{' '}
                {`um combatente com H4, F3 e PdF1 rola um dado e consegue um 2. Ele terá uma Força de Ataque 9 (4+3+2) para atacar corpo-a-corpo e FA 7 (4+1+2) para atacar à distância.\n\n`}
                <strong>Passo 3 • Força de Defesa (FD):</strong>{' '}
                {` a Força de Defesa da vítima será igual a H+A+1d. Subtraia esse valor da FA do atacante. O resultado final será a quantidade de Pontos de Vida perdidos pela vítima.\n\n`}
                <strong>Exemplo: </strong>{' '}
                {`um atacante com H2 e F3 rola um dado, consegue um 5 e ataca com FA 10. Seu alvo tem H2, A1 e rola um 3, defendendo-se com FD 6. 10-6=4. A vítima perde 4 PVs por este ataque. Caso a FD final do alvo seja igual ou superior à FA final do atacante, nenhum dano é provocado.`}
              </Typography>
            </TabPanel>
          </TabContext>

          <Box mt={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancelar} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSalvarFicha}>
              Salvar Ficha
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default CriarFicha3det;
