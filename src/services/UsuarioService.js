import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const register = (nome, email, senha, tipo) => {
  return axios.post(`${API_URL}/usuario`, {
    id: 0,
    nome,
    email,
    senha,
    tipo,
  });
};

const getAllMestres = () => {
  return axios.get(`${API_URL}/usuario/mestres`);
};

const UsuarioService = {
  register,
  getAllMestres,
};

export default UsuarioService;
