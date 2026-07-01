import * as types from "../types";

export function setCsrfToken(payload) {
  return {
    type: types.SET_CSRF_TOKEN,
    payload,
  };
}

export function fetchCsrfToken(payload) {
  return {
    type: types.FETCH_CSRF_TOKEN,
    payload,
  };
}

export function clearCsrfToken(payload) {
  return {
    type: types.CLEAR_CSRF_TOKEN,
    payload,
  };
}
