import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
  return axios.get(`${API_URL}/npc`);
};

const create = (npc) => {
  return axios.post(`${API_URL}/npc`, npc);
};

const update = (id, npc) => {
  return axios.put(`${API_URL}/npc/${id}`, { ...npc });
};

const deleteNpc = (id) => {
  return axios.delete(`${API_URL}/npc/${id}`);
};

const getById = (id) => {
  return axios.get(`${API_URL}/npc/${id}`);
};

const getByCampanhaId = (id) => {
  return axios.get(`${API_URL}/npc/campanha/${id}`);
};

const NpcService = {
  getAll,
  create,
  update,
  delete: deleteNpc,
  getById,
  getByCampanhaId,
};

export default NpcService;
