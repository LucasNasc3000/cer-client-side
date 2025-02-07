import * as types from "../types";

const initialState = {
  clientName: "",
  phoneNumber: "",
  clientBirthday: "",
};

// O reducer escuta todas as actions, não só as definidas nesta aplicação. Por isso é possível usar a action persist/REHYDRATE para
// salvar os dados de initialState no localStorage e quando a página for atualizada, devolver estes dados para initialState, realizando
// assim a persistência de dados.
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
