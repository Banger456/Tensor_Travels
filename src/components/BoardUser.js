import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Modal, IconButton } from '@material-ui/core';
import PhotoUpload from "./PhotoUpload";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Footer from './Footer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    color: "white",
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: "white",
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    
  },
  modalContent: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: "20px",
  },
  closeButton: {
    top: 0,
    right: 0,
    color: "white",
  },
}));

const BoardUser = () => {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    UserService.getUserBoard().then(
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
    );
  }, []);

  const handleUploadButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <header className={classes.header}>
            <Typography variant="h4" align="center" gutterBottom>
              Enter the Contest
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Follow these simple steps to enter the contest:
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              1. Take a photo.
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              2. Upload the photo using the button below.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.uploadButton}
              onClick={handleUploadButtonClick}
            >
              Upload Photo
            </Button>
          </header>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <div className={classes.modalContent}>
      <IconButton
        className={classes.closeButton}
        edge="end"
        color="inherit"
        onClick={handleCloseModal}
        aria-label="close"
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
      <CloseRoundedIcon />
      </IconButton>
          <PhotoUpload />
        </div>
      </Modal>
      <Footer />
    </Container>
  );
};

export default BoardUser;
