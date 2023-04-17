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
  Drawer,
  Hidden,
} from "@material-ui/core";
import { styled } from "@mui/system";
import { AccountCircle, Notifications, Menu } from "@mui/icons-material";
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

  const drawer = (
    <div>
      <MenuList style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
        <MenuItem component={Link} to="/contest-view">
          BEST KLIX
        </MenuItem>
        {isUser && (
          <MenuItem component={Link} to="/user">
            User Dashboard
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem component={Link} to="/admin">
            Admin Dashboard
          </MenuItem>
        )}
        {currentUser && (
          <>
            <MenuItem component={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </>
        )}
        {!currentUser && (
          <>
            <MenuItem component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem component={Link} to="/register">
              Sign Up
            </MenuItem>
          </>
        )}
      </MenuList>
    </div>
  );

  return (
    <>
      <AppBar position="static" className={classes.transparentAppBar}>
        <Toolbar>
          <Hidden smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setAnchorEl((prev) => !prev)}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <Typography variant="h6" component={NavLink} to="/" noWrap>
            Tensor Travels
          </Typography>
          <Hidden xsDown>
          <Box sx={{ flexGrow: 1, justifyContent: "center" }} display="flex">
            <NavLink to="/contest-view">BEST KLICK</NavLink>
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
        </Hidden>
      </Toolbar>
    </AppBar>
    <nav>
        <Hidden smUp>
          <Drawer
            anchor="left"
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
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
                </Hidden>
      </nav>
</>
);
};

export default NavigationBar;
