/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";
// eslint-disable-next-line import/no-cycle

export const api = axios.create({
  baseURL: "https://stm-nest.onrender.com",
  withCredentials: true,
});

let getCsrfToken = () => null;

// Chamado uma vez no bootstrap da app, depois que o store já existe
export function configureCsrfTokenGetter(getter) {
  getCsrfToken = getter;
}

const MUTATING_METHODS = ["post", "put", "patch", "delete"];

api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (method && MUTATING_METHODS.includes(method)) {
    const token = getCsrfToken();
    if (token) {
      config.headers["x-csrf-token"] = token;
    }
    // Se não houver token aqui, o request vai falhar com 403 no backend.
    // Isso é intencional: é melhor falhar alto do que mandar sem proteção.
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      const { data } = error.response;
      if (data?.message?.toLowerCase().includes("csrf")) {
        // Marca o erro para a saga identificar e disparar refreshCsrfToken
        error.isCsrfError = true;
      }
    }
    return Promise.reject(error);
  }
);

// Intercepta respostas com 401 e tenta renovar o token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response.data.message === "Token expirado") ||
      (error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response.data.message === "Não logado")
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
