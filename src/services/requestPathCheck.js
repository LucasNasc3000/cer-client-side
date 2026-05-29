/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { toast } from "react-toastify";
import axios from "./axios";

export default async function PathCheck(
  path,
  employeesId,
  supplyType,
  forDisplay
) {
  try {
    let registersBy = "";

    if (path === "supplies") {
      registersBy = await axios.get(
        `/${path}/search/employee?limit=20&offset=0&value=${employeesId}&supplyType=${supplyType}&forDisplay=${forDisplay}`
      );

      return registersBy;
    }

    if (path === "inflows") {
      registersBy = await axios.get(
        `/${path}/search/employee/inflows?limit=20&offset=0&value=${employeesId}&forDisplay=${forDisplay}`
      );

      return registersBy;
    }

    registersBy = await axios.get(
      `/${path}/search/employee?limit=20&offset=0&value=${employeesId}&forDisplay=${forDisplay}`
    );

    return registersBy;
  } catch (err) {
    toast.error("Falha ao encontrar rota");
    return null;
  }
}
