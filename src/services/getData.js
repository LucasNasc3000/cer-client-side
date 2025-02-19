/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";
import PathCheck from "./requestPathCheck";

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
      const registers = await PathCheck(path, employeesIds[i]);
      if (registers.data) rawData.push(registers.data);
    }

    for (let i = 0; i < rawData.length; i++) {
      const join = allData.concat(rawData[i]);
      joinData.push(...join);
    }

    // Adiciona à joinData os registros do chefe, se houverem. Acontecerá independentemente da permissão do funcionário
    if (permission === process.env.REACT_APP_ADMIN_ROLE) {
      const bossOwnRegisters = await PathCheck(path, employee_id);
      joinData.push(...bossOwnRegisters.data);
    } else {
      const bossRegisters = await PathCheck(path, bossId);
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
