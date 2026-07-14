/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import history from "../../services/history";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import * as actions from "../../store/modules/dataTransfer/actions";
import {
  GetDataSpinner,
  NewOutput,
  OutputsContainer,
  OutputsSpace,
  SearchSpace,
} from "./styled";

export default function Outputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);

  const dispatch = useDispatch();

  const [targetType, setTargetType] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unities, setUnities] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [outputsData, setOutputsData] = useState([]);
  const [outputsDataBackup, setOutputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);
  const [isLoadingGetOutflows, setIsLoadingGetOutflows] = useState(false);

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

  async function GetOutputs() {
    if (!employee_id || !permissions) return;

    setIsLoadingGetOutflows(true);

    const outputs = await GetData(
      bossId,
      "outflows",
      employee_id,
      permissions,
      null,
      true
    );

    if (typeof outputs === "undefined" || !outputs) return;

    setIsLoadingGetOutflows(false);
    setOutputsData(outputs);
    setOutputsDataBackup(outputs);
  }

  useEffect(() => {
    GetOutputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetOutputs();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const clearDirectExecution = () => {
    setCategory("");
    setName("");
    setUnities("");
    setNotes("");
    setTargetType("");
    setReason("");
    setOutputsData(outputsDataBackup);

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
    setSearchInputValue("");
  };

  async function SearchOutputs(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";
    let outflowType = "";

    if (searchParam === "date") {
      const year = searchInputValue.slice(6, 10);
      const month = searchInputValue.slice(3, 5);
      const day = searchInputValue.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch("outflows", searchParam, formattedDate);
    } else if (searchParam === "type") {
      outflowType = "SUPPLY";

      if (searchInputValue.includes("p") || searchInputValue.includes("P")) {
        outflowType = "PRODUCT";
      }

      search = await DoSearch("outflows", searchParam, outflowType);
    } else {
      search = await DoSearch("outflows", searchParam, searchInputValue);
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

  const OutputRegister = async (e) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "OUTFLOWS"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para cadastrar saídas necessária");
      return;
    }

    const data = {
      targetType,
      name,
      category,
      reason,
      unities,
      notes: notes || null,
    };

    if (data.targetType === "produto") {
      data.targetType = "PRODUCT";
    } else if (data.targetType === "insumo") {
      data.targetType = "SUPPLY";
    } else {
      toast.error("O tipo de saída deve ser 'produto' ou 'insumo'");
      return;
    }

    const register = await Register(data, "outflows");

    setReRender(register);
  };

  const Transfer = (e, outflow) => {
    e.preventDefault();

    if (outflow.targetType === "SUPPLY") {
      dispatch(actions.inputDataTransfer({ inputName: outflow.name }));
      history.push("/inputs/current");
    } else {
      dispatch(actions.productDataTransfer({ productName: outflow.name }));
      history.push("/products");
    }
  };

  return (
    <OutputsContainer>
      <Header />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            size={30}
            className="search-btn"
            onClick={(e) => SearchOutputs(e)}
          >
            <IoIosSearch size={25} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="output-search"
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
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam}
          >
            <option value="">Selecione</option>
            <option value="type">Tipo de saída</option>
            <option value="date">Data</option>
            <option value="hour">Hora</option>
            <option value="name">Nome</option>
            <option value="category">Categoria</option>
            <option value="unities">Unidades</option>

            {permissions.some(
              (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
            ) && <option value="employee">Funcionário</option>}

            <option value="reason">Motivo</option>
          </select>
        </div>
      </SearchSpace>
      <OutputsSpace>
        {isLoadingGetOutflows && <GetDataSpinner />}
        {searchResults.length < 1
          ? outputsData.map((output) => {
              return (
                <div key={output.id} className="main-data-div" id={output.id}>
                  <div className="data-wrap">
                    <div className="label">Data: </div>
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={`${output.createdAt.slice(8, 10)}/${output.createdAt.slice(5, 7)}/${output.createdAt.slice(0, 4)}`}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={`${output.createdAt.slice(11, 13)}:${output.createdAt.slice(14, 16)}:${output.createdAt.slice(17, 19)}`}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={output.name}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={output.category}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
                    <input
                      type="text"
                      name="unities"
                      className="data-div"
                      value={output.unities}
                    />
                  </div>
                  {permissions.some(
                    (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
                  ) && (
                    <div className="data-wrap">
                      <div className="label">Funcionário: </div>
                      <input
                        type="text"
                        className="data-div"
                        value={output.employee.id}
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Motivo: </div>
                    <input
                      type="text"
                      name="reason"
                      className="data-div"
                      value={output.reason}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="reason"
                      className="data-div"
                      value={output.notes || "Sem detalhes"}
                      readOnly
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className="real-time-stock-btn"
                      onClick={(e) => Transfer(e, output)}
                    >
                      Ver estoque em tempo real
                    </button>
                  </div>
                </div>
              );
            })
          : searchResults.map((output) => {
              return (
                <div key={output.id} className="main-data-div" id={output.id}>
                  <div className="data-wrap">
                    <div className="label">Data: </div>
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={`${output.createdAt.slice(8, 10)}/${output.createdAt.slice(5, 7)}/${output.createdAt.slice(0, 4)}`}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={`${output.createdAt.slice(11, 13)}:${output.createdAt.slice(14, 16)}:${output.createdAt.slice(17, 19)}`}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={output.name}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={output.category}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
                    <input
                      type="text"
                      name="unities"
                      className="data-div"
                      value={output.unities}
                    />
                  </div>
                  {permissions.some(
                    (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
                  ) && (
                    <div className="data-wrap">
                      <div className="label">Funcionário: </div>
                      <input
                        type="text"
                        className="data-div"
                        value={output.employee.id}
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Motivo: </div>
                    <input
                      type="text"
                      name="reason"
                      className="data-div"
                      value={output.reason}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="reason"
                      className="data-div"
                      value={output.notes || "Sem detalhes"}
                      readOnly
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className="real-time-stock-btn"
                      onClick={(e) => Transfer(e, output)}
                    >
                      Ver estoque em tempo real
                    </button>
                  </div>
                </div>
              );
            })}
      </OutputsSpace>
      <NewOutput>
        <input
          type="text"
          id="targetType"
          placeholder="Tipo: produto ou insumo"
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
        />
        <input
          type="text"
          id="name"
          placeholder="Nome ex: abacaxi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="category"
          placeholder="Categoria ex: fruta"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          id="unities"
          placeholder="Unidades ex: 15"
          value={unities}
          onChange={(e) => setUnities(e.target.value)}
        />
        <input
          type="text"
          id="reason"
          placeholder="Motivo ex: venda, vencimento, etc..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          type="text"
          id="reason"
          placeholder="Detalhes ex: produto mal armazenado etc..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button
          type="button"
          className="btn"
          onClick={(e) => OutputRegister(e)}
        >
          Adicionar
        </button>
      </NewOutput>
    </OutputsContainer>
  );
}
