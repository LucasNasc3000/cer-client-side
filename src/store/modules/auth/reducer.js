/* eslint-disable no-underscore-dangle */
import * as types from "../types";

const initialState = {
  isLoggedIn: false,
  emailHeaders: "",
  name: "",
  permissions: [],
  isPermissionsLoaded: false,
};

// O reducer escuta todas as actions, não só as definidas nesta aplicação. Por isso é possível usar a action persist/REHYDRATE para
// salvar os dados de initialState no localStorage e quando a página for atualizada, devolver estes dados para initialState, realizando
// assim a persistência de dados.
// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };

      newState.isLoggedIn = true;
      newState.emailHeaders = action.payload.email;
      newState.name = action.payload.name;
      newState.permissions = [...action.payload.permissions];
      newState.isPermissionsLoaded = true;

      return newState;
    }

    case types.LOGIN_FAILURE: {
      // O estado nunca é alterado e sim copiado e a cópia com as alterações é que retorna
      // garante que o token do usuário deslogado não permaneça ativo
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.emailHeaders = action.payload.email;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      return newState;
    }

    case types.UPDATED_SUCCESS: {
      const newState = { ...state };

      const { email, name } = action.payload;

      if (email) newState.emailHeaders = email;
      if (name) newState.name = name;

      return newState;
    }

    case types.UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.ADMIN_UPDATED_SUCCESS: {
      const newState = { ...state };
      return newState;
    }

    case types.ADMIN_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      return newState;
    }

    default:
      return state;
  }
}
