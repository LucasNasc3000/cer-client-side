/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";
// eslint-disable-next-line import/no-cycle

export const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
});

let getCsrfToken = () => null;
let currentCsrfToken = null;

export function configureCsrfTokenGetter(getter) {
  getCsrfToken = getter;
}

export function setCurrentCsrfToken(token) {
  currentCsrfToken = token;
}

const MUTATING_METHODS = ["post", "put", "patch", "delete"];

api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (method && MUTATING_METHODS.includes(method)) {
    const token = currentCsrfToken || getCsrfToken();
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
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";

    // Rotas internas dos interceptors nunca devem ser retentadas
    const isInternalRoute =
      requestUrl.includes("/refresh") || requestUrl.includes("/csrf-token");

    // Marca erros CSRF para o helper callWithCsrfRetry identificar
    if (
      error.response?.status === 403 &&
      !originalRequest._csrfRetry &&
      !isInternalRoute &&
      error.response.data?.message?.toLowerCase().includes("csrf")
    ) {
      originalRequest._csrfRetry = true;

      try {
        // Busca token novo diretamente, sem passar pelo Redux/saga
        const tokenResponse = await api.get("/auth/csrf-token");
        const newToken = tokenResponse.data.csrfToken;

        // Atualiza o getter pra próximas requests
        // (você precisa expor uma função setter no axios.js)
        setCurrentCsrfToken(newToken);

        // Retenta a request original com o token novo no header
        originalRequest.headers["x-csrf-token"] = newToken;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Tenta renovar JWT em caso de 401
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isInternalRoute &&
      (error.response.data.message === "Token expirado" ||
        error.response.data.message === "Não logado")
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Refresh falhou:",
          refreshError.response?.status,
          refreshError.response?.message
        );

        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
