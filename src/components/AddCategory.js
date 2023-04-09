import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CategoryService from "../services/category.service";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(3),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    color: 'white',
  }
}));

const AddCategory = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    setMessage("");

    CategoryService.addCategory(name).then(
      (response) => {
        setMessage(response.data.message);
        setName("");
      },
      (error) => {
        const _message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(_message);
      }
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" className={classes.heading}>
        Add New Category
      </Typography>
      <Box component="form" onSubmit={handleAddCategory} className={classes.formContainer}>
        <TextField
          fullWidth
          id="name"
          label="Category Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classes.formField}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Add Category
        </Button>
      </Box>
      {message && (
        <Alert severity={message.includes("successfully") ? "success" : "error"} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default AddCategory;
