import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  CardContent,
  Box,
  Alert,
  OutlinedInput,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import styled from "@emotion/styled";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//using isEmail from validator to validate email address.
import { isEmail } from "validator";
import Footer from "./Footer";

import { register } from "../actions/auth";

const ImageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: "rgba(255,255,255,0.2)",
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(2),
  },
}));

const required = (value) => {
  if (!value) {
    return "This field is required!";
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return "This is not a valid email.";
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "The username must be between 3 and 20 characters.";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "The password must be between 6 and 40 characters.";
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleTermsCheck = (e) => {
    setTermsChecked(e.target.checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
          navigate('/login');
          window.location.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <>
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",'& .MuiTextField-root': { m: 1.5, width: '30ch' }, }}>
      <StyledCard>
        <CardContent>
          <ImageWrapper>
            <img
              src="https://i.imgur.com/AEwRGg1.png"
              alt="profile-img"
              style={{ width: "50%" }}
            />
          </ImageWrapper>

          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
            SIGN UP
          </Typography>

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                           <AccountCircleRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ borderRadius: "20px" }}
                  />
                </div>

                <div className="form-group">
                  
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <EmailRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ borderRadius: "20px" }}
                  />
                </div>

                <div className="form-group">
                  
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockRoundedIcon/>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ borderRadius: '20px' }}
                    InputLabelProps={{ position: "center" }}
                  />
                </div>

                <div className="form-group">
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Checkbox
                    checked={termsChecked}
                    onChange={handleTermsCheck}
                    sx={{ color: 'primary.main' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    I accept the <a href="/terms">Terms and Conditions.</a>
                  </Typography>
                </Grid>
              </Grid>
            </div>

                <div className="form-group">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    style={{ borderRadius: "20px" }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <Alert severity={successful ? "success" : "error"}>
                  {message}
                </Alert>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </CardContent>
      </StyledCard>
    </Box>
    <Footer />
    </>
  );
};

export default Register;