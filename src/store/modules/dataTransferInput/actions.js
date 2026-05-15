import * as types from "../types";

export function inputDataTransfer(payload) {
  return {
    type: types.INPUT_DATA_TRANSFER,
    payload,
  };
}
