import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions/photo";

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
        setPhotos(groupPhotosByCategory(response.data));
      });
    }, [dispatch]);

    const handleVote = (photoId) => {
        dispatch(vote(photoId)).then(() => {
            // Refresh the photos after voting
            dispatch(getPhotos()).then((response) => {
                setPhotos(groupPhotosByCategory(response.data));
            });
        });
    };

    const handleReport = (photoId) => {
    // Handle report action here
    console.log("Report photo with ID:", photoId);
    }
  
    return (
        
        <div className="container">
            <h1>Contest View</h1>
            {Object.keys(photos).map((category) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className="row">
                    {photos[category].map((photo) => (
                        <div className="col-md-4" key={photo._id}>
                            <div className="card">
                                <img src={photo.url} alt={photo.fileName} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{photo.fileName}</h5>
                                    <p className="card-text">Votes: {photo.votes}</p>
                                    {isLoggedIn && (
                                        <>
                                            <button className="btn btn-primary mr-2" onClick={() => handleVote(photo._id)}>
                                                Vote
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleReport(photo._id)}>
                                                Report
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
          
          
  
export default ContestView;