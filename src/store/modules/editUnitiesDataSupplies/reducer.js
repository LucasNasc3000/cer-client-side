import * as types from "../types";

const initialState = {
  quantity: 0,
  reason: "",
  details: "",
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_UNITIES_SUPPLY: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case types.CLEAR_UPDATE_UNITIES_SUPPLY_DATA: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
