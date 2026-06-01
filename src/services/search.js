import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function DoSearch(
  path,
  searchParam,
  searchValue,
  supplyType,
  secondarySearchParam
) {
  try {
    let results = "";

    switch (true) {
      case path === "supplies" && searchParam === "id":
        results = await axios.get(
          `/${path}/search/${searchParam}/${supplyType}/${searchValue}`
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

      case searchParam &&
        searchParam !== "supplies" &&
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

    if (err) {
      if (errors.length > 0) {
        toast.error(errors);
      }

      if (err && errors.length < 1) {
        // eslint-disable-next-line default-case
        switch (path) {
          case "supplies":
            toast.error("Erro desconhecido ao tentar pesquisar insumo");
            break;

          case "outflows":
            toast.error("Erro desconhecido ao tentar pesquisar saída");
            break;

          case "sales":
            toast.error("Erro desconhecido ao tentar pesquisar venda");
            break;
        }
      }
    }
  }
}
