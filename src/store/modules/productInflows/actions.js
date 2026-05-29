import * as types from "../types";

export function getInflows(payload) {
  return {
    type: types.GET_INFLOWS,
    payload,
  };
}

export function clearInflowsLocally(payload) {
  return {
    type: types.CLEAR_INFLOWS_LOCALLY,
    payload,
  };
}
