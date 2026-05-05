import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "./axios";

export default async function DoSearch(
  path,
  searchParam,
  searchValue,
  supplyType
) {
  try {
    let results = "";

    if (path === "supplies") {
      if (searchParam === "id") {
        results = await axios.get(
          `/${path}/search/${searchParam}/${supplyType}/${searchValue}`
        );
      }

      if (searchParam === "employee") {
        results = await axios.get(
          `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&supplyType=${supplyType}&forDisplay=false`
        );
      }

      results = await axios.get(
        `/${path}/search/${searchParam}?limit=20&offset=0&value=${searchValue}&supplyType=${supplyType}`
      );

      return results.data[1];
    }

    results = await axios.get(`/${path}/search/${searchParam}/${searchValue}`);

    return results.data[1];
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
