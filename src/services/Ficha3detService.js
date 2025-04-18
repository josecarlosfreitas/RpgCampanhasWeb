import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/ficha3det`);
};

const create = (model) => {
  return axios.post(`${API_URL}/ficha3det`, model);
};

const update = (id, model) => {
  return axios.put(`${API_URL}/ficha3det/${id}`, model);
};

const deleteFicha3det = (id) => {
  return axios.delete(`${API_URL}/ficha3det/${id}`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/ficha3det/${id}`);
};

const getByPersonagemId = (id) => {
  return axios.get(`${API_URL}/ficha3det/personagem/${id}`);
};

const getByNpcId = (id) => {
  return axios.get(`${API_URL}/ficha3det/npc/${id}`);
};

const Ficha3detService = {
  getAll,
  create,
  update,
  delete: deleteFicha3det,
  getById,
  getByPersonagemId,
  getByNpcId,
};

export default Ficha3detService;
