import axios from "axios";

const API = axios.create({
    baseURL: "https://sdp-3-game-club.onrender.com",
});

// Example interceptor for JWT (future use)
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
