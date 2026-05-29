import * as types from "../types";

const initialState = {
  productInflows: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_INFLOWS: {
      const newState = { ...state };

      newState.productInflows = [...action.payload.inflows];

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
