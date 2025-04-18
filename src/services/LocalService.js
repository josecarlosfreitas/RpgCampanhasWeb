import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/local`);
};

const create = (local) => {
  console.log('Creating local:', local);
  return axios.post(`${API_URL}/local`, local);
};

const update = (id, local) => {
  return axios.put(`${API_URL}/local/${id}`, local);
};

const deleteLocal = (id) => {
  return axios.delete(`${API_URL}/local/${id}`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/local/${id}`);
};

const getByCampanhaId = (id) => {
  return axios.get(`${API_URL}/local/campanha/${id}`);
};

const LocalService = {
  getAll,
  create,
  update,
  delete: deleteLocal,
  getById,
  getByCampanhaId,
};

export default LocalService;
