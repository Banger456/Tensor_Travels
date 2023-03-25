import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EventBus from "../common/EventBus";

import AddCategory from "./AddCategory";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        if(error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
      }
      }
    );
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin:{content}</h3>
        <AddCategory />
      </header>
    </div>
  );
};

export default BoardUser;