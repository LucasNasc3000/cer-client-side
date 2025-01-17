/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import Register from "../../services/register";
import Update from "../../services/update";
import * as actions from "../../store/modules/auth/actions";
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
    async function GetData() {
      try {
        if (!headerid || headerid === "") {
          const bossData = await axios.get(
            `/employees/search/email/${emailStored}`
          );

          const { id } = bossData.data;
          setBossId(id);
          return;
        }
        const employeeData = await axios.get(
          `/employees/search/email/${emailStored}`
        );

        const { boss } = employeeData.data;
        setBossId(boss);
      } catch (e) {
        toast.error("Erro ao obter dados identificadores");
      }
    }
    GetData();
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
        toast.error("Erro ao verificar id no cabeçalho");
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  async function GetOutputs() {
    const outputsRaw = [];
    const allOutputs = [];
    const joinData = [];

    try {
      const getEmployeesByBoss = await axios.get(
        `/employees/search/boss/${bossId}`
      );

      const employeesIds = getEmployeesByBoss.data.map((employees) => {
        return employees.id;
      });

      for (let i = 0; i < employeesIds.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const outputs = await axios.get(
          `/outputs/search/employeeid/${employeesIds[i]}`
        );

        if (outputs.data) outputsRaw.push(outputs.data);
      }

      for (let i = 0; i < outputsRaw.length; i++) {
        const join = allOutputs.concat(outputsRaw[i]);
        joinData.push(...join);
      }

      // Adiciona à variável inputsData os registros do chefe, se houverem. Acontecerá independentemente da permissão do funcionário
      if (permissionlStored === process.env.REACT_APP_ADMIN_ROLE) {
        const bossOutputs = await axios.get(
          `/outputs/search/employeeid/${employee_id}`
        );

        joinData.push(...bossOutputs.data);
      } else {
        const bossOutputs = await axios.get(
          `/outputs/search/employeeid/${bossId}`
        );

        joinData.push(...bossOutputs.data);
      }

      setOutputsData(joinData);

      if (!outputsData) toast.error("Erro ao exibir saídas");
    } catch (e) {
      if (typeof e.response.data === "string") return;

      const errors = get(e, "response.data.error", []);

      if (e) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (e && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar exibir saídas");
        }
      }
    }
  }

  useEffect(() => {
    GetOutputs();
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetOutputs();
    setReRender(false);
  }, [rerender]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  const clearDirectExecution = () => {
    setOutputId(0);
    setType("");
    setName("");
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

  async function DoSearch(e) {
    e.preventDefault();
    try {
      const results = await axios.get(
        `/outputs/search/${searchParam}/${searchOutput.value}`
      );
      setSearchResults(results.data);
    } catch (err) {
      toast.error(err);
    }
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
        <FaSearch
          size={30}
          className="search-icon"
          onClick={(e) => DoSearch(e)}
        />
        <input
          type="text"
          placeholder="Pesquisar saída..."
          className="output-search"
        />
        <MdLogout size={27} class="logout" onClick={(e) => handleLogout(e)} />
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
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => SetOutputs(e, output.id, output)}
                    />
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
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => SetOutputs(e, output.id, output)}
                    />
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
          placeholder="Data..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo..."
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unidades..."
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
