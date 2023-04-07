import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../actions/Photo';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Select, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dropzone: {
    height: 200,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing(2),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
}));

const PhotoUpload = () => {
  const classes = useStyles();
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
    dispatch(uploadPhoto(file, selectedCategory));
  }, [selectedCategory, dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" style={{ color: "white" }}>Select a category:</Typography>
          <Select value={selectedCategory} onChange={handleCategoryChange} fullWidth>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={8} container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <div {...getRootProps()} className={classes.dropzone}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography variant="body1">Drop the file here...</Typography>
              ) : (
                <div>
                  <CloudUploadIcon />
                  <Typography variant="body1">Drag and drop a photo here</Typography>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6} container spacing={3} justify="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component="label"
                className={classes.browseButton}
              >
                Browse
                <input type="file" hidden {...getInputProps()} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                className={classes.uploadButton}
                disabled={!selectedCategory}
                onClick={onDrop}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
  
};

export default PhotoUpload;


            
