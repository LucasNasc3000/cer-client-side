/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function Update(id, data, registerType) {
  try {
    const { createdAt, updatedAt, ...allowedData } = data;
    // eslint-disable-next-line default-case
    switch (registerType) {
      case "supplies":
        if (data.price) {
          await axios.patch(`/supplies/update/price/${id}`, {
            price: allowedData.price,
          });
        } else {
          await axios.patch(`/supplies/update/${id}`, {
            ...allowedData,
          });
        }

        const supplyName = data.name;
        toast.success(`${supplyName} atualizado`);
        break;

      case "products":
        if (allowedData.price) {
          await axios.patch(`/products/update/price/${id}`, {
            ...allowedData,
          });
        } else {
          await axios.patch(`/products/update/general/${id}`, {
            ...allowedData,
          });
        }

        const productName = data.name;
        toast.success(`${productName} atualizado`);
        break;

      case "sales":
        await axios.patch(`/sales/${id}`, {
          ...data,
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
