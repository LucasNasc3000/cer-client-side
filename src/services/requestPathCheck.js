/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { toast } from "react-toastify";
import axios from "./axios";

export default async function PathCheck(path, employeesId) {
  try {
    const registersBy = await axios.get(
      `/${path}/search/employeeid?${employeesId}`
    );

    return registersBy;
  } catch (err) {
    toast.error("Falha ao encontrar rota");
  }
}
