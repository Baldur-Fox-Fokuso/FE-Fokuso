import axios from "axios";

const baseURL = "https://b6db-103-165-209-194.ngrok-free.app";

const instance = axios.create({
  baseURL,
});

export default instance;
