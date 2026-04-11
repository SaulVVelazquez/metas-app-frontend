// import axios from 'axios';

// const API_URL = "http://127.0.0.1:8000";

// const api = axios.create({ baseURL: API_URL });

// api.interceptors.request.use(config => {
//     const userId = localStorage.getItem("user_id");
//     const rol = localStorage.getItem("rol");
//     if (userId) config.headers["x-user-id"] = userId;
//     if (rol) config.headers["x-rol"] = rol;
//     return config;
// });

// export default api;


import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

// Interceptor para inyectar automáticamente los headers de seguridad
api.interceptors.request.use(config => {
    const userId = localStorage.getItem("user_id");
    const rol = localStorage.getItem("rol");

    if (userId) config.headers['x-user-id'] = userId;
    if (rol) config.headers['x-rol'] = rol;

    return config;
});

export default api;