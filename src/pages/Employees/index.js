/* eslint-disable no-useless-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { get } from "lodash";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header/index";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import DoSearch from "../../services/search";
import * as actions from "../../store/modules/auth/actions";
import { EmployeeCards, EmployeesListContainer, SearchSpace } from "./styled";

export function Employees() {
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);

  const dispatch = useDispatch();

  const [employees, setEmployees] = useState([]);
  const [employeesBackup, setEmployeesBackup] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [exemployees, setExemployees] = useState([]);
  const [exemployeesBackup, setExemployeesBackup] = useState([]);
  const [bossId, setBossId] = useState("");
  const [rerender, setReRender] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isLoadingGetCredentials, setIsLoadingGetCredentials] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errorGetCredentials, setErrorGetCredentials] = useState(false);

  useEffect(() => {
    async function ExecuteGetBossId() {
      if (!emailStored || !permissions || permissions.length < 1) return;

      setIsLoadingGetCredentials(true);

      const getBossId = await GetBossId();

      if (typeof getBossId === "undefined" || !getBossId) return;

      if (getBossId === "error") {
        setErrorGetCredentials(true);
        setIsLoadingGetCredentials(false);
      }

      setBossId(getBossId);
    }

    ExecuteGetBossId();
  }, [bossId, emailStored, permissions]);

  async function GetEmployees() {
    try {
      const employeesSearch = await axios.get("/employees/search/boss/");

      setEmployees(employeesSearch.data);
      setEmployeesBackup(employeesSearch.data);
    } catch (err) {
      switch (true) {
        case err.response &&
          err.response.data &&
          typeof err.response.data !== "string":
          toast.error(err.response.data.message);
          return;

        case err.response &&
          err.response.data &&
          typeof err.response.data === "string":
          return;

        case err instanceof TypeError:
          toast.error("Erro de tratamento de dados");
          return;

        default:
          toast.error(
            "Erro desconhecido ao tentar obter os dados dos funcionários"
          );
          return;
      }
    }
  }

  useEffect(() => {
    if (isLoadingGetCredentials) return;
    GetEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId]);

  useEffect(() => {
    if (isLoadingGetCredentials) return;

    if (rerender === true) GetEmployees();

    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  function clearDirectExecution(isExemployees) {
    if (isExemployees === true) setExemployees(exemployeesBackup);

    setEmployees(employeesBackup);
    setExemployees([]);

    if (searchResults.length > 0) setSearchResults(searchResultsBackup);
  }

  const clear = (e, isExemployees) => {
    e.preventDefault();
    clearDirectExecution(isExemployees);
  };

  const ClearSearch = (e) => {
    e.preventDefault();
    setSearchParam("");
    setSearchResults([]);
    setExemployees([]);
    setSearchInputValue("");
  };

  async function SearchEmployees(e) {
    e.preventDefault();

    if (!searchParam) {
      toast.error("Selecione um filtro de busca");
      return;
    }

    const inArray = [];

    const search = await DoSearch("employees", searchParam, searchInputValue);

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

  async function ShowExEmployees(e) {
    e.preventDefault();
    try {
      const results = await axios.get("/exemployees");

      setExemployees(results.data);
      setExemployeesBackup(results.data);
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

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    if (permissions !== process.env.REACT_APP_ADMIN_ROLE) return;

    setEmployees((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeExemployees = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    if (permissions !== process.env.REACT_APP_ADMIN_ROLE) return;

    setExemployees((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeSearch = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    if (permissions !== process.env.REACT_APP_ADMIN_ROLE) return;

    setSearchResults((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const EmployeeUpdate = (e, empData) => {
    e.preventDefault();

    const bossEdit = empData.boss;
    const permissionEdit = empData.permission;
    const alEdit = empData.address_allowed;
    const { id } = empData;

    dispatch(
      actions.adminUpdateRequest({
        id,
        bossEdit,
        permissionEdit,
        alEdit,
      })
    );

    setReRender(true);
    clearDirectExecution();
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
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            className="search-btn"
            onClick={(e) => SearchEmployees(e)}
          >
            <IoIosSearch size={25} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Pesquisar funcionário..."
            className="input-search"
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="exemp-list"
          onClick={(e) => ShowExEmployees(e)}
        >
          Listar ex-funcionários
        </button>

        <FaArrowLeft
          size={27}
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
            <option value="email">Email</option>
            <option value="name">Nome</option>
            <option value="role">Cargo</option>
            <option value="id">Id</option>
          </select>
        </div>
        <Link to="/newEmployee" className="link">
          <FaPlus size={18} className="plus-icon" />
          Adicionar Funcionário
        </Link>
      </SearchSpace>
      <EmployeeCards>
        {searchResults.length < 1 &&
        exemployees.length < 1 &&
        employees.length < 1 ? (
          <p className="for-empty-results">
            Nenhum funcionário foi cadastrado ainda
          </p>
        ) : searchResults.length < 1 &&
          exemployees.length < 1 &&
          employees.length > 0 ? (
          employees.map((empData) => {
            return (
              <div key={empData.id} className="main-data-div" id={empData.id}>
                <div className="data-wrap">
                  <div className="label">Nome: </div>
                  <input
                    type="text"
                    name="name"
                    className="data-div"
                    value={empData.name}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">E-mail: </div>
                  <input
                    type="text"
                    name="email"
                    className="data-div"
                    value={empData.email}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Permissão: </div>
                  <input
                    type="text"
                    name="permission"
                    className="data-div"
                    value={empData.permission}
                    onChange={(e) => HandleChange(e, empData.id)}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Id: </div>
                  <input
                    type="text"
                    name="id"
                    className="data-div"
                    value={empData.id}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Autorização para receber e-mails </div>
                  <input
                    type="text"
                    name="id"
                    className="data-div"
                    value={empData.address_allowed}
                  />
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="confirm-changes"
                    onClick={(e) => EmployeeUpdate(e, empData)}
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="cancel-changes"
                    onClick={(e) => clear(e, false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                  >
                    Desligar
                  </button>
                </div>
              </div>
            );
          })
        ) : exemployees.length > 0 && searchResults.length < 1 ? (
          exemployees.map((empData) => {
            return (
              <div key={empData.id} className="main-data-div" id={empData.id}>
                <div className="data-wrap">
                  <div className="label">Nome: </div>
                  <input
                    type="text"
                    name="name"
                    className="data-div"
                    value={empData.name}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">E-mail: </div>
                  <input
                    type="text"
                    name="email"
                    className="data-div"
                    value={empData.email}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Permissão: </div>
                  <input
                    type="text"
                    name="permission"
                    className="data-div"
                    value={empData.permission}
                    onChange={(e) => HandleChangeExemployees(e, empData.id)}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Id: </div>
                  <input
                    type="text"
                    name="id"
                    className="data-div"
                    value={empData.id}
                  />
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="confirm-changes"
                    onClick={(e) => EmployeeUpdate(e, empData)}
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="cancel-changes"
                    onClick={(e) => clear(e, false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                  >
                    Desligar
                  </button>
                </div>
              </div>
            );
          })
        ) : searchResults.length > 0 && exemployees.length < 1 ? (
          searchResults.map((empData) => {
            return (
              <div key={empData.id} className="main-data-div" id={empData.id}>
                <div className="data-wrap">
                  <div className="label">Nome: </div>
                  <input
                    type="text"
                    name="name"
                    className="data-div"
                    value={empData.name}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">E-mail: </div>
                  <input
                    type="text"
                    name="email"
                    className="data-div"
                    value={empData.email}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Permissão: </div>
                  <input
                    type="text"
                    name="permission"
                    className="data-div"
                    value={empData.permission}
                    onChange={(e) => HandleChangeSearch(e, empData.id)}
                  />
                </div>
                <div className="data-wrap">
                  <div className="label">Id: </div>
                  <input
                    type="text"
                    name="id"
                    className="data-div"
                    value={empData.id}
                  />
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="confirm-changes"
                    onClick={(e) => EmployeeUpdate(e, empData)}
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="cancel-changes"
                    onClick={(e) => clear(e, false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                  >
                    Desligar
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          ""
        )}
      </EmployeeCards>
    </EmployeesListContainer>
  );
}
