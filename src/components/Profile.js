import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getPhotos } from "../actions/Photo";
import Footer from "./Footer"; 

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

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    dispatch(getPhotos(currentUser._id)).then((response) => {
      console.log(response);
      if (response) {
          setPhotos(groupPhotosByCategory(response));
        } else {
          console.error("No data received from the server");
        }
    });
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            backgroundColor: "rgba(255,255,255,0.1)", 
            color:"#eceff1",
            borderRadius: 4
            }}>
          <CardContent sx={{ textAlign: 'center'}}>
            <Typography variant="h4">
              Your Submissions.
            </Typography>
              <Carousel>
                {Object.keys(photos).map((category) => (
                  photos[category].map((photo) => (
                    <Carousel.Item key={photo._id}>
                      <img 
                        className="d-block w-100"
                        src={photo.url}
                        alt={photo.fileName}
                        style={{
                          height:'400px', 
                          width: '400px', 
                          objectFit: 'contain',
                          objectPosition: 'center center'
                        }}
                      />
                      <Carousel.Caption>
                        <h5>{photo.title}</h5>
                        <p>{photo.votes} Votes</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))
                ))}
              </Carousel>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#eceff1",
              borderRadius: 4,
              textAlign: 'right',
              padding: '50px'
            }}
            >
            <CardContent>
              <img
                src="https://i.imgur.com/VRuEljj.jpg"
                alt="User profile"
                className="rounded-circle img-thumbnail"
              />
              <Typography variant="h5" component="div">
                <strong>{currentUser.username}</strong>
              </Typography>
              <Typography variant="body2" color="#cfd8dc">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    <Footer />
    </>
  );
};

export default Profile;