import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register/Register';
import Campanhas from './components/Campanha/Campanha';
import CriarCampanha from './components/Campanha/CriarCampanha';
import EditarCampanha from './components/Campanha/EditarCampanha';
import EditarPersonagemCampanha from './components/PersonagemCampanha/EditarPersonagemCampanha';
import CriarFicha3det from './components/Ficha3det/CriarFicha3det';
import EditarFicha3det from './components/Ficha3det/EditarFicha3det';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campanha" element={<Campanhas />} />
        <Route path="/campanha/criar" element={<CriarCampanha />} />
        <Route path="/campanha/editar/:id" element={<EditarCampanha />} />
        <Route path="/campanha/editar/:id/personagem/:personagemId" element={<EditarPersonagemCampanha />} />
        <Route path="/campanha/editar/:id/personagem/:personagemId/ficha3det/criar" element={<CriarFicha3det />} />
        <Route
          path="/campanha/editar/:id/personagem/:personagemId/ficha3det/:fichaId/editar"
          element={<EditarFicha3det />}
        />
      </Routes>
    </Router>
  );
}

export default App;
