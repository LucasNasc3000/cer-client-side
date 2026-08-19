import * as types from "../types";

export function editUnitiesSupply(payload) {
  return {
    type: types.UPDATE_UNITIES_SUPPLY,
    payload,
  };
}

export function clearUpdateUnitiesSupplyData(payload) {
  return {
    type: types.CLEAR_UPDATE_UNITIES_SUPPLY_DATA,
    payload,
  };
}
