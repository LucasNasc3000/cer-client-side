import * as types from "../types";

export function saleItems(payload) {
  return {
    type: types.SALE_ITEMS,
    payload,
  };
}

export function clearSaleItems(payload) {
  return {
    type: types.CLEAR_SALE_ITEMS,
    payload,
  };
}
