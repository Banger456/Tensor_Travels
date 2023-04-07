import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions/Photo";
import { vote } from "../actions/Photo";
import { Carousel } from "react-bootstrap";
import { makeStyles, styled, useTheme } from "@material-ui/core/styles";
import Footer from './Footer';
import { Container, Typography, Card, Button, Grid, Paper, Box, IconButton, Tooltip } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FlagIcon from "@material-ui/icons/Flag";

const groupPhotosByCategory = (photos) => {
    const groupedPhotos = {};

    photos.forEach((photo) => {
        if (!groupedPhotos[photo.category.name]){
            groupedPhotos[photo.category.name] = [];
        }
        groupedPhotos[photo.category.name].push(photo);
    });
    return groupedPhotos;
};

const CategoryHeading = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
  display: "inline-block",
  padding: theme.spacing(0, 1),
  color: "#ffffff",
}));

const useStyles = makeStyles((theme) => ({
  card :{
    marginBotton: theme.spacing(4),
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  carousel: {
    width: "100%",
    height: "400px",
    borderRadius: "20px",
    overflow: "hidden",
  },
  carouselImage: {
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
  categoryHeading: {
    marginTop: "40px",
    marginBottom: "20px",
    borderBottom: "3px solid white",
    display: "inline-block",
    padding: "0 10px",
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  heading: {
    color: "#ffffff",
    marginBottom: theme.spacing(4),
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    transition: "background-color 0.3s",
  },
  carouselCaption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 1),
    color: "#ffffff",
    borderRadius: "20px",
  },
}));

const ContestView = () => {
    const [photos, setPhotos] = useState([]);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(getPhotos()).then((response) => {
        console.log(response);
        if (response) {
            setPhotos(groupPhotosByCategory(response));
          } else {
            console.error("No data received from the server");
          }
      });
    }, [dispatch]);

    const handleVote = (photoId) => {
        dispatch(vote(photoId)).then(() => {
            // Refresh the photos after voting
            dispatch(getPhotos()).then((response) => {
                setPhotos(groupPhotosByCategory(response));
            });
        });
    };

    const handleReport = (photoId) => {
    // Handle report action here
    console.log("Report photo with ID:", photoId);
    }
    const theme = useTheme();
    const classes = useStyles();
    
  
    return (
      <Container maxWidth="lg" sx={{ bgcolor: "transparent", color: "white", textAlign: 'center', py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom className={classes.heading}>
        Discover Amazing Submissions
      </Typography>
      <Grid container spacing={4}>
      {Object.keys(photos).map((category) => (
        <Grid item xs={12} key={category}>
        <Box key={category} className="category-box">
          <CategoryHeading variant="h5" component="h2">
            {category}
          </CategoryHeading>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.card}>
                <Carousel
                  className={classes.carousel}
                  interval={null}
                  controls={photos[category].length > 1}
                  nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
                  prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
                >
                  {photos[category].map((photo) => (
                    <Carousel.Item key={photo._id}>
                      <img
                        className={classes.carouselImage}
                        src={photo.url}
                        alt={photo.fileName}
                      />
                      <Carousel.Caption className={classes.carouselCaption}>
                      <div className={classes.captionBackground}>
                        <h5>{photo.fileName}</h5>
                        <p>Votes: {photo.votes}</p>
                        {isLoggedIn && (
                          <>
                          <Tooltip title="Vote">
                            <IconButton
                              aria-label="vote"
                              color="primary"
                              onClick={() => handleVote(photo._id)}
                              className={classes.iconButton}
                            >
                              <ThumbUpIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Report">
                            <IconButton
                              aria-label="report"
                              color="secondary"
                              onClick={() => handleReport(photo._id)}
                              className={classes.iconButton}
                            >
                              <FlagIcon />
                            </IconButton>
                          </Tooltip>
                          </>
                        )}
                        </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        </Grid>
      ))}
      </Grid>
      <Footer />
    </Container>
  );
};

export default ContestView;

          
        