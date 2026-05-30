import * as types from "../types";

export function inputDataTransfer(payload) {
  return {
    type: types.INPUT_DATA_TRANSFER,
    payload,
  };
}

export function productDataTransfer(payload) {
  return {
    type: types.PRODUCT_DATA_TRANSFER,
    payload,
  };
}

export function clearDataTransfer(payload) {
  return {
    type: types.CLEAR_DATA_TRANSFER,
    payload,
  };
}
