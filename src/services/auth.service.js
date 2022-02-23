import axios from "axios";
import httpCommon from "../http-common";

const API_URL = "https://frozen-bastion-26115.herokuapp.com/api/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", { email, password })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    async register(
        name,
        phone_no,
        address,
        email,
        password,
        password_confirmation,
        role
    ) {
        try {

            const data = {
                name: name,
                role: role,
                phone_no,
                email,
                address,
                password,
                password_confirmation
            }

            return await httpCommon.post(
                "/register", JSON.stringify(data), {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                }
            );
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthService();