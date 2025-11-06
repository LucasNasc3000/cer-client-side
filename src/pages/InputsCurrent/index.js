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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import history from "../../services/history";
import DoSearch from "../../services/search";
import Update from "../../services/update";
import * as actions from "../../store/modules/dataTransferInput/actions";
import { InputsContainer, InputsSpace, SearchSpace } from "./styled";

export default function InputsCurrent() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);
  const inputName = useSelector((state) => state.dataTransferInput.inputName);

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");
  const [inputsData, setInputsData] = useState([]);
  const [inputsDataBackup, setInputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [searchValueAutoSearch, setSearchValueAutoSearch] = useState("");
  const searchInput = document.querySelector(".input-search");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);

  useEffect(() => {
    const PermissionCheck = () => {
      if (
        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE &&
        permissionlStored !== process.env.REACT_APP_INPUTS &&
        permissionlStored !== process.env.REACT_APP_IOUT &&
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

  useEffect(() => {
    if (inputName) {
      setSearchValueAutoSearch(inputName);
      setSearchParam("name");
    }
  }, [inputName]);

  useEffect(() => {
    async function SearchTheInput() {
      const inArray = [];

      const search = await DoSearch("inputs", searchParam, searchInput.value);

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

    if (searchParam) SearchTheInput();
  }, [searchInput, searchParam]);

  async function GetInputs() {
    const inputs = await GetData(
      bossId,
      "inputs",
      employee_id,
      permissionlStored
    );

    if (typeof inputs === "undefined" || !inputs) return;

    setInputsData(inputs);
    setInputsDataBackup(inputs);
  }

  useEffect(() => {
    GetInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    setTimeout(() => {
      setReRender(true);
    }, 120000);
  });

  useEffect(() => {
    if (rerender === true) GetInputs();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const clearDirectExecution = () => {
    setInputsData(inputsDataBackup);
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
    searchInput.value = "";

    dispatch(actions.inputDataTransfer({}));

    const options = document.querySelector(".options");
    options.value = "";
  };

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    if (permissionlStored !== process.env.REACT_APP_ADMIN_ROLE) return;

    setInputsData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeSearch = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    if (permissionlStored !== process.env.REACT_APP_ADMIN_ROLE) return;

    setSearchResults((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  async function SearchInputs(e) {
    e.preventDefault();

    const inArray = [];

    const search = await DoSearch("inputs", searchParam, searchInput.value);

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

  const InputUpdate = async (e, objectData) => {
    e.preventDefault();

    const decimalRegex = /^\d+(?:[.,]\d+)$/;

    const toNumberFields = [
      "quantity",
      "price",
      "weightperunit",
      "totalweight",
      "minimun_quantity",
      "rateisnear",
    ];

    toNumberFields.forEach((field) => {
      if (decimalRegex.test(objectData[field])) {
        objectData[field] = objectData[field].replace(",", ".");

        objectData[field] = parseFloat(objectData[field]);

        const parsedValue = parseInt(objectData[field], 10);

        objectData[field] = parsedValue;
      }
    });

    const update = await Update(objectData.id, objectData, "inputs");

    setReRender(update);

    clearDirectExecution();
  };

  return (
    <InputsContainer>
      <Header />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            size={30}
            className="search-btn"
            onClick={(e) => SearchInputs(e)}
          >
            <IoIosSearch size={25} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="input-search"
            value={searchValueAutoSearch !== "" ? inputName : ""}
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
            <option value="category">Categoria</option>
            <option value="name">Nome</option>
            <option value="quantity">Quantidade</option>
            <option value="totalweight">Peso total</option>
            <option value="weightperunit">Peso unitário</option>
            <option value="supplier">Fornecedor</option>
            <option value="expirationdate">Data de validade</option>
            <option value="minimun_quantity">Quantidade mínima</option>
            <option value="rateisnear">Próximo ao limite</option>
            <option value="employee">Funcionário</option>
            <option value="price">Preço</option>
          </select>
        </div>
      </SearchSpace>
      <InputsSpace>
        {searchResults.length < 1
          ? inputsData.map((input) => {
              return (
                <div key={input.id} className="main-data-div" id={input.id}>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={input.category}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={input.name}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade: </div>
                    <input
                      type="text"
                      name="quantity"
                      className="data-div"
                      value={input.quantity}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso total: </div>
                    <input
                      type="text"
                      name="totalweight"
                      className="data-div"
                      value={input.totalweight}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightperunit"
                      className="data-div"
                      value={input.weightperunit}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Fornecedor: </div>
                    <input
                      type="text"
                      name="supplier"
                      className="data-div"
                      value={input.supplier}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Data validade: </div>
                    <input
                      type="text"
                      name="expirationdate"
                      className="data-div"
                      value={input.expirationdate}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="minimun_quantity"
                      className="data-div"
                      value={input.minimun_quantity}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Próximo ao limite: </div>
                    <input
                      type="text"
                      name="rateisnear"
                      className="data-div"
                      value={input.rateisnear}
                      onChange={(e) => HandleChange(e, input.id)}
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
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  {permissionlStored === process.env.REACT_APP_ADMIN_ROLE ? (
                    <div className="buttons">
                      <button
                        type="button"
                        className="confirm-changes"
                        onClick={(e) => InputUpdate(e, input)}
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
                  ) : (
                    ""
                  )}
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
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={input.name}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade: </div>
                    <input
                      type="text"
                      name="quantity"
                      className="data-div"
                      value={input.quantity}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso total: </div>
                    <input
                      type="text"
                      name="totalweight"
                      className="data-div"
                      value={input.totalweight}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightperunit"
                      className="data-div"
                      value={input.weightperunit}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Fornecedor: </div>
                    <input
                      type="text"
                      name="supplier"
                      className="data-div"
                      value={input.supplier}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Data validade: </div>
                    <input
                      type="text"
                      name="expirationdate"
                      className="data-div"
                      value={input.expirationdate}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="minimun_quantity"
                      className="data-div"
                      value={input.minimun_quantity}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Próximo ao limite: </div>
                    <input
                      type="text"
                      name="rateisnear"
                      className="data-div"
                      value={input.rateisnear}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
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
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  {permissionlStored === process.env.REACT_APP_ADMIN_ROLE ? (
                    <div className="buttons">
                      <button
                        type="button"
                        className="confirm-changes"
                        onClick={(e) => InputUpdate(e, input)}
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
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
      </InputsSpace>
    </InputsContainer>
  );
}
