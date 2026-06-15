import * as types from "../types";

const initialState = {
  addProductIngredient: [],
  addProductIngredientToShow: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RECIPE_DATA: {
      const newState = { ...state };

      newState.addProductIngredient = [...action.payload.addProductIngredient];
      newState.addProductIngredientToShow = [
        ...action.payload.addProductIngredientToShow,
      ];

      return newState;
    }

    case types.CLEAR_RECIPE_DATA: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
