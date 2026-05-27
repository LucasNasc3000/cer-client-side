import * as types from "../types";

const initialState = {
  addUnities: 0,
  takeUnities: 0,
  addUnitiesReason: "",
  takeUnitiesReason: "",
  notes: "",
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_UNITIES: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case types.CLEAR_UPDATE_UNITIES_DATA: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
