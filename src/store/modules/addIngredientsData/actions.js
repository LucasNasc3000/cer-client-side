import * as types from "../types";

export function addIngredients(payload) {
  return {
    type: types.ADD_INGREDIENTS,
    payload,
  };
}

export function clearAddIngredients(payload) {
  return {
    type: types.CLEAR_ADD_INGREDIENTS,
    payload,
  };
}
