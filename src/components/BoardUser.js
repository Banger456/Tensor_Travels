import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, Link } from 'react-router-dom';
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

  const [contestOver, setContestOver] = useState(false);
  const [contestStartDate, setContestStartDate] = useState(null);
  const [contestEndDate, setContestEndDate] = useState(null);

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

  useEffect(() => {
    const fetchContestDates = async () => {
      try {
        const response = await axios.get("/api/contest/get-contest-dates");
        setContestStartDate(new Date(response.data.startDate));
        setContestEndDate(new Date(response.data.endDate));
      } catch (error) {
        console.error("Error fetching contest dates:", error);
      }
    };

    fetchContestDates();
  }, []);

  useEffect(() => {
    const now = new Date();

    if (contestEndDate && now >= contestEndDate) {
      setContestOver(true);
    }
  }, [contestEndDate]);
  

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
              disabled={contestOver}
            >
              Upload Photo
            </Button>
          </header>
          {contestOver && (
              <Typography variant="body1" align="center" gutterBottom>
                The contest is over.{" "}
                <Link to="/contest-view">
                  Click here to view the winner and other submissions.
                </Link>
              </Typography>
            )}
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
