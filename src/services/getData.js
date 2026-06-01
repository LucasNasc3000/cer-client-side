/* eslint-disable consistent-return */
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
  forDisplay,
  secondaryPath
) {
  const joinData = [];

  try {
    const getEmployeesByBoss = await axios.get(
      `/employees/search/boss?limit=20&offset=0&value=${bossId}`
    );

    if (getEmployeesByBoss.data[1].length > 0) {
      const employeesIds = getEmployeesByBoss.data[1].map((employees) => {
        return employees.id;
      });

      for (let i = 0; i < employeesIds.length; i++) {
        const registers = await PathCheck(
          path,
          employeesIds[i],
          supplyType,
          forDisplay,
          secondaryPath
        );

        if (registers.data[1]) joinData.push(...registers.data[1]);
      }
    }

    // Adiciona à joinData os registros do admin, se houverem. Acontecerá independentemente da permissão do funcionário
    if (permission.some((p) => p.resource === "EMPLOYEES")) {
      const bossOwnRegisters = await PathCheck(
        path,
        employee_id,
        supplyType,
        forDisplay,
        secondaryPath
      );

      if (bossOwnRegisters.data[1]) joinData.push(...bossOwnRegisters.data[1]);
    } else {
      const bossRegisters = await PathCheck(
        path,
        bossId,
        supplyType,
        forDisplay,
        secondaryPath
      );

      if (bossRegisters.data[1]) joinData.push(...bossRegisters.data[1]);
    }

    return joinData;
  } catch (err) {
    // eslint-disable-next-line consistent-return
    if (err.response && typeof err.response.data === "string") return;

    if (err instanceof TypeError) {
      toast.error("Erro de tratamento de dados");
      return;
    }

    if (err.response.data) {
      const { message } = err.response.data;

      if (message) {
        toast.error(message);
        return;
      }
    }

    const errors = get(err, "response.data.error", []);

    if (err && errors.length < 1) {
      // eslint-disable-next-line default-case
      switch (path) {
        case "supplies":
          toast.error("Erro desconhecido ao tentar exibir insumos");
          return;

        case "outflows":
          toast.error("Erro desconhecido ao tentar exibir saídas");
          return;

        case "sales":
          toast.error("Erro desconhecido ao tentar exibir vendas");
          return;

        case "products":
          toast.error("Erro desconhecido ao tentar exibir produtos");
          return;

        case "inflows":
          toast.error(
            "Erro desconhecido ao tentar exibir atualizações de produtos"
          );
          // eslint-disable-next-line no-useless-return
          return;
      }
    }
  }
}
