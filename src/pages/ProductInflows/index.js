/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
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

  const [searchSecondaryParam, setSearchSecondaryParam] = useState("");
  const [inflowsData, setInflowsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);

  const extractFromPermissions = useRef(permissions.map((p) => [p.resource]));

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

  async function GetInflows() {
    if (!employee_id || !permissions) return;

    const inflows = await GetData(
      bossId,
      "inflows",
      employee_id,
      permissions,
      null,
      true
    );

    if (typeof inflows === "undefined" || !inflows) return;

    setInflowsData(inflows);
    setInflowsDataBackup(inflows);
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
    searchInputValue("");
  };

  async function SearchInflows(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";

    if (searchSecondaryParam === "date") {
      const year = searchInput.value.slice(6, 10);
      const month = searchInput.value.slice(3, 5);
      const day = searchInput.value.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch(
        "products",
        "inflows",
        formattedDate,
        null,
        searchSecondaryParam
      );
    } else if (searchSecondaryParam === "employees") {
      search = await DoSearch(
        "products",
        "inflows",
        formattedDate,
        null,
        searchSecondaryParam
      );
    } else {
      search = await DoSearch(
        "products",
        "inflows",
        searchInput.value,
        null,
        searchSecondaryParam
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
    return;
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
            value={searchInputValue}
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
            onChange={(e) => setSearchSecondaryParam(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="product">Produto</option>
            <option value="employee">Funcionário</option>
            <option value="date">Data de registro</option>
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
                  {extractFromPermissions.includes("PRODUCTS") && (
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
                    <div className="label">Produto: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={inflow.product.name}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${inflow.createdAt.slice(8, 10)}-${inflow.createdAt.slice(5, 7)}-${inflow.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className="product-stock-btn"
                      onClick={(e) => Transfer(e, inflow.name)}
                    >
                      Ver Produto
                    </button>
                  </div>
                </div>
              );
            })
          : searchResults.map((input) => {
              return (
                <div key={input.id} className="main-data-div" id={input.id}>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={input.category}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={input.name}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Motivo: </div>
                    <input
                      type="text"
                      name="reason"
                      className="data-div"
                      value={input.reason}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="details"
                      className="data-div"
                      value={input.details}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade: </div>
                    <input
                      type="text"
                      name="quantity"
                      className="data-div"
                      value={input.quantity}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso total por registro: </div>
                    <input
                      type="text"
                      name="totalweightPerRegister"
                      className="data-div"
                      value={input.totalweight_per_register}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightPerUnit"
                      className="data-div"
                      value={input.weightPerUnit}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Fornecedor: </div>
                    <input
                      type="text"
                      name="supplier"
                      className="data-div"
                      value={input.supplier}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={input.expirationDate}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={input.lowStock || "Não definido"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={input.employee_id}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap-price">
                    <div className="label-price">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div-price"
                      value={input.price}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap-price">
                    <div className="label-price">Preço total: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div-price"
                      value={input.totalprice}
                      readOnly
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className="real-time-stock-btn"
                      onClick={(e) => Transfer(e, input.name)}
                    >
                      Ver estoque em tempo real
                    </button>
                  </div>
                </div>
              );
            })}
      </InflowsSpace>
    </InflowsContainer>
  );
}
