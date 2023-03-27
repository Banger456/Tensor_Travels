
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CategoryService from "../services/category.service";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    setMessage("");

    CategoryService.addCategory(name).then(
      (response) => {
        setMessage(response.data.message);
        setName("");
      },
      (error) => {
        const _message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(_message);
      }
    );
  };

  return (
    <div>
      <h3>Add New Category</h3>
      <form onSubmit={handleAddCategory}>
        <div>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCategory;