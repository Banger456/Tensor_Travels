
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../actions/Photo';

//const [selectedCategory, setSelectedCategory] = useState("");



const PhotoUpload = () => {
    const { user } = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("/api/get-categories");
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!selectedCategory) {
      alert("Please select a category before uploading the photo.");
      return;
    }
    dispatch(uploadPhoto(file, user.id));
  }, [selectedCategory, dispatch, user.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        {/* ... */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* ... */}
      </div>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop a photo here, or click to select a file</p>
        )}
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
      </div>
      </div>

  );
};

export default PhotoUpload;