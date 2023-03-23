
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/photos/';

const upload = (file, id) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('userId', id);

  return axios.post(API_URL + 'upload', formData, {
    headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data',
    },
  });
};

const vote = (id) => {
  return axios.put(API_URL + "photos/" + id + "/vote", {}, { headers: authHeader() });
};

const getPhotos = () => {
  return axios.get(API_URL + "photos/files");
}
export default {
  upload,
  vote,
};