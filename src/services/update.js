/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function Update(id, data, registerType) {
  try {
    const { createdAt, updatedAt, ...allowedData } = data;
    const { price, ...allowedDataPriceFields } = data;

    switch (registerType) {
      case "supplies":
        if (price !== undefined) {
          await axios.patch(`/supplies/update/price/${id}`, { price });
        }

        if (Object.keys(allowedDataPriceFields).length > 0) {
          await axios.patch(`/supplies/update/${id}`, allowedDataPriceFields);
        }

        const supplyName = data.name;
        toast.success(`${supplyName} atualizado`);
        break;

      case "products":
        if (price !== undefined) {
          await axios.patch(`/products/update/price/${id}`, {
            price,
          });
        }

        if (Object.keys(allowedDataPriceFields).length > 0) {
          await axios.patch(`/products/update/general/${id}`, {
            ...allowedDataPriceFields,
          });
        }

        const productName = data.name;
        toast.success(`${productName} atualizado`);
        break;

      case "sales":
        await axios.patch(`/sales/${id}`, {
          ...allowedData,
        });

        toast.success("Venda atualizada");
        break;
    }

    return true;
  } catch (err) {
    console.log(err);
    const errors = get(err, "response.data.message", []);

    if (err) {
      // eslint-disable-next-line default-case
      switch (true) {
        case err instanceof TypeError:
          toast.error("Erro de tratamento de dados");
          return false;

        case errors.length > 0:
          errors.map((error) => toast.error(error));
          return false;

        case err && errors.length < 1:
          toast.error(`Erro desconhecido ao tentar atualizar ${registerType}`);
          return false;
      }
    }
  }
}
