import { get, isArray } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function DoSearch(
  path,
  searchParam,
  searchValue,
  supplyType,
  secondarySearchParam,
  productType
) {
  try {
    let results = "";

    switch (true) {
      case path === "supplies" && searchParam === "id":
        results = await axios.get(
          `/${path}/search/${searchParam}/${supplyType}/${searchValue}`
        );
        return results.data[1];

      case path === "supplies" && searchParam === "name":
        results = await axios.get(
          `/${path}/search/${searchParam}/?limit=20&offset=0&value=${searchValue}&supplyType=${supplyType}&forDisplay=false`
        );
        return results.data[1];

      case path === "supplies" && searchParam === "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&supplyType=${supplyType}&forDisplay=false`
        );
        return results.data[1];

      case path === "supplies" &&
        searchParam !== "id" &&
        searchParam !== "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&supplyType=${supplyType}`
        );
        return results.data[1];

      case searchParam === "inflows" && secondarySearchParam === "employees":
        results = await axios.get(
          `/${path}/search/employee/inflows?limit=20&offset=0&email=${searchValue}&forDisplay=false`
        );
        return results.data[1];

      case searchParam === "inflows":
        results = await axios.get(
          `/${path}/search/${searchParam}/${secondarySearchParam}?limit=20&offset=0&value=${searchValue}`
        );

        return results.data[1];

      case path === "products" && searchParam === "name":
        console.log("aqui");
        results = await axios.get(
          `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&productType=${productType}&forDisplay=false`
        );

        return results.data[1];

      case path === "products" && searchParam === "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&productType=${productType}&forDisplay=false`
        );
        return results.data[1];

      case path === "products":
        results = await axios.get(
          `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&productType=${productType}`
        );

        return results.data[1];

      case searchParam &&
        searchParam !== "supplies" &&
        searchParam !== "products" &&
        searchParam !== "inflows":
        results = await axios.get(
          `/${path}/search/${searchParam}/?limit=20&offset=0&value=${searchValue}`
        );

        return results.data[1];

      default:
        toast.error("Dados de busca não enviados ou incorretos");
        // eslint-disable-next-line consistent-return, no-useless-return
        return;
    }
  } catch (err) {
    const errors = get(err, "response.data.message", []);

    switch (true) {
      case err instanceof TypeError:
        toast.error("Erro de tratamento de dados");
        break;

      case errors.length > 0:
        if (!isArray(errors)) {
          toast.error(errors);
        } else {
          errors.map((error) => toast.error(error));
        }
        break;

      default:
        toast.error("Erro desconhecido ao buscar registro");
        break;
    }
  }
}
