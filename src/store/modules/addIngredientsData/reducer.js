import * as types from "../types";

const initialState = {
  addProductIngredient: [],
  addProductIngredientToShow: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_INGREDIENTS: {
      const newState = { ...state };

      newState.addProductIngredient = [...action.payload.addProductIngredient];
      newState.addProductIngredientToShow = [
        ...action.payload.addProductIngredientToShow,
      ];

      return newState;
    }

    case types.CLEAR_ADD_INGREDIENTS: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
