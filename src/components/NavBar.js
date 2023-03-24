import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = ({ logOut }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const isAdmin = currentUser && currentUser.roles.includes("ROLE_ADMIN");
  const isUser = currentUser && currentUser.roles.includes("ROLE_USER");

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
              <NavDropdown.Item onClick={logOut}>
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