import axios from "axios";

export default axios.create({
  baseURL: "https://divyup.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
