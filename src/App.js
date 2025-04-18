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
import CriarHistoriaCampanha from './components/HistoriaCampanha/CriarHistoriaCampanha';
import EditarHistoriaCampanha from './components/HistoriaCampanha/EditarHistoriaCampanha';
import EditarNpcCampanha from './components/NpcCampanha/EditarNpcCampanha';
import EditarLocalCampanha from './components/LocalCampanha/EditarLocalCampanha';

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
        <Route path="/campanha/editar/:id/historia/criar" element={<CriarHistoriaCampanha />} />
        <Route path="/campanha/editar/:id/historia/:historiaId/editar" element={<EditarHistoriaCampanha />} />
        <Route path="/campanha/editar/:id/npc/:npcId" element={<EditarNpcCampanha />} />
        <Route path="/campanha/editar/:id/npc/:npcId/ficha3det/criar" element={<CriarFicha3det />} />
        <Route path="/campanha/editar/:id/npc/:npcId/ficha3det/:fichaId/editar" element={<EditarFicha3det />} />
        <Route path="/campanha/editar/:id/local/:localId" element={<EditarLocalCampanha />} />
      </Routes>
    </Router>
  );
}

export default App;
