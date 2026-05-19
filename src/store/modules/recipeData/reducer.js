import * as types from "../types";

const initialState = {
  useStockSupplies: false,
  productIngredient: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RECIPE_DATA: {
      const newState = { ...state };

      newState.useStockSupplies = action.payload.useStockSupplies;
      newState.productIngredient = [...action.payload.recipeItemsToShow];

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
