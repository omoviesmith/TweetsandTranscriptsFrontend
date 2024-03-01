import axios from "axios";

//
const axiosInstance = axios.create({
  baseURL: "https://tweets-and-scripts2-0.onrender.com",
  //baseURL: "https://tweets-and-transcript.onrender.com",
  withCredentials: true,
});

//
export default axiosInstance;
