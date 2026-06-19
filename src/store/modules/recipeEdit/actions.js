import * as types from "../types";

export function recipeEdit(payload) {
  return {
    type: types.RECIPE_EDIT,
    payload,
  };
}

export function recipeEditPreSave(payload) {
  return {
    type: types.RECIPE_EDIT_PRE_SAVE,
    payload,
  };
}

export function clearRecipeEdit(payload) {
  return {
    type: types.CLEAR_RECIPE_EDIT,
    payload,
  };
}
