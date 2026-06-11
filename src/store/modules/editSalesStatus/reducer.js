import * as types from "../types";

const initialState = {
  status: "",
  notes: "",
  reason: "",
  returnToStock: false,
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SALES_STATUS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case types.CLEAR_UPDATE_SALES_STATUS_DATA: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
