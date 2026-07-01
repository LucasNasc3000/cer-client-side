import { call, put } from "redux-saga/effects";
import { api } from "../services/axios";
import * as actions from "../store/modules/csrfToken/actions";

/**
 * Executa uma chamada mutável (POST/PUT/PATCH/DELETE) com retry automático
 * caso o token CSRF tenha expirado ou esteja ausente.
 *
 * Fluxo:
 *  1. Tenta a chamada normalmente.
 *  2. Se falhar com isCsrfError (setado pelo interceptor de response),
 *     busca um token CSRF novo e tenta a MESMA chamada UMA vez.
 *  3. Se falhar de novo (mesmo com token novo), propaga o erro —
 *     não tenta indefinidamente, para evitar loop infinito caso o
 *     problema seja outro (ex: sessão JWT realmente expirada).
 *
 * Uso, dentro de qualquer saga:
 *   const response = yield call(callWithCsrfRetry, httpClient.post, '/products', payload);
 */
export function* callWithCsrfRetry(apiFn, ...args) {
  try {
    const response = yield call(apiFn, ...args);
    return response;
  } catch (error) {
    if (!error?.isCsrfError) {
      // Erro não relacionado a CSRF — propaga sem tentar de novo.
      throw error;
    }

    // Token CSRF expirado/ausente: busca um novo antes de tentar de novo.
    try {
      const tokenResponse = yield call(api.get, "/auth/csrf-token");
      yield put(actions.setCsrfToken(tokenResponse.data.csrfToken));
    } catch (refreshError) {
      // Marca o erro de renovação pra distinguir de outros 403 nos logs
      refreshError.isCsrfRefreshError = true;
      throw refreshError;
    }

    // Uma única tentativa extra (acima), com o token já atualizado no store
    // (o interceptor de request vai ler o valor novo automaticamente).
    const retryResponse = yield call(apiFn, ...args);
    return retryResponse;
  }
}
