import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/campanha`);
};

const create = (campaign) => {
  return axios.post(`${API_URL}/campanha`, campaign);
};

const update = (id, campaign) => {
  return axios.put(`${API_URL}/campanha/${id}`, campaign);
};

const deleteCampanha = (id) => {
  return axios.delete(`${API_URL}/campanha/${id}`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/campanha/${id}`);
};

const CampanhaService = {
  getAll,
  create,
  update,
  delete: deleteCampanha,
  getById,
};

export default CampanhaService;
