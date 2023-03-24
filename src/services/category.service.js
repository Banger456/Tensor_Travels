
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/categories/";

const addCategory = (name) => {
  return axios.post(API_URL, { name }, { headers: authHeader() });
};

export default {
  addCategory,
};