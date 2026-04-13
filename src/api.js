import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

// Interceptor para enviar los headers que la API espera: x-user-id y x-rol
api.interceptors.request.use(config => {
    const userId = localStorage.getItem("user_id");
    const rol = localStorage.getItem("rol");

    if (userId) config.headers['x-user-id'] = userId;
    if (rol) config.headers['x-rol'] = rol;

    return config;
});

export default api;