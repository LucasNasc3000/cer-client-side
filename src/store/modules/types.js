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

/* Esta action vai manter os dados do login no local storage depois que este for feito. Sem ele
  esses dados desaparecerão quando a página for atualizada */
export const PERSIST_REHYDRATE = "persist/REHYDRATE";
