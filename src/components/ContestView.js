import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../actions/Photo";
import { vote } from "../actions/Photo";
import { Card, Carousel, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Footer from './Footer';
//import "./ContestView.css";

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

const useStyles = makeStyles(() => ({
  card :{
    marginBotton: "20px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
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

    const classes = useStyles();
  
    return (
      <div className="container" style={{ backgroundColor: "transparent", color: "white", textAlign: 'center' }}>
      {Object.keys(photos).map((category) => (
        <div key={category} className="category-box">
          <h2>{category}</h2>
          <div className="row">
            <div className="photo-container">
              <Card className={classes.card} text="white" style={{backgroundColor: "rgba(0,0,0,0.5)" }}>
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
                      <Carousel.Caption>
                        <h5>{photo.fileName}</h5>
                        <p>Votes: {photo.votes}</p>
                        {isLoggedIn && (
                          <>
                            <Button
                              variant="primary"
                              className="mr-2"
                              onClick={() => handleVote(photo._id)}
                            >
                              Vote
                            </Button>
                            <Button
                              variant="danger"
                              style={{ marginLeft: "10px" }}
                              onClick={() => handleReport(photo._id)}
                            >
                              Report
                            </Button>
                          </>
                        )}
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default ContestView;

          
        