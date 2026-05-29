export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_CREATED_SUCCESS = "REGISTER_CREATED_SUCCESS";

export const UPDATED_SUCCESS = "UPDATED_SUCCESS";
export const UPDATE_REQUEST = "UPDATE_REQUEST";

export const ADMIN_UPDATED_SUCCESS = "ADMIN_UPDATED_SUCCESS";
export const ADMIN_UPDATE_REQUEST = "ADMIN_UPDATE_REQUEST";

export const SALE_DATA_TRANSFER = "SALE_DATA_TRANSFER";

export const INPUT_DATA_TRANSFER = "INPUT_DATA_TRANSFER";

export const RECIPE_DATA = "RECIPE_DATA";
export const CLEAR_RECIPE_DATA = "CLEAR_RECIPE_DATA";

export const UPDATE_UNITIES = "UPDATE_UNITIES";
export const CLEAR_UPDATE_UNITIES_DATA = "CLEAR_UPDATE_UNITIES_DATA";

export const GET_INFLOWS = "GET_INFLOWS";
export const CLEAR_INFLOWS_LOCALLY = "CLEAR_INFLOWS_LOCALLY";

/* Esta action vai manter os dados do login no local storage depois que este for feito. Sem ele
  esses dados desaparecerão quando a página for atualizada */
export const PERSIST_REHYDRATE = "persist/REHYDRATE";
