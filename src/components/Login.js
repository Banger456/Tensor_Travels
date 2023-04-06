import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import { login } from "../actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Footer from "./Footer";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

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

const Login = () => {
  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", '& .MuiTextField-root': { m: 1.5, width: '30ch' }, }}>
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
            LOGIN
          </Typography>

          <Form onSubmit={handleLogin} ref={form}>
            <Box mb={2}>
              <TextField
                fullWidth
                required
                label="Username"
                variant="outlined"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockRoundedIcon/>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            
            <Box mb={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ borderRadius: "20px"}}
          >
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )}
            Login
          </Button>
        </Box>

        {message && (
          <Box mb={2}>
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </Box>
        )}
        <Typography variant="body2" align="center">
          Don't have an account? {" "}
          <Link to="/register">Sign Up</Link>
        </Typography>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </CardContent>
  </StyledCard>
</Box>
<Footer />
</>

);
};

export default Login;
           
