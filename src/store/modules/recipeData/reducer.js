import * as types from "../types";

const initialState = {
  supplyId: "",
  quantity: "",
  name: "",
  unit: "",
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.RECIPE_DATA: {
      const newState = { ...state };
      newState.quantity = action.payload.quantity;
      newState.supplyId = action.payload.supplyId;
      newState.name = action.payload.name;

      return newState;
    }

    case types.CLEAR_RECIPE_DATA: {
      const newState = { ...initialState };
      return newState;
    }

    default:
      return state;
  }
}
