/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import axios from "./axios";

export default async function PathCheck(path, employeesId) {
  try {
    if (!employeesId) employeesId = "random";

    if (path === "inputs") {
      const registersBy = await axios.post(`/${path}/search/employeeid/`, {
        employeeidBody: employeesId,
        forListInputs: true,
      });

      return registersBy;
    }

    if (path === "outputs") {
      const registersBy = await axios.post(`/${path}/search/employeeid/`, {
        employeeidBody: employeesId,
        forListOutputs: true,
      });

      return registersBy;
    }

    if (path === "sales") {
      const registersBy = await axios.post(`/${path}/search/employeeid/`, {
        employeeidBody: employeesId,
        forListSales: true,
      });

      return registersBy;
    }

    if (path === "advices") {
      const registersBy = await axios.get(`/${path}/search/employeeid/`);
      return registersBy;
    }
  } catch (err) {
    console.log("Erro na verificação do caminho");
  }
}
