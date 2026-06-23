/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import DoSearch from "../../services/search";
import { InflowsContainer, InflowsSpace, SearchSpace } from "./styled";

export default function ProductInflows() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);
  const productName = useSelector((state) => state.dataTransfer.productName);

  const [searchSecondaryParam, setSearchSecondaryParam] = useState("");
  const [inflowsData, setInflowsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [searchProductParam, setSearchProductParam] = useState("");
  const [searchValueAutoSearch, setSearchValueAutoSearch] = useState("");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);

  const extractFromPermissions = useRef(permissions.map((p) => p.resource));

  useEffect(() => {
    async function ExecuteGetBossId() {
      const getBossId = await GetBossId(headerid, emailStored);

      if (typeof getBossId === "undefined" || !getBossId) return;

      setBossId(getBossId);
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

  useEffect(() => {
    if (productName) {
      setSearchValueAutoSearch(productName);
      setSearchInputValue(productName);
    }
  }, [productName]);

  useEffect(() => {
    async function SearchTheProductInflows() {
      const inArray = [];

      const search = await DoSearch(
        "products",
        "inflows",
        searchValueAutoSearch,
        null,
        "products"
      );

      if (typeof search === "undefined" || !search) return;

      if (Array.isArray(search)) {
        setSearchResults(search);
        return;
      }

      inArray.push(search);
      setSearchResults(inArray);
    }

    if (searchValueAutoSearch) SearchTheProductInflows();
  }, [searchInputValue, searchProductParam, searchValueAutoSearch]);

  async function GetInflows() {
    if (!employee_id || !permissions) return;

    const inflows = await GetData(
      bossId,
      "products",
      employee_id,
      permissions,
      null,
      true,
      "inflows"
    );

    if (typeof inflows === "undefined" || !inflows) return;

    setInflowsData(inflows);
  }

  useEffect(() => {
    GetInflows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetInflows();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const ClearSearch = (e) => {
    e.preventDefault();
    setSearchSecondaryParam("");
    setSearchResults([]);
    setSearchInputValue("");
    setSearchProductParam("");
    setSearchParam("");
  };

  function HandleOptionsValue(e) {
    const searchType = e.slice(-1);
    const formattedParam = e.slice(0, -2);

    if (searchType === "P") {
      setSearchParam(formattedParam);
    } else {
      setSearchSecondaryParam(formattedParam);
    }
  }

  async function SearchInflows(e) {
    try {
      e.preventDefault();

      const inArray = [];

      let search = "";
      let formattedDate = "";

      if (searchParam === "date" || searchSecondaryParam === "expirationDate") {
        const year = searchInputValue.slice(6, 10);
        const month = searchInputValue.slice(3, 5);
        const day = searchInputValue.slice(0, 2);

        formattedDate = `${year}-${month}-${day}`;
      }

      search = await DoSearch(
        "products",
        searchParam === "" ? "inflows" : searchParam,
        formattedDate === "" ? searchInputValue : formattedDate,
        null,
        searchSecondaryParam === "" ? null : searchSecondaryParam,
        searchParam === "" ? "PRODUCT_INFLOW" : "PRODUCT"
      );

      if (typeof search === "undefined" || !search) return;

      if (Array.isArray(search)) {
        setSearchResults(search);
        return;
      }

      inArray.push(search);
      setSearchResults(inArray);
      return;
    } catch (err) {
      const errors = get(err, "response.data.message", []);

      if (err) {
        if (errors.length > 0) {
          toast.error(errors);
        }

        if (err && errors.length < 1) {
          toast.error(
            "Erro desconhecido ao tentar pesquisar por registro de produto"
          );
          return;
        }
      }
    }
  }

  return (
    <InflowsContainer>
      <Header />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            size={30}
            className="search-btn"
            onClick={(e) => SearchInflows(e)}
          >
            <IoIosSearch size={25} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="inflow-search"
            value={
              searchValueAutoSearch !== "" ? productName : searchInputValue
            }
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </div>

        <FaArrowLeft
          size={35}
          className="arrow"
          onClick={(e) => ClearSearch(e)}
        />

        <div className="filter-space">
          <p className="filter-select-label">Filtrar por:</p>
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => HandleOptionsValue(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="product-I">Produto</option>
            <option value="date-P">Data de registro</option>
            <option value="category-P">Categoria</option>
            <option value="name-P">Nome</option>
            <option value="expirationDate-I">Data de validade</option>

            {permissions.some(
              (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
            ) && <option value="employee-I">Funcionário</option>}

            <option value="price-P">Preço</option>
          </select>
        </div>
      </SearchSpace>
      <InflowsSpace>
        {searchResults.length < 1
          ? inflowsData.map((inflow) => {
              return (
                <div key={inflow.id} className="main-data-div" id={inflow.id}>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
                    <input
                      type="text"
                      name="unities"
                      className="data-div"
                      value={inflow.unities}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Motivo: </div>
                    <input
                      type="text"
                      name="inflowReason"
                      className="data-div"
                      value={inflow.inflowReason}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="notes"
                      className="data-div"
                      value={inflow.notes || "Sem detalhes"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Produto: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={inflow.name}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={inflow.category}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={inflow.price}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={`${inflow.expirationDate.slice(8, 10)}/${inflow.expirationDate.slice(5, 7)}/${inflow.expirationDate.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Usou insumos em estoque: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={inflow.useStockSupplies === true ? "Sim" : "Não"}
                      readOnly
                    />
                  </div>
                  {extractFromPermissions.current.includes("EMPLOYEES") && (
                    <div className="data-wrap">
                      <div className="label">Funcionário: </div>
                      <input
                        type="text"
                        className="data-div"
                        value={inflow.employee.email}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.createdAt.slice(8, 10)}/${inflow.createdAt.slice(5, 7)}/${inflow.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (data): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.updatedAt.slice(8, 10)}/${inflow.updatedAt.slice(5, 7)}/${inflow.updatedAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (hora): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.createdAt.slice(11, 13)}:${inflow.createdAt.slice(14, 16)}:${inflow.createdAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                </div>
              );
            })
          : searchResults.map((inflow) => {
              return (
                <div key={inflow.id} className="main-data-div" id={inflow.id}>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
                    <input
                      type="text"
                      name="unities"
                      className="data-div"
                      value={inflow.unities}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Motivo: </div>
                    <input
                      type="text"
                      name="inflowReason"
                      className="data-div"
                      value={inflow.inflowReason}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="notes"
                      className="data-div"
                      value={inflow.notes || "Sem detalhes"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Produto: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={inflow.name}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={inflow.category}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={inflow.price}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={inflow.expirationDate}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Usou insumos em estoque: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={inflow.useStockSupplies === true ? "Sim" : "Não"}
                      readOnly
                    />
                  </div>
                  {extractFromPermissions.current.includes("EMPLOYEES") && (
                    <div className="data-wrap">
                      <div className="label">Funcionário: </div>
                      <input
                        type="text"
                        className="data-div"
                        value={inflow.employee.email}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.createdAt.slice(8, 10)}/${inflow.createdAt.slice(5, 7)}/${inflow.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (data): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.updatedAt.slice(8, 10)}/${inflow.updatedAt.slice(5, 7)}/${inflow.updatedAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (hora): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.createdAt.slice(11, 13)}:${inflow.createdAt.slice(14, 16)}:${inflow.createdAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                </div>
              );
            })}
      </InflowsSpace>
    </InflowsContainer>
  );
}
