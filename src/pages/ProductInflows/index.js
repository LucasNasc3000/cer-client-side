/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import DoSearch from "../../services/search";
import { InputsContainer, InputsSpace, SearchSpace } from "./styled";

export default function ProductInflows() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);

  const [searchParam, setSearchParam] = useState("");
  const [inflowsData, setInflowsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = document.querySelector(".inflow-search");
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
    setSearchParam("");
    setSearchResults([]);
    searchInput.value = "";

    const options = document.querySelector(".options");
    options.value = "";
  };

  async function SearchInflows(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";

    if (searchParam === "date") {
      const year = searchInput.value.slice(6, 10);
      const month = searchInput.value.slice(3, 5);
      const day = searchInput.value.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch("inflows", searchParam, formattedDate, null);
    } else {
      search = await DoSearch("inflows", searchParam, searchInput.value, null);
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
    <InputsContainer>
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
            onChange={(e) => setSearchParam(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="product">Produto</option>
            <option value="employee">Funcionário</option>
            <option value="date">Data de registro</option>
          </select>
        </div>
      </SearchSpace>
      <InputsSpace>
        {searchResults.length < 1
          ? inflowsData.map((input) => {
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
                      value={input.totalWeightPerRegister}
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
                      value={input.employee.id}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço unitário: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={input.price}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço total: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={input.totalPrice}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.createdAt.slice(8, 10)}-${input.createdAt.slice(5, 7)}-${input.createdAt.slice(0, 4)}`}
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
      </InputsSpace>
    </InputsContainer>
  );
}
