/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import { ProductsContainer } from "./styled";

export default function Products() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [lowStock, setLowStock] = useState("");
  const [price, setPrice] = useState("");
  const [unities, setUnities] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [productsDataBackup, setProductsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const searchProduct = document.querySelector(".product-search");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);

  useEffect(() => {
    async function ExecuteGetBossId() {
      const get = await GetBossId(headerid, emailStored);

      if (typeof get === "undefined" || !get) return;

      setBossId(get);
    }

    ExecuteGetBossId();
  }, [bossId, emailStored, headerid]);

  useEffect(() => {
    async function headerIdCheck() {
      try {
        if (!headerid || headerid === "") {
          const bossData = await axios.get(
            `/employees/search/email?value=${emailStored}`
          );
          setEmployeeId(bossData.data.id);
          return;
        }
        setEmployeeId(headerid);
      } catch (e) {
        toast.error("Erro ao verificar id");
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  async function GetProducts() {
    if (!employee_id || !permissions) return;

    const productsReq = await GetData(
      bossId,
      "products",
      employee_id,
      permissions,
      null,
      true
    );

    if (typeof productsReq === "undefined" || !productsReq) return;

    setProductsData(productsReq);
    setProductsDataBackup(productsReq);
  }

  useEffect(() => {
    GetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetProducts();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const clearDirectExecution = () => {
    setCategory("");
    setName("");
    setUnities("");
    setExpirationDate("");
    setPrice("");
    setLowStock(null);
    setProductsData(productsDataBackup);

    if (searchResults.length > 0) setSearchResults(searchResultsBackup);
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const ClearSearch = (e) => {
    e.preventDefault();
    setSearchParam("");
    setSearchResults([]);
    searchProduct.value = "";

    const options = document.querySelector(".options");
    options.value = "";
  };

  async function SearchProducts(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";

    if (searchParam === "date" || searchParam === "expirationDate") {
      const year = searchProduct.value.slice(6, 10);
      const month = searchProduct.value.slice(3, 5);
      const day = searchProduct.value.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch("products", searchParam, formattedDate, null);
    } else {
      search = await DoSearch(
        "products",
        searchParam,
        searchProduct.value,
        null
      );
    }

    if (typeof search === "undefined" || !search) return;

    if (Array.isArray(search)) {
      setSearchResults(search);
      setSearchResultsBackup(search);
      return;
    }

    inArray.push(search);
    setSearchResults(inArray);
    setSearchResultsBackup(inArray);
  }

  const ProductRegister = async (e) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "PRODUCTS"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para cadastrar produtos necessária");
      return;
    }

    const data = {
      category: document.querySelector("#category").value,
      name: document.querySelector("#name").value,
      price: document.querySelector("#price").value,
      unities: document.querySelector("#unities").value,
      expirationDate: document.querySelector("#expirationDate").value,
      lowStock: document.querySelector("#lowStock").value,
    };

    const year = data.expirationDate.slice(6, 10);
    const month = data.expirationDate.slice(3, 5);
    const day = data.expirationDate.slice(0, 2);

    data.expirationDate = `${year}-${month}-${day}`;
    data.price = data.price.replace(",", ".");

    const register = await Register(data, "supplies");

    setReRender(register);

    clearDirectExecution();
  };

  return (
    <ProductsContainer>
      <Header />
    </ProductsContainer>
  );
}
