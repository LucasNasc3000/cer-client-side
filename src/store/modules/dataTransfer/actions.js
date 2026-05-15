import * as types from "../types";

export function saleDataTransfer(payload) {
  return {
    type: types.SALE_DATA_TRANSFER,
    payload,
  };
}
