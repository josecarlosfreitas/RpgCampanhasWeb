import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const uploadImage = (formData) => {
  return axios.post(`${API_URL}/image/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const ImageService = {
  uploadImage,
};

export default ImageService;
