import * as types from "../types";

export function recipeData(payload) {
  return {
    type: types.RECIPE_DATA,
    payload,
  };
}
