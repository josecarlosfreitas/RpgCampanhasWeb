import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/historia`);
};

const create = (campaign) => {
  return axios.post(`${API_URL}/historia`, campaign);
};

const update = (id, campaign) => {
  return axios.put(`${API_URL}/historia/${id}`, campaign);
};

const deleteHistoria = (id) => {
  return axios.delete(`${API_URL}/historia/${id}`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/historia/${id}`);
};

const getByCampanhaId = (id) => {
  return axios.get(`${API_URL}/historia/campanha/${id}`);
};

const HistoriaService = {
  getAll,
  create,
  update,
  delete: deleteHistoria,
  getById,
  getByCampanhaId,
};

export default HistoriaService;
