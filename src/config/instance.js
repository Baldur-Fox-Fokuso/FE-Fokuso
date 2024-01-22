import axios from "axios";

const baseURL = "http://10.20.49.115:3000";

const intsance = axios.create({
  baseURL,
});

export default intsance;
