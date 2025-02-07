import { combineReducers } from "redux";

import auth from "./auth/reducer";
import dataTransfer from "./dataTransfer/reducer";

export default combineReducers({
  auth,
  dataTransfer,
});

// Todos os reducers da aplicação serão importados e combinados aqui
