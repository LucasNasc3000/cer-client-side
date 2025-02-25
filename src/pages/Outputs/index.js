/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
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
  const [outputId, setOutputId] = useState(0);
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
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
    setOutputId(0);
    setType("");
    setName("");
    setUnities("");
    setDate("");
    searchOutput.value = "";
    setSearchResults([]);
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const SetOutputs = (e, idParam, data) => {
    e.preventDefault();

    setOutputId(idParam);
    setDate(data.date);
    setName(data.name);
    setType(data.type);
    setUnities(data.unities);
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

  const OutputUpdate = async () => {
    const ddate = new Date();
    const hour = ddate.toLocaleTimeString("pt-br", {
      hourCycle: "h24",
    });

    const data = {
      date,
      hour,
      name,
      type,
      unities,
      employee_id,
    };

    const update = await Update(outputId, data, "outputs");
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
      date,
      hour,
      name,
      type,
      unities,
      employee_id,
    };

    const register = await Register(data, "outputs");
    setReRender(register);

    clearDirectExecution();
  };

  const IdVerify = (e) => {
    e.preventDefault();

    if (outputId !== 0) {
      OutputUpdate();
    } else {
      OutputRegister(e);
    }
  };

  return (
    <OutputsContainer>
      <Header />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            className="search-btn"
            onClick={(e) => SearchOutputs(e)}
          >
            Pesquisar
          </button>
          <input
            type="text"
            placeholder="Pesquisar saída..."
            className="output-search"
          />
        </div>

        <FaArrowLeft size={27} className="arrow" onClick={(e) => clear(e)} />
        <div className="checkboxes">
          <input
            type="checkbox"
            className="checkbox"
            name="date"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Data</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="hour"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Hora</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="name"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Nome</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="type"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Tipo</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="unities"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Unidades</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="employeeid"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Registrado por</h3>
        </div>
      </SearchSpace>
      <OutputsSpace>
        {searchResults.length < 1
          ? outputsData.map((output) => {
              return (
                <div key={output.id} className="main-data-div">
                  <div className="edit">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) => SetOutputs(e, output.id, output)}
                    >
                      Editar
                    </button>
                  </div>
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Tipo: </div>
                  <div className="label">Unidades: </div>
                  <div className="label">Funcionário: </div>
                  <div className="data-div">{output.date}</div>
                  <div className="data-div">{output.hour}</div>
                  <div className="data-div">{output.name}</div>
                  <div className="data-div">{output.type}</div>
                  <div className="data-div">{output.unities}</div>
                  <div className="data-div">{output.employee_id}</div>
                </div>
              );
            })
          : searchResults.map((output) => {
              return (
                <div key={output.id} className="main-data-div">
                  <div className="edit">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) => SetOutputs(e, output.id, output)}
                    >
                      Editar
                    </button>
                  </div>
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Tipo: </div>
                  <div className="label">Unidades: </div>
                  <div className="label">Funcionário: </div>
                  <div className="data-div">{output.date}</div>
                  <div className="data-div">{output.hour}</div>
                  <div className="data-div">{output.name}</div>
                  <div className="data-div">{output.type}</div>
                  <div className="data-div">{output.unities}</div>
                  <div className="data-div">{output.employee_id}</div>
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
        <button type="button" className="btn" onClick={(e) => IdVerify(e)}>
          Adicionar
        </button>
      </NewOutput>
    </OutputsContainer>
  );
}
