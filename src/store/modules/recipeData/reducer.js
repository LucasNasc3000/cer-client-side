import * as types from "../types";

const initialState = {
  productIngredient: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RECIPE_DATA: {
      return {
        ...state,
        productIngredient: [...state.productIngredient, action.payload],
      };
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
