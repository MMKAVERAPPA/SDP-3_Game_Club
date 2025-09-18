import axios from 'axios';

// You can set your backend URL here
const API_URL = 'http://localhost:8080';

export const api = axios.create({
    baseURL: API_URL,
});

export default api;
