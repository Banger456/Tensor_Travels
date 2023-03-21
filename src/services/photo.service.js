
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/photos/';

const upload = (file, userId) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);

  return axios.post(API_URL + 'upload', formData, {
    headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default {
  upload,
};