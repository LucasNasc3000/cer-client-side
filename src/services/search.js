import { get, isArray } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function DoSearch(
  path,
  searchParam,
  searchValue,
  supplyType,
  secondarySearchParam,
  productSearchPath
) {
  try {
    let results = "";

    switch (true) {
      case searchParam === "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&forDisplay=false`
        );

        return results.data[1];

      case path === "supplies" && searchParam === "id":
        results = await axios.get(
          `/${path}/search/${searchParam}/${supplyType}/${searchValue}`
        );
        return results.data[1];

      case path === "supplies" && searchParam === "name":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&supplyType=${supplyType}&forDisplay=false`
        );
        return results.data[1];

      case path === "supplies" && searchParam === "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&supplyType=${supplyType}&forDisplay=false`
        );
        return results.data[1];

      case path === "supplies" &&
        searchParam !== "id" &&
        searchParam !== "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&supplyType=${supplyType}`
        );
        return results.data[1];

      case searchParam === "inflows" &&
        secondarySearchParam !== "employee" &&
        productSearchPath === "specific":
        results = await axios.get(
          `/${path}/search/${searchParam}/${secondarySearchParam}?value=${searchValue}&limit=20&offset=0`
        );

        return results.data[1];

      case searchParam === "inflows" &&
        secondarySearchParam !== "employee" &&
        productSearchPath === "general":
        results = await axios.get(
          `/${path}/search/${secondarySearchParam}?value=${searchValue}&limit=20&offset=0&productType=PRODUCT_INFLOW`
        );

        return results.data[1];

      case searchParam === "inflows" &&
        secondarySearchParam === "employee" &&
        productSearchPath === null:
        results = await axios.get(
          `/${path}/search/employee/inflows?id=${searchValue}&limit=20&offset=0&forDisplay=false`
        );
        return results.data[1];

      case path === "products" && searchParam === "name":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&productType=PRODUCT&forDisplay=false`
        );

        return results.data[1];

      case path === "products" && searchParam === "employee":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&productType=PRODUCT&forDisplay=false`
        );
        return results.data[1];

      case path === "products":
        results = await axios.get(
          `/${path}/search/${searchParam}?value=${searchValue}&limit=20&offset=0&productType=PRODUCT`
        );

        return results.data[1];

      case searchParam &&
        searchParam !== "supplies" &&
        searchParam !== "products" &&
        searchParam !== "inflows":
        results = await axios.get(
          `/${path}/search/${searchParam}/?value=${searchValue}&limit=20&offset=0`
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
