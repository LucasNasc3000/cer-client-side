import * as types from "../types";

// payload será enviado como um objeto, no qual virão os dados do front-end
export function inputDataTransfer(payload) {
  return {
    type: types.INPUT_DATA_TRANSFER,
    payload,
  };
}

/* Organizar os tipos desta maneira, em um arquivo separado é uma boa prática de programação
 e evita que dois ou mais devs usem o mesmo nome de tipo e que evita outros transtornos */
