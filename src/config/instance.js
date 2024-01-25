import axios from "axios";

const baseURL = "https://kinekuri.xyz";

const instance = axios.create({
  baseURL,
});

export default instance;
