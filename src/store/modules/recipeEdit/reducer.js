import * as types from "../types";

const initialState = {
  updateProductIngredient: [],
  updateProductIngredientToShow: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RECIPE_EDIT: {
      const newState = { ...state };

      newState.updateProductIngredient = [...action.payload.formattedData];

      return newState;
    }

    case types.RECIPE_EDIT_PRE_SAVE: {
      const newState = { ...state };

      newState.updateProductIngredientToShow = [...action.payload.preSavedData];

      return newState;
    }

    case types.CLEAR_RECIPE_EDIT: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
