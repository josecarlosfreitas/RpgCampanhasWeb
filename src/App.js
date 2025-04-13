import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register/Register';
import Campanhas from './components/Campanha/Campanha';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campanha" element={<Campanhas />} />
      </Routes>
    </Router>
  );
}

export default App;
