import axios from "axios"
axios.defaults.withCredentials = true

const URL = import.meta.env.VITE_APP_URL;

export const register = async (username, email, password) => {
    const response = await axios.post(URL + "/register", {
        username, email, password
    });
    return response.data;
}

export const login = async (email, password, remember) => {
    const response = await axios.post(URL + "/login", {
        email, password, rememberMe: remember
    });
    return response.data;
}

export const isLoggedIn = async () => {
    const response = await axios.get(URL + "/isloggedin");
    return response.data
}

export const logout = async () => {
    const response = await axios.get(URL + "/logout");
    return response.data;
}