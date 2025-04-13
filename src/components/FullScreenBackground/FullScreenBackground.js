import React from 'react';
import { Container } from '@mui/material';
import './FullScreenBackground.css';

function FullScreenBackground({ imageUrl, children }) {
  return (
    <div className="fullscreen-wrapper">
      <img src={imageUrl} alt="Background" className="background-image" />
      <Container className="content">{children}</Container>
    </div>
  );
}

export default FullScreenBackground;
