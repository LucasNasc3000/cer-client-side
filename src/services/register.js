/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get } from "lodash";
import { toast } from "react-toastify";
import { toInt } from "validator";
import axios from "./axios";

export default async function Register(data, registerType) {
  try {
    if (registerType === "inputs") {
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

      await axios.post("/inputs", {
        ...finalData,
      });
    }

    if (registerType === "sales") {
      await axios.post("/sales", {
        ...data,
      });
    }

    // eslint-disable-next-line default-case
    switch (registerType) {
      case "inputs":
        const inputName = data.name;
        return toast.success(`${inputName} adicionado`);

      case "sales":
        return toast.success("Venda adicionada");

      case "outputs":
        const outputName = data.name;
        return toast.success(`${outputName} adicionado`);
    }
    return true;
  } catch (err) {
    const errors = get(err, "response.data.error", []);

    if (err) {
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }

      if (err && errors.length < 1) {
        toast.error(`Erro desconhecido ao tentar cadastrar ${registerType}`);
      }
      return false;
    }
  }
}
