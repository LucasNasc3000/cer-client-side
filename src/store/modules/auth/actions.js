import * as types from "../types";

// payload será enviado como um objeto, no qual virão todos os dados do front-end para as validações de login e cadastro
export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function updatedSuccess(payload) {
  return {
    type: types.UPDATED_SUCCESS,
    payload,
  };
}

export function updateRequest(payload) {
  return {
    type: types.UPDATE_REQUEST,
    payload,
  };
}

export function adminUpdatedSuccess(payload) {
  return {
    type: types.ADMIN_UPDATED_SUCCESS,
    payload,
  };
}

export function adminUpdateRequest(payload) {
  return {
    type: types.ADMIN_UPDATE_REQUEST,
    payload,
  };
}

/* Organizar os tipos desta maneira, em um arquivo separado é uma boa prática de programação
 e evita que dois ou mais devs usem o mesmo nome de tipo e que evita outros transtornos */
