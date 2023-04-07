import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  MenuList,
  Badge,
  Box,
  Popover,
} from "@material-ui/core";
import { styled } from "@mui/system";
import { AccountCircle, Notifications } from "@mui/icons-material";
import { Avatar, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const NavLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  marginLeft: theme.spacing(2),
}));

const SignUpNavLink = styled(NavLink)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "20px",
  padding: theme.spacing(0.5, 1),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    top: "-4px",
    left: "-4px",
    right: "-4px",
    bottom: "-4px",
    zIndex: -1,
  },
}));

const useStyles = makeStyles(() => ({
  transparentAppBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

const CustomMenuPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
}));

const NavigationBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);

  const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");
  const isUser = currentUser && currentUser.roles.includes("ROLE_USER");

  const handleLogout = () => {
    dispatch(logOut());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static" style={{ backgroundColor: "transparent", boxShadow: "none" }}>
      
        <Toolbar>
          <Typography variant="h6" component={NavLink} to="/" noWrap>
            Tensor Travels
          </Typography>
          <Box sx={{ flexGrow: 1, justifyContent: "center" }} display="flex">
            <NavLink to="/contest-view">BEST KLIX</NavLink>
          </Box>
          <Box>
            {isUser && (
              <NavLink to="/user" sx={{ marginRight: 2 }}>
                User Dashboard
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" sx={{ marginRight: 2 }}>
                Admin Dashboard
              </NavLink>
            )}
            {currentUser && (
              <>
                <IconButton
                  color="inherit"
                  aria-label="notifications"
                  sx={{ marginRight: 2 }}
                >
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <Avatar />
                </IconButton>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                  disableScrollLock
                >
                  <MenuList style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <MenuItem component={Link} to="/profile" onClick={handleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </MenuList>
                </Popover>
              </>
            )}
            {!currentUser && (
              <>
                <NavLink to="/login">Login</NavLink>
                <SignUpNavLink to="/register">Sign Up</SignUpNavLink>
              </>
            )}
          </Box>
        </Toolbar>
        </AppBar>
</>
);
};

export default NavigationBar;
