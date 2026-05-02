/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";
import PathCheck from "./requestPathCheck";

export default async function GetData(
  bossId,
  path,
  employee_id,
  permission,
  supplyType,
  forDisplay
) {
  const rawData = [];
  const allData = [];
  const joinData = [];

  try {
    const getEmployeesByBoss = await axios.get(
      `/employees/search/boss?limit=20&offset=0&value=${bossId}`
    );

    if (getEmployeesByBoss.length > 0) {
      const employeesIds = getEmployeesByBoss.data.map((employees) => {
        return employees.id;
      });

      for (let i = 0; i < employeesIds.length; i++) {
        const registers = await PathCheck(
          path,
          employeesIds[i],
          supplyType,
          forDisplay
        );

        if (registers.data) rawData.push(registers.data);
      }

      for (let i = 0; i < rawData.length; i++) {
        const join = allData.concat(rawData[i]);
        joinData.push(...join);
      }
    }

    // Adiciona à joinData os registros do chefe, se houverem. Acontecerá independentemente da permissão do funcionário
    if (permission.some((p) => p.resource === "EMPLOYEES")) {
      const bossOwnRegisters = await PathCheck(
        path,
        employee_id,
        supplyType,
        forDisplay
      );

      joinData.push(...bossOwnRegisters.data);
    } else {
      const bossRegisters = await PathCheck(
        path,
        bossId,
        supplyType,
        forDisplay
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
        case "supplies":
          toast.error("Erro desconhecido ao tentar exibir insumos");
          break;

        case "outflows":
          toast.error("Erro desconhecido ao tentar exibir saídas");
          break;

        case "sales":
          toast.error("Erro desconhecido ao tentar exibir vendas");
          break;
      }
    }
  }
}
