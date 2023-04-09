import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    maxHeight: 'calc(100vh - 210px)',
    borderRadius: "20px",
  },
  heading: {
    color: 'white',
  }
}));



const WinnersModal = ({ open, handleClose, winners }) => {
    const winningPhotos = [...winners.overallTop3, ...Object.values(winners.categoryWinners)];
    const classes = useStyles();

    const getWinnerType = (photo) => {
        const overallWinnerIndex = winners.overallTop3.findIndex((p) => p.url === photo.url);
        let overallWinnerText = '';
        if (overallWinnerIndex !== -1) {
          overallWinnerText = `Overall Winner #${overallWinnerIndex + 1}`;
        }
      
        let categoryWinnerText = '';
        for (const category in winners.categoryWinners) {
          if (winners.categoryWinners[category].url === photo.url) {
            categoryWinnerText = `Category Winner: ${category}`;
            break;
          }
        }
      
        if (overallWinnerText && categoryWinnerText) {
          return `${overallWinnerText} & ${categoryWinnerText}`;
        } else if (overallWinnerText) {
          return overallWinnerText;
        } else {
          return categoryWinnerText;
        }
    };

    const uniqueWinningPhotos = winningPhotos.filter((photo, index, self) =>
        index === self.findIndex((p) => p.url === photo.url)
    );
    
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="winners-modal-title"
        aria-describedby="winners-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            background: 'rgba(0,0,0,0.4)',
            boxShadow: 24,
            p: 4,
            borderRadius: "20px",
            textAlign: 'center',

          }}

        >
          <Typography id="winners-modal-title" variant="h6" component="h2" className={classes.heading}>
            Contest Winners
          </Typography>
          <Carousel interval={null}>
            {uniqueWinningPhotos.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  src={photo.url}
                  alt={photo.fileName}
                  className={classes.image}
                />
                <Carousel.Caption>
                  <h5>{photo.fileName}</h5>
                  <p>Votes: {photo.votes}</p>
                  <p><strong>{getWinnerType(photo)}</strong></p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    );
  };
  
  export default WinnersModal;
  