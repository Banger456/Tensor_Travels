import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from '../actions/auth';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");
  const isUser = currentUser && currentUser.roles.includes("ROLE_USER");

  const handleLogout = () => {
    dispatch(logOut());
  };
   

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Tensor Travels
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {isUser && (
            <Nav.Link as={Link} to="/user">
              User Dashboard
            </Nav.Link>
          )}
          {isAdmin && (
            <Nav.Link as={Link} to="/admin">
              Admin Dashboard
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/contest-view">
            Contest View
          </Nav.Link>
          {currentUser && (
            <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {!currentUser && (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;