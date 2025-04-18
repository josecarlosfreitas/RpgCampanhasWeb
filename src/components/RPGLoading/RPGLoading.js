import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { keyframes } from '@mui/system';

const portalPulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const loadingMessages = [
  'Conectando aos Reinos...',
  'Lançando os Dados da Destino...',
  'Preparando a Aventura...',
  'Abrindo o Portal Dimensional...',
  'Invocando os Espíritos da Rede...',
  'Decifrando Antigos Manuscritos...',
  'Forjando Conexões Místicas...',
  'Reunindo a Guilda Digital...',
  'Consultando o Oráculo Binário...',
  'Carregando Tesouros Virtuais...',
];

const RPGLoading = () => {
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  const randomMessage = loadingMessages[randomIndex];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          animation: `${portalPulse} 1.5s infinite ease-in-out`,
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          border: '3px dashed #4caf50',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            color: '#aed581',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-30px',
            marginTop: '-30px',
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 3, color: 'white', fontFamily: 'fantasy', textAlign: 'center' }}>
        {randomMessage}
      </Typography>
    </Box>
  );
};

export default RPGLoading;
