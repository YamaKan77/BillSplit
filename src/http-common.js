import axios from "axios";

export default axios.create({
	// baseURL: "http://localhost:3000/api",
	// baseURL: "http://192.168.0.18:3000/api",
  baseURL: "https://divyup.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
