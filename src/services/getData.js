/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function GetData(bossId, path, employee_id, permission) {
  const rawData = [];
  const allData = [];
  const joinData = [];

  try {
    const getEmployeesByBoss = await axios.get(
      `/employees/search/boss/${bossId}`
    );

    const employeesIds = getEmployeesByBoss.data.map((employees) => {
      return employees.id;
    });

    for (let i = 0; i < employeesIds.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const registersBy = await axios.get(
        `/${path}/search/employeeid/${employeesIds[i]}`
      );

      if (registersBy.data) rawData.push(registersBy.data);
    }

    for (let i = 0; i < rawData.length; i++) {
      const join = allData.concat(rawData[i]);
      joinData.push(...join);
    }

    // Adiciona à variável inputsData os registros do chefe, se houverem. Acontecerá independentemente da permissão do funcionário
    if (permission === process.env.REACT_APP_ADMIN_ROLE) {
      const bossRegisters = await axios.get(
        `/${path}/search/employeeid/${employee_id}`
      );

      joinData.push(...bossRegisters.data);
    } else {
      const bossRegisters = await axios.get(
        `/${path}/search/employeeid/${bossId}`
      );

      joinData.push(...bossRegisters.data);
    }

    return joinData;
  } catch (err) {
    // eslint-disable-next-line consistent-return
    if (typeof err.response.data === "string") return;

    const errors = get(err, "response.data.error", []);

    if (err && errors.length < 1) {
      // eslint-disable-next-line default-case
      switch (path) {
        case "inputs":
          toast.error("Erro desconhecido ao tentar exibir insumos");
          break;

        case "outputs":
          toast.error("Erro desconhecido ao tentar exibir saídas");
          break;

        case "sales":
          toast.error("Erro desconhecido ao tentar exibir vendas");
          break;
      }
    }
  }
}
