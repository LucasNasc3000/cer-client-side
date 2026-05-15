import * as types from "../types";

const initialState = {
  clientName: "",
  phoneNumber: "",
  clientBirthday: "",
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.SALE_DATA_TRANSFER: {
      const newState = { ...state };
      newState.clientName = action.payload.client_name;
      newState.phoneNumber = action.payload.phone_number;
      newState.clientBirthday = action.payload.client_birthday;

      return newState;
    }

    default:
      return state;
  }
}
