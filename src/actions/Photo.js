
import { SET_MESSAGE } from './types';
import PhotoService from '../services/photo.service';

export const uploadPhoto = (file, category, filename) => (dispatch) => {
  return PhotoService.upload(file, category, filename).then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getPhotos = () => (dispatch) => {
  return PhotoService.getPhotos().then(
    (response) => {
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject(message);
    }
  );
};

export const getUserPhotos = () => (dispatch) => {
  return PhotoService.getUserPhotos().then(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject(message);
    }
  );
};


export const vote = (photoId) => (dispatch) => {
  return PhotoService.vote(photoId).then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deletePhoto = (photoId) => (dispatch) => {
  return PhotoService.deletePhoto(photoId).then(
    () => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Photo deleted successfully!",
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const approvePhoto = (photoId) => (dispatch) => {
  return PhotoService.approvePhoto(photoId).then(
    () => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Photo approved successfully!",
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
