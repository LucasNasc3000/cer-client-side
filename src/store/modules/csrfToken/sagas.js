import { all, call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/axios";
import * as types from "../types";
import * as actions from "./actions";

export function* fetchCsrfTokenSaga() {
  try {
    const response = yield call(api.get, "/auth/csrf-token");
    yield put(actions.setCsrfToken(response.data.csrfToken));
  } catch (error) {
    // Se isso falhar no boot da app, o usuário simplesmente não vai
    // conseguir fazer nenhuma ação mutável até recarregar — vale logar
    // isso em algum lugar visível (Sentry, etc) já que é um bloqueio total.
    console.error("Falha ao obter token CSRF:", error.message);
  }
}

export default all([takeLatest(types.FETCH_CSRF_TOKEN, fetchCsrfTokenSaga)]);
