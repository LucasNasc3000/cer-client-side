import { combineReducers } from "redux";

import addIngredientsData from "./addIngredientsData/reducer";
import auth from "./auth/reducer";
import dataTransfer from "./dataTransfer/reducer";
import editSalesStatus from "./editSalesStatus/reducer";
import editUnitiesData from "./editUnitiesData/reducer";
import recipeData from "./recipeData/reducer";
import saleItems from "./saleItems/reducer";

export default combineReducers({
  auth,
  dataTransfer,
  recipeData,
  editUnitiesData,
  saleItems,
  editSalesStatus,
  addIngredientsData,
});

// Todos os reducers da aplicação serão importados e combinados aqui
