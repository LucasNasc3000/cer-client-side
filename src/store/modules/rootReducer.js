import { combineReducers } from "redux";

import auth from "./auth/reducer";
import dataTransfer from "./dataTransfer/reducer";
import dataTransferInput from "./dataTransferInput/reducer";
import recipeData from "./recipeData/reducer";

export default combineReducers({
  auth,
  dataTransfer,
  dataTransferInput,
  recipeData,
});

// Todos os reducers da aplicação serão importados e combinados aqui
