/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get } from "lodash";
import { toast } from "react-toastify";
import { toInt } from "validator";
import axios from "./axios";

let translatedRegisterType = "";

export default async function Register(data, registerType) {
  try {
    if (registerType === "supplies") {
      data.quantity = toInt(data.quantity);
      data.lowStock = toInt(data.lowStock);

      await axios.post("/supplies", {
        ...data,
      });
    }

    if (registerType === "sales") {
      await axios.post("/sales", {
        ...data,
      });
    }

    if (registerType === "outflows") {
      const { unities, ...rest } = data;

      await axios.post("/outflows", {
        ...rest,
        unities: toInt(unities),
      });
    }

    // eslint-disable-next-line default-case
    switch (registerType) {
      case "supplies":
        const inputName = data.name;
        translatedRegisterType = "insumo";
        toast.success(`${inputName} adicionado`);
        break;

      case "sales":
        translatedRegisterType = "venda";
        toast.success("Venda adicionada");
        break;

      case "outflows":
        const outflowName = data.name;
        translatedRegisterType = "saída";
        toast.success(`${outflowName} adicionado`);
        break;
    }
    return true;
  } catch (err) {
    const errors = get(err, "response.data.error", []);

    if (err) {
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }

      if (err && errors.length < 1) {
        toast.error(
          `Erro desconhecido ao tentar cadastrar ${translatedRegisterType}`
        );
      }
      return false;
    }
  }
}
