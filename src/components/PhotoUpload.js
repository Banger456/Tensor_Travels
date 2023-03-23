
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../actions/photo';


const PhotoUpload = () => {
    const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    dispatch(uploadPhoto(file));
  }, [dispatch, user.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div>
      <div>
        {/* ... */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
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