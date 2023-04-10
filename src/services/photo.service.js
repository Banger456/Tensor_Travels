
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
  return axios.post(API_URL + "vote/", {photoId}, { headers: authHeader() });
};

const getPhotos = () => {
  return axios.get(API_URL + "photos/get-photos", { headers: authHeader() });
}

const getUserPhotos = () => {
  return axios.get(API_URL + "photos/get-user-photos", { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};


const deletePhoto = (photoId) => {
  return axios.delete(API_URL + `photos/${photoId}`, { headers: authHeader() });
};

const approvePhoto = (photoId) => {
  return axios.put(API_URL + `photos/${photoId}/approve`, {}, { headers: authHeader() });
};

const report = (photoId) => {
  return axios.post(API_URL + `photos/${photoId}/report`, {}, { headers: authHeader() });
};

const getReportedPhotos = () => {
  return axios.get(API_URL + "photos/reported-photos", { headers: authHeader() });
};

const unreportPhoto = (photoId) => {
  return axios.put(`${API_URL}photos/${photoId}/unreport`, {}, { headers: authHeader() });
};

const photoService = {
  upload,
  vote,
  getPhotos,
  deletePhoto,
  approvePhoto,
  getUserPhotos,
  report,
  getReportedPhotos,
  unreportPhoto,
};
export default photoService;