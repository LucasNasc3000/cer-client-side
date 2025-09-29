/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function Update(id, data, registerType) {
  try {
    if (registerType === "inputs") {
      const { created_at, updated_at, ...allowedData } = data;

      await axios.put(`/inputs/${id}`, {
        ...allowedData,
      });
    }

    if (registerType === "sales") {
      await axios.patch(`/sales/${id}`, {
        ...data,
      });
    }

    if (registerType === "outputs") {
      await axios.put(`/outputs/${id}`, {
        ...data,
      });
    }

    // eslint-disable-next-line default-case
    switch (registerType) {
      case "inputs":
        const inputName = data.name;
        toast.success(`${inputName} atualizado`);
        break;

      case "sales":
        toast.success("Venda atualizada");
        break;

      case "outputs":
        const outputName = data.name;
        toast.success(`${outputName} atualizado`);
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
        toast.error(`Erro desconhecido ao tentar atualizar ${registerType}`);
      }
      return false;
    }
  }
}
