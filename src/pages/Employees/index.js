import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import {
  EmployeeCards,
  EmployeeInputs,
  EmployeesListContainer,
  SearchSpace,
} from "./styled";

export function Employees() {
  const dispatch = useDispatch();
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permission = useSelector((state) => state.auth.permission);
  const searchInput = document.querySelector(".input-search");
  const [employees, setEmployees] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [exemployees, setExemployees] = useState([]);
  const [boss, setBoss] = useState("");
  const [bossEdit, setBossEdit] = useState("");
  const [permissionEdit, setPermissionEdit] = useState("");
  const [alEdit, setAlEdit] = useState("");
  const [id, setId] = useState(0);
  const [rerender, setReRender] = useState(false);

  useEffect(() => {
    const PermissionCheck = () => {
      if (permission !== process.env.REACT_APP_ADMIN_ROLE) history.goBack();
    };

    PermissionCheck();
  }, []);

  useEffect(() => {
    async function ExecuteGetBossId() {
      const bossId = await GetBossId(headerid, emailStored);

      if (typeof bossId === "undefined" || !bossId) return;

      setBoss(bossId);
    }

    ExecuteGetBossId();
  }, [boss, emailStored, headerid]);

  function clearDirectExecution() {
    setId(0);
    setBossEdit("");
    setAlEdit("");
    setPermissionEdit("");
    setSearchResults([]);
    setExemployees([]);
    searchInput.value = "";
  }

  async function getEmployees() {
    try {
      const employeesSearch = await axios.post(`/employees/search/boss/`, {
        boss,
      });
      setEmployees(employeesSearch.data);
    } catch (err) {
      const errors = get(err, "response.data.error", []);
      const status = get(err, "response.status", 0);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1 && status !== 404) {
          toast.error(
            "Erro desconhecido ao tentar obter os dados dos funcionários"
          );
        }
      }
    }
  }

  async function DoSearch(e) {
    e.preventDefault();
    try {
      const results = await axios.get(
        `/employees/search/id/${searchInput.value}`
      );

      const inArray = [results.data];

      setSearchResults(inArray);
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao pesquisar funcionário");
        }
      }
    }
  }

  async function ShowExEmployees(e) {
    e.preventDefault();
    try {
      const results = await axios.get("/exemployees");
      setExemployees(results.data);
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar listar ex-funcionários");
        }
      }
    }
  }

  useEffect(() => {
    getEmployees();
  }, [boss]);

  useEffect(() => {
    if (rerender === true) getEmployees();
    setReRender(false);
  }, [rerender]);

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const employeeUpdate = (e) => {
    e.preventDefault();

    dispatch(
      actions.adminUpdateRequest({
        id,
        bossEdit,
        permissionEdit,
        alEdit,
      })
    );

    clearDirectExecution();
    setReRender(true);
  };

  const SetInputs = async (e, idParam, data) => {
    e.preventDefault();

    const getBossName = await axios.get(`/employees/search/id/${data.boss}`);

    setId(idParam);
    setBossEdit(getBossName.data.name);
    setPermissionEdit(data.permission);
    setAlEdit(data.address_allowed);
  };

  const DeleteAsk = (e, email, idParamExclude) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals, no-alert
    const ask = confirm(`Deseja mesmo desligar o funcionário ${email}`);

    if (ask === true) {
      try {
        axios.put(`/employees/${idParamExclude}`, {
          is_active: 0,
        });

        setReRender(true);
      } catch (err) {
        const errors = get(err, "response.data.error", []);

        if (err) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (err && errors.length < 1) {
            toast.error("Erro desconhecido ao tentar desligar funcionário");
          }
        }
      }
    }
  };

  return (
    <EmployeesListContainer>
      <Header />
      <Footer />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            className="search-btn"
            onClick={(e) => DoSearch(e)}
          >
            Pesquisar
          </button>
          <input
            type="text"
            placeholder="Pesquisar funcionário pelo id"
            className="input-search"
          />
        </div>

        <button
          type="button"
          className="exemp-list"
          onClick={(e) => ShowExEmployees(e)}
        >
          Listar ex-funcionários
        </button>

        <FaArrowLeft size={27} className="arrow" onClick={(e) => clear(e)} />
      </SearchSpace>
      <EmployeeCards>
        {searchResults.length < 1 && exemployees.length < 1
          ? employees.map((empData) => {
              return (
                <div className="main-data-div">
                  <div key={empData.id}>
                    <div className="name">{empData.name}</div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => SetInputs(e, empData.id, empData)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="del-btn"
                      onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                    >
                      Desligar
                    </button>
                    <div className="id-label">Id:</div>
                    <div className="id">{empData.id}</div>
                    <div className="email-label">E-mail:</div>
                    <div className="email">{empData.email}</div>
                    <div className="permission-label">Permissão:</div>
                    <div className="permission">{empData.permission}</div>
                    <div className="al-label">
                      Autorização para receber e-mails:
                    </div>
                    <div className="a-l">{empData.address_allowed}</div>
                  </div>
                </div>
              );
            })
          : ""}

        {exemployees.length > 0 && searchResults.length < 1
          ? exemployees.map((empData) => {
              return (
                <div className="main-data-div">
                  <div key={empData.id}>
                    <div className="name">{empData.name}</div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => SetInputs(e, empData.id, empData)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="del-btn"
                      onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                    >
                      Desligar
                    </button>
                    <div className="id-label">Id:</div>
                    <div className="id">{empData.id}</div>
                    <div className="email-label">E-mail:</div>
                    <div className="email">{empData.email}</div>
                    <div className="permission-label">Permissão:</div>
                    <div className="permission">{empData.permission}</div>
                    <div className="al-label">
                      Autorização para receber e-mails:
                    </div>
                    <div className="a-l">{empData.address_allowed}</div>
                  </div>
                </div>
              );
            })
          : ""}

        {searchResults.length > 0 && exemployees.length < 1
          ? searchResults.map((empData) => {
              return (
                <div className="main-data-div">
                  <div key={empData.id}>
                    <div className="name">{empData.name}</div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => SetInputs(e, empData.id, empData)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="del-btn"
                      onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                    >
                      Desligar
                    </button>
                    <div className="id-label">Id:</div>
                    <div className="id">{empData.id}</div>
                    <div className="email-label">E-mail:</div>
                    <div className="email">{empData.email}</div>
                    <div className="permission-label">Permissão:</div>
                    <div className="permission">{empData.permission}</div>
                    <div className="al-label">
                      Autorização para receber e-mails:
                    </div>
                    <div className="a-l">{empData.address_allowed}</div>
                  </div>
                </div>
              );
            })
          : ""}
      </EmployeeCards>
      <EmployeeInputs>
        <input
          type="text"
          className="permission"
          placeholder="Permissao..."
          value={permissionEdit}
          onChange={(e) => setPermissionEdit(e.target.value)}
        />
        <input
          type="text"
          className="a-l"
          placeholder="Endereço de email autorizado..."
          value={alEdit}
          onChange={(e) => setAlEdit(e.target.value)}
        />
        <input
          type="text"
          className="boss"
          placeholder="Nome do chefe..."
          value={bossEdit}
          onChange={(e) => setBossEdit(e.target.value)}
        />
        <button type="button" className="btn-cancel" onClick={clear}>
          Cancelar
        </button>
        <button
          type="button"
          className="btn"
          onClick={(e) => employeeUpdate(e)}
        >
          Salvar
        </button>
        <Link to="/employee/new" className="link">
          <FaPlus size={18} className="plus-icon" />
          Adicionar Funcionário
        </Link>
      </EmployeeInputs>
    </EmployeesListContainer>
  );
}
