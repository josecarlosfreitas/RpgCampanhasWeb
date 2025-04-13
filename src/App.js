import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register/Register';
import Campanhas from './components/Campanha/Campanha';
import CriarCampanha from './components/Campanha/CriarCampanha';
import EditarCampanha from './components/Campanha/EditarCampanha';

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
      </Routes>
    </Router>
  );
}

export default App;
