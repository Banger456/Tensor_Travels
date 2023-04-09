import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../actions/Photo';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  browseButton: {
    marginBottom: theme.spacing(2),
  },
  whiteSelect: {
    color: 'white',
  },
  whiteInput: {
    color: 'white',
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    color: 'white',
  },
}));

const PhotoUpload = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);

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

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };

  const handleFileChange = (files) => {
    setFile(files[0]);
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      alert("Please select a category before uploading the photo.");
      return;
    }
    dispatch(uploadPhoto(file, selectedCategory));
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Share Your Amazing Photos!
      </Typography>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.whiteSelect}>Choose a category!:</Typography>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            fullWidth
            className={classes.whiteSelect}
          >
            <MenuItem value="">Select a category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.whiteSelect}>Name your Photo!:</Typography>
          <TextField
            value={filename}
            onChange={handleFilenameChange}
            fullWidth
            InputProps={{
              className: classes.whiteInput,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText="Drag and drop a photo here"
            filesLimit={1}
            maxFileSize={5000000}
            onChange={handleFileChange}
            showPreviews={true}
            showPreviewsInDropzone={false}
            showAlerts={false}
            useChipsForPreview
          />
        </Grid>
        <Grid item xs={12} md={6} container spacing={3} justifyContent="center" direction="column" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component="label"
              className={classes.browseButton}
            >
              Browse
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              className={classes.uploadButton}
              disabled={!selectedCategory || !file}
              onClick={handleSubmit}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PhotoUpload;
