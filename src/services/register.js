/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get, isArray } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

let translatedRegisterType = "";

export default async function Register(data, registerType) {
  try {
    // eslint-disable-next-line default-case
    switch (registerType) {
      case "supplies":
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
        await axios.post("/outflows", {
          ...data,
        });

        const outflowName = data.name;
        translatedRegisterType = "saída";
        toast.success(`${outflowName} adicionado`);
        break;

      case "products":
        const hasIngredients =
          Array.isArray(data.productIngredient) &&
          data.productIngredient.length > 0;

        if (hasIngredients && !data.useStockSupplies) {
          await axios.post("/products/create/withRecipe", {
            ...data,
          });
        } else if (hasIngredients && data.useStockSupplies) {
          await axios.post("/products/create/withRecipe/registeredSupplies", {
            ...data,
          });
        } else {
          const { useStockSupplies, productIngredient, ...restOfTheData } =
            data;

          const payload = data.lowStock
            ? restOfTheData
            : (({ lowStock, ...rest }) => rest)(restOfTheData);

          await axios.post("/products/create/withoutRecipe", {
            ...payload,
          });
        }

        const productName = data.name;
        translatedRegisterType = "produto";
        toast.success(`${productName} adicionado`);
        break;
    }

    return true;
  } catch (err) {
    const errors = get(err, "response.data.message", []);

    if (err) {
      // eslint-disable-next-line default-case
      switch (true) {
        case err instanceof TypeError:
          toast.error("Erro de tratamento de dados");
          return false;

        case errors.length > 0:
          if (!isArray(errors)) {
            toast.error(errors);
            return false;
          }

          errors.map((error) => toast.error(error));
          return false;

        case err && errors.length < 1:
          toast.error(
            `Erro desconhecido ao tentar cadastrar ${translatedRegisterType}`
          );
          return false;
      }
    }
  }
}
