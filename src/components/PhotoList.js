
import React, { useState, useEffect } from "react";
import PhotoService from "../services/photo.service";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos and set state
  }, []);

  const handleVote = async (id) => {
    try {
      const response = await PhotoService.vote(id);
      const updatedPhoto = response.data.photo;

      setPhotos(
        photos.map((photo) => (photo._id === updatedPhoto._id ? updatedPhoto : photo))
      );
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo._id}>
          <img src={photo.url} alt={photo.fileName} />
          <p>Votes: {photo.votes}</p>
          <button onClick={() => handleVote(photo._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;