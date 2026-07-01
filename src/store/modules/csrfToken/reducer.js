import * as types from "../types";

const initialState = {
  token: null,
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_CSRF_TOKEN: {
      const newState = { ...state };

      newState.token = action.payload;

      return newState;
    }

    case types.CLEAR_CSRF_TOKEN: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
}
