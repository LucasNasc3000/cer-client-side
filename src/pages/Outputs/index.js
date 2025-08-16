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
import history from "../../services/history";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import Update from "../../services/update";
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

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [unities, setUnities] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [outputsData, setOutputsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
  }, []);

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
    setType("");
    setName("");
    setUnities("");
    setDate("");
    setSearchParam("");
    setSearchResults([]);
    searchOutput.value = "";
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    setOutputsData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  async function SearchOutputs(e) {
    e.preventDefault();

    const inArray = [];

    const search = await DoSearch("outputs", searchParam, searchOutput.value);

    if (typeof search === "undefined" || !search) return;

    if (Array.isArray(search)) {
      setSearchResults(search);
      return;
    }

    inArray.push(search);
    setSearchResults(inArray);
    return;
  }

  const OutputUpdate = async (e, objectData) => {
    e.preventDefault();

    const ddate = new Date();
    const hour = ddate.toLocaleTimeString("pt-br", {
      hourCycle: "h24",
    });

    const data = {
      date: objectData.date,
      hour,
      name: objectData.name,
      type: objectData.type,
      unities: objectData.unities,
      employee_id,
    };

    const update = await Update(objectData.id, data, "outputs");

    setReRender(update);

    clearDirectExecution();
  };

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
      type: document.querySelector("#type").value,
      unities: document.querySelector("#type").value,
      employee_id,
    };

    const register = await Register(data, "outputs");

    setReRender(register);

    clearDirectExecution();
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

        <FaArrowLeft size={35} className="arrow" onClick={(e) => clear(e)} />

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
            <option value="type">Tipo</option>
            <option value="unities">Unidades</option>
            <option value="employee">Funcionário</option>
          </select>
        </div>
      </SearchSpace>
      <OutputsSpace>
        {searchResults.length < 1
          ? outputsData.map((output) => {
              return (
                <div key={output.id} className="main-data-div" id={output.id}>
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Tipo: </div>
                  <div className="label">Unidades: </div>
                  <div className="label">Funcionário: </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={output.date}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={output.hour}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={output.name}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="type"
                      className="data-div"
                      value={output.type}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="unities"
                      className="data-div"
                      value={output.unities}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      className="data-div"
                      value={output.employee_id}
                    />
                  </div>
                  <button
                    type="button"
                    className="confirm-changes"
                    onClick={(e) => OutputUpdate(e, output)}
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="cancel-changes"
                    onClick={(e) => clear(e)}
                  >
                    Cancelar
                  </button>
                </div>
              );
            })
          : searchResults.map((output) => {
              return (
                <div key={output.id} className="main-data-div" id={output.id}>
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Tipo: </div>
                  <div className="label">Unidades: </div>
                  <div className="label">Funcionário: </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={output.date}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={output.hour}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={output.name}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="type"
                      className="data-div"
                      value={output.type}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="unities"
                      className="data-div"
                      value={output.unities}
                      onChange={(e) => HandleChange(e, output.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      className="data-div"
                      value={output.employee_id}
                    />
                  </div>
                  <button
                    type="button"
                    className="confirm-changes"
                    onClick={(e) => OutputUpdate(e)}
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="cancel-changes"
                    onClick={(e) => clear(e)}
                  >
                    Cancelar
                  </button>
                </div>
              );
            })}
      </OutputsSpace>
      <NewOutput>
        <input
          type="text"
          placeholder="Data ex: 09-10-2025"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome ex: abacaxi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo ex: fruta"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unidades ex: 15"
          value={unities}
          onChange={(e) => setUnities(e.target.value)}
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
