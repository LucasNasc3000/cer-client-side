import * as types from "../types";

const initialState = {
  saleItems: [],
  saleItemsToShow: [],
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.SALE_ITEMS: {
      const newState = { ...state };

      newState.saleItems = [...action.payload.formattedData];
      newState.saleItemsToShow = [...action.payload.saleItemsToShow];

      return newState;
    }

    case types.CLEAR_SALE_ITEMS: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
