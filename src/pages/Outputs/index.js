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
import * as actions from "../../store/modules/dataTransferInput/actions";
import {
  NewOutput,
  OutputsContainer,
  OutputsSpace,
  SearchSpace,
} from "./styled";

export default function Outputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);

  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unities, setUnities] = useState("");
  const [reason, setReason] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [outputsData, setOutputsData] = useState([]);
  const [outputsDataBackup, setOutputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const searchOutput = document.querySelector(".output-search");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);

  useEffect(() => {
    const PermissionCheck = () => {
      if (
        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE &&
        permissionlStored !== process.env.REACT_APP_OUTPUTS &&
        permissionlStored !== process.env.REACT_APP_IOUT &&
        permissionlStored !== process.env.REACT_APP_SOUT &&
        permissionlStored !== process.env.REACT_APP_SIOUT
      )
        history.goBack();
    };

    PermissionCheck();
  }, [permissionlStored]);

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
            `/employees/search/email/${emailStored}`
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
    const outputs = await GetData(
      bossId,
      "outputs",
      employee_id,
      permissionlStored
    );

    if (typeof outputs === "undefined" || !outputs) return;

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
    setDate("");
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
    searchOutput.value = "";

    const options = document.querySelector(".options");
    options.value = "";
  };

  async function SearchOutputs(e) {
    e.preventDefault();

    const inArray = [];

    const search = await DoSearch("outputs", searchParam, searchOutput.value);

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

  // const OutputUpdate = async (e, objectData) => {
  //   e.preventDefault();

  //   const ddate = new Date();
  //   const hour = ddate.toLocaleTimeString("pt-br", {
  //     hourCycle: "h24",
  //   });

  //   const data = {
  //     date: objectData.date,
  //     hour,
  //     name: objectData.name,
  //     type: objectData.type,
  //     unities: objectData.unities,
  //     employee_id,
  //   };

  //   const update = await Update(objectData.id, data, "outputs");

  //   setReRender(update);

  //   clearDirectExecution();
  // };

  const OutputRegister = async (e) => {
    e.preventDefault();

    const ddate = new Date();
    const hour = ddate.toLocaleTimeString("pt-br", {
      hourCycle: "h24",
    });

    const data = {
      date: document.querySelector("#date").value,
      hour,
      name: document.querySelector("#name").value,
      category: document.querySelector("#category").value,
      reason: document.querySelector("#reason"),
      unities: document.querySelector("#unities").value,
      employee_id,
    };

    const register = await Register(data, "outputs");

    setReRender(register);

    clearDirectExecution();
  };

  const Transfer = (e, inputName) => {
    e.preventDefault();
    dispatch(actions.inputDataTransfer({ inputName }));

    history.push("/inputsCurrent");
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
            <option value="date">Data</option>
            <option value="hour">Hora</option>
            <option value="name">Nome</option>
            <option value="category">Categoria</option>
            <option value="unities">Unidades</option>
            <option value="employee">Funcionário</option>
            <option value="reason">Motivo</option>
          </select>
        </div>
      </SearchSpace>
      <OutputsSpace>
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
                      value={output.date}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={output.hour}
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
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={output.employee_id}
                    />
                  </div>
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
                  <div className="buttons">
                    <button
                      type="button"
                      className="real-time-stock-btn"
                      onClick={(e) => Transfer(e, output.name)}
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
                      value={output.date}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={output.hour}
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
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={output.employee_id}
                    />
                  </div>
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
                  <div className="buttons">
                    <button
                      type="button"
                      className="real-time-stock-btn"
                      onClick={(e) => Transfer(e, output.name)}
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
          id="date"
          placeholder="Data ex: 09-10-2025"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
