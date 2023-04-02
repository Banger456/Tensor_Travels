
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

const upload = (file, category) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  return axios.post(API_URL + 'photos/upload', formData, {
    headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data',
    },
  });
};

const vote = (photoId) => {
  return axios.put(API_URL + "vote/" + photoId, {}, { headers: authHeader() });
};

const getPhotos = () => {
  return axios.get(API_URL + "photos/get-photos", { headers: authHeader() });
}

const deletePhoto = (photoId) => {
  return axios.delete(`/api/photos/${photoId}`, { headers: authHeader() });
};

const approvePhoto = (photoId) => {
  return axios.put(`/api/photos/${photoId}/approve`, {}, { headers: authHeader() });
};

const photoService = {
  upload,
  vote,
  getPhotos,
  deletePhoto,
  approvePhoto,
};
export default photoService;