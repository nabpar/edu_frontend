import axios from "axios";
import { BACKEND_DOMAIN } from "./constants";

const BASE_URL=BACKEND_DOMAIN

export default axios.create({
   baseURL: "https://napa.pythonanywhere.com/",
  baseURL: BASE_URL
});
