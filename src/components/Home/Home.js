import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundFundo2 from '../../images/fundo2.png';
import Menu from '../Menu/Menu';

function Home() {
  return (
    <>
      <Menu />
      <div className="home-fullscreen-wrapper">
        <img src={backgroundFundo2} alt="Background" className="home-background-image" />
        <Container className="home-content">
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
        </Container>
      </div>
    </>
  );
}

export default Home;
