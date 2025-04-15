import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/personagem`);
};

const create = (personagem) => {
  return axios.post(`${API_URL}/personagem`, personagem);
};

const update = (id, personagem) => {
  return axios.put(`${API_URL}/personagem/${id}`, { ...personagem, jogadorNome: '' });
};

const deletePersonagem = (id) => {
  return axios.delete(`${API_URL}/personagem/${id}`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/personagem/${id}`);
};

const getByCampanhaId = (id) => {
  return axios.get(`${API_URL}/personagem/campanha/${id}`);
};

const PersonagemService = {
  getAll,
  create,
  update,
  delete: deletePersonagem,
  getById,
  getByCampanhaId,
};

export default PersonagemService;
