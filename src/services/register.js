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
    // eslint-disable-next-line default-case
    switch (registerType) {
      case "supplies":
        data.quantity = toInt(data.quantity);
        data.lowStock = toInt(data.lowStock);

        await axios.post("/supplies", {
          ...data,
        });

        const inputName = data.name;
        translatedRegisterType = "insumo";
        toast.success(`${inputName} adicionado`);
        break;

      case "sales":
        await axios.post("/sales", {
          ...data,
        });

        translatedRegisterType = "venda";
        toast.success("Venda adicionada");
        break;

      case "outflows":
        data.unities = toInt(data.unities);

        await axios.post("/outflows", {
          ...data,
        });

        const outflowName = data.name;
        translatedRegisterType = "saída";
        toast.success(`${outflowName} adicionado`);
        break;

      case "products":
        data.unities = toInt(data.unities);
        data.lowStock = toInt(data.lowStock);

        if (data.productIngredient && !data.useStockSupplies) {
          await axios.post("/products/create/withRecipe", {
            ...data,
          });
        }

        if (data.productIngredient && data.useStockSupplies) {
          await axios.post("/products/create/withRecipe/registeredSupplies", {
            ...data,
          });
        }

        await axios.post("/products/create/withoutRecipe", {
          ...data,
        });

        const productName = data.name;
        translatedRegisterType = "produto";
        toast.success(`${productName} adicionado`);
        break;
    }

    // eslint-disable-next-line default-case
    switch (registerType) {
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
