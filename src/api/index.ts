import axios from "axios";

// Aquí configuraremos la URL base de tu backend cuando esté listo
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("erp_token"); // O el nombre que uses
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
