import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventBus from "../common/EventBus";
import { Carousel } from "react-bootstrap";
import { Button, IconButton, Card, CardContent, Modal, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Delete, CheckCircle, Add, Close, Event, ExpandMore, Error } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/system";

import AddCategory from "./AddCategory";
import UserService from "../services/user.service";
import Footer from "./Footer";
import { getPhotos, deletePhoto, approvePhoto, getReportedPhotos, unreportPhoto } from "../actions/Photo";
import { setMessage } from "../actions/message";
import ContestDatesForm from "./ContestDatesForm";


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
    background: "rgba(0,0,0,0.5)",
    padding: "20px",
  },
  adminFunctionsPanel: {
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    background: "rgba(255, 255, 255, 0.1)",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  adminFunctionsButton: {
    marginRight: "10px",
    marginTop: "10px",
  },
  adminFunctionsHeading: {
    color: "white",
  },
  accordion: {
    width: "100%",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&:not(:last-child)": {
      borderBottom: 0,
    },
  },
}));

const BoardUser = () => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContestDatesModalOpen, setIsContestDatesModalOpen] = useState(false);
  const [reportedPhotos, setReportedPhotos] = useState([]);
  const [isReportedPhotosModalOpen, setIsReportedPhotosModalOpen] = useState(false);



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

  useEffect(() => {
    dispatch(getReportedPhotos())
    .then((response) => {
      setReportedPhotos(response);
    })
    .catch(() => {
      setReportedPhotos([]);
    });
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleOpenContestDatesModal = () => {
    setIsContestDatesModalOpen(true);
  };
  
  const handleCloseContestDatesModal = () => {
    setIsContestDatesModalOpen(false);
  };

  const handleOpenReportedPhotosModal = () => {
    setIsReportedPhotosModalOpen(true);
  };
  
  const handleCloseReportedPhotosModal = () => {
    setIsReportedPhotosModalOpen(false);
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

  const handleUnreport = (photoId) => {
    dispatch(unreportPhoto(photoId)) 
      .then(() => {
        setReportedPhotos(
          reportedPhotos.map((photo) =>
            photo._id === photoId ? { ...photo, reports: 0 } : photo
          )
        );
        dispatch(setMessage("Photo unreported successfully."));
      })
      .catch((error) => {
        console.error("Error unreporting photo:", error);
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
                    <Delete color="error"/>
                  </IconButton>
                  {!photo.approved && (
                    <IconButton color="success" onClick={() => handleApprove(photo._id)}>
                      <CheckCircle color="success"/>
                    </IconButton>
                  )}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </CardContent>
      </StyledCard>
    </Grid>
    <Grid container  justifyContent="flex-end">
    <Grid item xs={12} md={4}>
      <Card className={classes.adminFunctionsPanel}>
        <CardContent>
        <Typography variant="h5" gutterBottom className={classes.adminFunctionsHeading}>
          Admin Functions
        </Typography>
          <Grid container justifyContent="flex-start">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              startIcon={<Add />}
              className={classes.adminFunctionsButton}   
            >
              Add Category
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenContestDatesModal}
              startIcon={<Event />}
              className={classes.adminFunctionsButton}
            >
              Set Contest Dates
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenReportedPhotosModal}
              startIcon={<Error />}
              className={classes.adminFunctionsButton}
            >
              Show Reported Photos
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    </Grid>
      <Footer />
  </Grid>
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
        background: "rgba(0,0,0,0)",
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
  <Modal
    open={isContestDatesModalOpen}
    onClose={handleCloseContestDatesModal}
    aria-labelledby="contest-dates-modal-title"
    aria-describedby="contest-dates-modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background:  "rgba(0,0,0,0)",
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
            onClick={handleCloseContestDatesModal}
            aria-label="close"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Close />
          </IconButton>
          <ContestDatesForm />
        </CardContent>
      </StyledCard>
    </Box>
  </Modal>
  <Modal
  open={isReportedPhotosModalOpen}
  onClose={handleCloseReportedPhotosModal}
  aria-labelledby="reported-photos-modal-title"
  aria-describedby="reported-photos-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: "rgba(0,0,0,0)",
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
          onClick={handleCloseReportedPhotosModal}
          aria-label="close"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
        <Carousel>
          {reportedPhotos.map((photo) => (
            <Carousel.Item key={photo._id}>
              <img src={photo.url} alt={photo.fileName} className={classes.carouselImg} />
              <Carousel.Caption>
                <h5>{photo.fileName}</h5>
                <p>Reports: {photo.reports}</p>
                <IconButton color="error" onClick={() => handleDelete(photo._id)}>
                  <Delete color="error" />
                </IconButton>
                <IconButton color="success" onClick={() => handleUnreport(photo._id)}>
                  <CheckCircle color="success"/>
                </IconButton>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </CardContent>
    </StyledCard>
  </Box>
</Modal>
</div>
);
};

export default BoardUser;
