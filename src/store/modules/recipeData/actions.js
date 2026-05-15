import * as types from "../types";

export function recipeData(payload) {
  return {
    type: types.RECIPE_DATA,
    payload,
  };
}

export function clearRecipeData(payload) {
  return {
    type: types.CLEAR_RECIPE_DATA,
    payload,
  };
}
