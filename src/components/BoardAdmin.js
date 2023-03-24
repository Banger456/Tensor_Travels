import React, { useState, useEffect } from "react";

import AddCategory from "./AddCategory";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

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
      }
    );
  }, []);

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