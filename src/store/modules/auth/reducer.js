import axios from "../../../services/axios";
import * as types from "../types";

const initialState = {
  isLoggedIn: false,
  token: "",
  adminpassword: "",
  emailHeaders: "",
  permission: "",
  name: "",
  headerid: "",
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
      newState.token = action.payload.token;

      if (newState.permission !== process.env.REACT_APP_ADMIN_ROLE) {
        newState.headerid = action.payload.employee.id;
      }

      return newState;
    }

    case types.LOGIN_FAILURE: {
      // O estado nunca é alterado e sim copiado e a cópia com as alterações é que retorna
      // garante que o token do usuário deslogado não permaneça ativo
      delete axios.defaults.headers.Authorization;
      delete axios.defaults.headers.adminpassword;
      delete axios.defaults.headers.email;
      delete axios.defaults.headers.permission;
      delete axios.defaults.headers.headerid;
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.adminpassword = action.payload.adminpassword;
      newState.emailHeaders = action.payload.email;
      newState.permission = action.payload.permission;
      newState.name = action.payload.name;
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
      newState.name = action.payload.name;
      newState.adminpassword = action.payload.adminpassword;
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
