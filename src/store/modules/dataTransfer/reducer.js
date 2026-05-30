import * as types from "../types";

const initialState = {
  inputName: "",
  productName: "",
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.INPUT_DATA_TRANSFER: {
      const newState = { ...state };

      newState.inputName = action.payload.inputName;

      return newState;
    }

    case types.PRODUCT_DATA_TRANSFER: {
      const newState = { ...state };

      newState.productName = action.payload.productName;

      return newState;
    }

    case types.CLEAR_DATA_TRANSFER: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
