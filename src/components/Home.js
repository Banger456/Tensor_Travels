import React, { useState, useEffect } from "react";

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="video-container">
        <video src="./src/Tensor_Travels.mp4" autoPlay loop muted />
      </div>
      <div className="auth-container">
        <h1>Welcome to Tensor Travels</h1>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/register" className="auth-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
