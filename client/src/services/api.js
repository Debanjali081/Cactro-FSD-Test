import axios from "axios";

const instance = axios.create({
  baseURL: "https://cactro-fsd-test.onrender.com", // backend URL
  withCredentials: true,
});

export default instance;
