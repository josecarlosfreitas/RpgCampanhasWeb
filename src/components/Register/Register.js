import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import backgroundImage from '../../images/register.svg';
import './Register.css';
import Menu from '../Menu/Menu';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await UsuarioService.register(nome, email, senha, tipo);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <>
      <Menu />
      <Container maxWidth="sm" className="register-container">
        <img src={backgroundImage} alt="Background" className="home-background-image" />
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Registrar Usuário
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="tipo-label" style={{ color: 'white' }}>
                Tipo
              </InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                label="Tipo"
                style={{ color: 'white' }}
              >
                <MenuItem value="jogador">Jogador</MenuItem>
                <MenuItem value="mestre">Mestre</MenuItem>
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Registrar
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Register;
