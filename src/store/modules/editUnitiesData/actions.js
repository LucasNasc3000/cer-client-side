import * as types from "../types";

export function editUnities(payload) {
  return {
    type: types.UPDATE_UNITIES,
    payload,
  };
}

export function clearUpdateUnitiesData(payload) {
  return {
    type: types.CLEAR_UPDATE_UNITIES_DATA,
    payload,
  };
}
