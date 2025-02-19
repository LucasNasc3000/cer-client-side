/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import axios from "./axios";

export default async function PathCheck(path, employeesIds) {
  for (let i = 0; i < employeesIds.length; i++) {
    let registersBy = "";

    if (path === "inputs") {
      registersBy = await axios.post(`/${path}/search/employeeid/`, {
        forListInputs: true,
      });
    }

    if (path === "outputs") {
      registersBy = await axios.post(`/${path}/search/employeeid/`, {
        forListOutputs: true,
      });
    }

    if (path === "sales") {
      registersBy = await axios.post(`/${path}/search/employeeid/`, {
        forListSales: true,
      });
    }
  }
}
