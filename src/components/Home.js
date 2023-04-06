import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import Footer from "./Footer";
import "./Home.css";

const HomePage = () => {
  return (
    <>
      <div className="page-header header-filter">
        <div
          className="page-header-image"
        ></div>
        <div className="content-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h1 className="title">Welcome to Tensor Travels</h1>
                <h5 className="description">
                  Discover the best travel destinations and experiences with Tensor Travels.
                </h5>
                <br />
                <div className="auth-buttons">
                  <Link to="/login">
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      id="tooltip-login"
                      size="lg"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                    </Button>
                  </Link>
                  <UncontrolledTooltip delay={0} target="tooltip-login">
                    Login
                  </UncontrolledTooltip>
                  <Link to="/register">
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      id="tooltip-signup"
                      size="lg"
                    >
                      <i className="fas fa-user-plus"></i>
                    </Button>
                  </Link>
                  <UncontrolledTooltip delay={0} target="tooltip-signup">
                    Sign Up
                  </UncontrolledTooltip>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;