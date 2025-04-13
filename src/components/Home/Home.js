import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundFundo from '../../images/fundoHome.png';
import Menu from '../Menu/Menu';
import FullScreenBackground from '../FullScreenBackground/FullScreenBackground';

function Home() {
  return (
    <>
      <Menu />
      <FullScreenBackground imageUrl={backgroundFundo}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo ao Sistema de Gerenciamento de RPG
          </Typography>
          <Typography variant="body1" paragraph>
            Este sistema foi criado para ajudar mestres e jogadores a gerenciar suas campanhas de RPG de mesa.
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/register" sx={{ ml: 2 }}>
              Registrar
            </Button>
          </Box>
        </Box>
      </FullScreenBackground>
    </>
  );
}

export default Home;
