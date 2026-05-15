import * as types from "../types";

const initialState = {
  supplyId: "",
  quantity: "",
  name: "",
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

    default:
      return state;
  }
}
