
import React, { useCallback } from 'react';
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

  return (
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
  );
};

export default PhotoUpload;