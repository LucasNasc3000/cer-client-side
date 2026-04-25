/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true,
});

// Intercepta respostas com 401 e tenta renovar o token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "Token expirado"
    ) {
      originalRequest._retry = true;

      try {
        // Chama o endpoint de refresh (usa o refresh_token do cookie)
        await api.post("/refresh");

        // Repete a requisição original com o novo token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh falhou — redireciona para login
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
