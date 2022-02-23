import axios from "axios";

export default axios.create({
    baseURL: "https://frozen-bastion-26115.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

