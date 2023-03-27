import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions/Photo";
import { vote } from "../actions/Photo";
import Footer from './Footer';
import "./ContestView.css";

const groupPhotosByCategory = (photos) => {
    const groupedPhotos = {};

    photos.forEach((photo) => {
        if (!groupedPhotos[photo.category.name]){
            groupedPhotos[photo.category.name] = [];
        }
        groupedPhotos[photo.category.name].push(photo);
    });
    return groupedPhotos;
};

const ContestView = () => {
    const [photos, setPhotos] = useState([]);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(getPhotos()).then((response) => {
        console.log(response);
        if (response) {
            setPhotos(groupPhotosByCategory(response));
          } else {
            console.error("No data received from the server");
          }
      });
    }, [dispatch]);

    const handleVote = (photoId) => {
        dispatch(vote(photoId)).then(() => {
            // Refresh the photos after voting
            dispatch(getPhotos()).then((response) => {
                setPhotos(groupPhotosByCategory(response));
            });
        });
    };

    const handleReport = (photoId) => {
    // Handle report action here
    console.log("Report photo with ID:", photoId);
    }
  
    return (
    <div className="container">
      {Object.keys(photos).map((category) => (
        <div key={category} className="category-box">
          <h2>{category}</h2>
          <div className="row">
            <div className="photo-container">
              {photos[category].map((photo) => (
                <div className="photo-card" key={photo._id}>
                  <img src={photo.url} alt={photo.fileName} />
                  <div className="photo-info">
                    <h5>{photo.fileName}</h5>
                    <p>Votes: {photo.votes}</p>
                    {isLoggedIn && (
                      <>
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => handleVote(photo._id)}
                        >
                          Vote
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReport(photo._id)}
                        >
                          Report
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContestView;

          
        