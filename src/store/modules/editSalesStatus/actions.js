import * as types from "../types";

export function editSalesStatus(payload) {
  return {
    type: types.UPDATE_SALES_STATUS,
    payload,
  };
}

export function clearUpdateSalesStatusData(payload) {
  return {
    type: types.CLEAR_UPDATE_SALES_STATUS_DATA,
    payload,
  };
}
