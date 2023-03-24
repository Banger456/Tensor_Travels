import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EventBus from "./common/EventBus";



import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import NavigationBar from "./components/NavBar";

import { logOut } from "./actions/auth";
import { clearMessage } from "./actions/message";
import ContestView from "./components/ContestView";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location.pathname]);

  const logOutuser = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout",() => {
      logOutuser();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOutuser]);

  return (
    
      <div>
        <NavigationBar logOut={logOutuser} />

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contest-view" element={<ContestView />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    
  );
};




export default App;