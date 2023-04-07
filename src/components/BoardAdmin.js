import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventBus from "../common/EventBus";
import { Carousel } from "react-bootstrap";
import { Button, IconButton, Card, CardContent, Modal, Grid, Box } from "@mui/material";
import { Delete, CheckCircle, Add, Close } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/system";

import AddCategory from "./AddCategory";
import UserService from "../services/user.service";
import Footer from "./Footer";
import { getPhotos, deletePhoto, approvePhoto } from "../actions/Photo";
import { setMessage } from "../actions/message";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: "20px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  background: "rgba(255, 255, 255, 0.1)",
}));

const useStyles = makeStyles(() => ({
  carousel: {
    width: "100%",
    height: "400px",
    borderRadius: "20px",
    overflow: "hidden",
  },
  carouselImg: {
    display: "block",  
    maxWidth :"100%",
    maxHeight: "400px",
    margin: "auto",
    objectFit: "contain",
    borderRadius: "20px",
  },
  carauselControl: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addCategoryCard: {
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    background: "rgba(255,255,255,0.5)",
    padding: "20px",
  }
}));

const BoardUser = () => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    dispatch(getPhotos())
      .then((response) => {
        setPhotos(response);
      })
      .catch(() => {
        setPhotos([]);
      });
  }, [dispatch, currentUser]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  


  const handleDelete = (photoId) => {
    dispatch(deletePhoto(photoId))
      .then(() => {
        setPhotos(photos.filter((photo) => photo._id !== photoId));
        dispatch(setMessage("Photo deleted successfully"));
      })
      .catch((error) => {
        console.error("Error deleting photo:", error);
      });
  };

  const handleApprove = (photoId) => {
    dispatch(approvePhoto(photoId))
      .then(() => {
        setPhotos(
          photos.map((photo) =>
            photo._id === photoId ? { ...photo, approved: true } : photo
          )
        );
        dispatch(setMessage("Photo approved successfully."));
      })
      .catch((error) => {
        console.error("Error approving photo:", error);
      });
  };

  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Carousel>
                {photos.map((photo) => (
                  <Carousel.Item key={photo._id}>
                    <img src={photo.url} alt={photo.fileName} className={classes.carouselImg} />
                    <Carousel.Caption>
                      <h5>{photo.fileName}</h5>
                      <p>Votes: {photo.votes}</p>
                      <p>Approved: {photo.approved ? "Yes" : "No"}</p>
                      <IconButton color="error" onClick={() => handleDelete(photo._id)}>
                        <Delete />
                      </IconButton>
                      {!photo.approved && (
                        <IconButton color="success" onClick={() => handleApprove(photo._id)}>
                          <CheckCircle />
                        </IconButton>
                      )}
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              </CardContent>
          </StyledCard>
          </Grid>
          <Grid item xs={12} md={8}></Grid>
          <Grid item xs={12} md={4}>
            <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            startIcon={<Add />}
            >
            Add Category
          </Button>
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: "rgba(0,0,0,0.6)",
                boxShadow: 24,
                p: 3,
                borderRadius: 5,
              }}
            >
            <StyledCard className={classes.addCategoryCard}>
              <CardContent>
              <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleCloseModal}
                    aria-label="close"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <Close />
                  </IconButton>
                <AddCategory />
              </CardContent>
            </StyledCard>
            </Box>
          </Modal>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default BoardUser;
