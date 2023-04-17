import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../actions/Photo';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneArea } from 'material-ui-dropzone';
import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';

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
  const [uploadedCategories, setUploadedCategories] = useState(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

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

  const showAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };

  const handleFileChange = (files) => {
    setFile(files[0]);
    if (files.length > 0) {
      showAlert("info", `File selected: ${files[0].name}`);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategory) {
      showAlert("warning", "Please select a category before uploading the photo.");
      return;
    }
    if (!filename) {
      showAlert("warning", "Please enter a name for your photo before uploading.");
      return;
    }
    await dispatch(uploadPhoto(file, selectedCategory, filename));
    setUploadedCategories((prev) => new Set([...prev, selectedCategory]));
  };

  return (
    <Container className={classes.root}>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
      {alertMessage}
      </Alert>
    </Snackbar>
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
          onDrop={handleFileChange}
          showPreviews={true}
          showPreviewsInDropzone={false}
          showAlerts={false}
          useChipsForPreview
          disabled={uploadedCategories.has(selectedCategory)}
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
            disabled={!selectedCategory || !file || uploadedCategories.has(selectedCategory)}
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
