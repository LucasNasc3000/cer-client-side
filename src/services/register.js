/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get } from "lodash";
import { toast } from "react-toastify";
import { toInt } from "validator";
import axios from "./axios";

let translatedRegisterType = "";

export default async function Register(data, registerType) {
  try {
    if (registerType === "inputsHistory") {
      const quantity = toInt(data.interquantity);
      const totalweight = toInt(data.intertotalweight);
      const weightperunit = toInt(data.interweightperunit);
      const minimun_quantity = toInt(data.interminimun_quantity);
      const rateisnear = toInt(data.interrateisnear);

      const finalData = {
        quantity,
        totalweight,
        weightperunit,
        minimun_quantity,
        rateisnear,
        ...data,
      };

      await axios.post("/inputsHistory", {
        ...finalData,
      });
    }

    if (registerType === "sales") {
      await axios.post("/sales", {
        ...data,
      });
    }

    if (registerType === "outputs") {
      const finalData = {
        date: data.date,
        hour: data.hour,
        name: data.name,
        type: data.type,
        unities: toInt(data.unities),
        employee_id: data.employee_id,
      };

      await axios.post("/outputs", {
        ...finalData,
      });
    }

    // eslint-disable-next-line default-case
    switch (registerType) {
      case "inputs" || "inputsHistory":
        const inputName = data.name;
        translatedRegisterType = "insumo";
        toast.success(`${inputName} adicionado`);
        break;

      case "sales":
        translatedRegisterType = "venda";
        toast.success("Venda adicionada");
        break;

      case "outputs":
        const outputName = data.name;
        translatedRegisterType = "saída";
        toast.success(`${outputName} adicionado`);
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
