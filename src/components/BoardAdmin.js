import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EventBus from "../common/EventBus";

import AddCategory from "./AddCategory";
import UserService from "../services/user.service";
import Footer from './Footer';
import { getPhotos, deletePhoto, approvePhoto } from "../actions/Photo";
import { setMessage } from "../actions/message";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [photos, setPhotos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    dispatch(getPhotos())
      .then((response) => {
        setPhotos(response);
      })
      .catch(() => {
        setPhotos([]);
      });

    /*UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        if(error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
      }
      }
    );*/
  }, [dispatch, currentUser]);

  const handleDelete = (photoId) => {
    dispatch(deletePhoto(photoId))
      .then(() => {
        setPhotos(photos.filter((photo) => photo._id !== photoId));
        dispatch(setMessage("Photo deleted successfully" ));
      })
      .catch((error) => {
        console.error("Error deleting photo:", error);
      });
  };

  const handleApprove = (photoId) => {
    dispatch(approvePhoto(photoId))
      .then(() => {
        setPhotos(
          photos.map((photo) => 
            photo._id === photoId ? { ...photo, approved: true } : photo
            )
        );
          dispatch(setMessage("Photo approved successfully." ));
      })
      .catch((error) => {
        console.error("Error approving photo:", error);
      });
  };


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin:{content}</h3>
        <AddCategory />
      </header>
    
      <div className="row">
        {photos.map((photo) => (
          <div className="col-md-4" key={photo._id}>
            <div className="card mb-4">
              <img src={photo.url} alt={photo.fileName} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{photo.fileName}</h5>
                <p>Votes: {photo.votes}</p>
                <p>Approved: {photo.approved ? "Yes" : "No"}</p>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDelete(photo._id)}
                >
                  Delete
                </button>
                {!photo.approved && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleApprove(photo._id)}
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BoardUser;