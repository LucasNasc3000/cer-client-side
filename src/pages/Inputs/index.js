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
import history from "../../services/history";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import Update from "../../services/update";
import { InputsContainer, InputsSpace, NewInput, SearchSpace } from "./styled";

export default function Inputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [interquantity, setInterQuantity] = useState("");
  const [intertotalweight, setInterTotalWeight] = useState("");
  const [interweightperunit, setInterWeightPerUnit] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expirationdate, setExpirationDate] = useState("");
  const [interminimun_quantity, setInterMinimunQuantity] = useState("");
  const [interrateisnear, setInterRateIsNear] = useState("");
  const [price, setPrice] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [inputsData, setInputsData] = useState([]);
  const [inputsDataBackup, setInputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
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
    if (rerender === true) GetInputs();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const clearDirectExecution = () => {
    setType("");
    setName("");
    setInterQuantity(null);
    setInterTotalWeight(null);
    setInterWeightPerUnit(null);
    setSupplier("");
    setExpirationDate("");
    setPrice("");
    setInterMinimunQuantity(null);
    setInterRateIsNear(null);
    setInputsData(inputsDataBackup);
    setSearchParam("");
    setSearchResults([]);
    searchInput.value = "";

    const options = document.querySelector(".options");
    options.value = "";
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const ClearSearch = (e) => {
    e.preventDefault();
    setSearchResults(searchResultsBackup);
  };

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    setInputsData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeSearch = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

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

    const toNumberFields = [
      "quantity",
      "totalweight",
      "weightperunit",
      "minimun_quantity",
      "rateisnear",
    ];

    toNumberFields.forEach((field) => {
      if (typeof objectData[field] === "string") {
        const parsedValue = parseInt(objectData[field], 10);
        objectData[field] = parsedValue;
      }
    });

    const update = await Update(objectData.id, objectData, "inputs");

    setReRender(update);

    clearDirectExecution();
  };

  const InputRegister = async (e) => {
    e.preventDefault();

    const data = {
      type: document.querySelector("#type").value,
      name: document.querySelector("#name").value,
      interquantity: document.querySelector("#quantity").value,
      intertotalweight: document.querySelector("#totalweight").value,
      interweightperunit: document.querySelector("#weightperunit").value,
      supplier: document.querySelector("#supplier").value,
      expirationdate: document.querySelector("#expirationdate").value,
      interminimun_quantity: document.querySelector("#minimunQuantity").value,
      interrateisnear: document.querySelector("#rateisnear").value,
      employee_id,
      price: document.querySelector("#price").value,
    };

    const register = await Register(data, "inputs");

    setReRender(register);

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
            <option value="type">Tipo</option>
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
                    <div className="label">Tipo: </div>
                    <input
                      type="text"
                      name="type"
                      className="data-div"
                      value={input.type}
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
                </div>
              );
            })
          : searchResults.map((input) => {
              return (
                <div key={input.id} className="main-data-div" id={input.id}>
                  <div className="label">Tipo: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Quantidade: </div>
                  <div className="label">Peso total: </div>
                  <div className="label">Peso unitário: </div>
                  <div className="label">Fornecedor: </div>
                  <div className="label">Data validade: </div>
                  <div className="label">Quantidade mínima: </div>
                  <div className="label">Próximo ao limite: </div>
                  <div className="label">Funcionário: </div>
                  <div className="label">Preço: </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="type"
                      className="data-div"
                      value={input.type}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={input.name}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="quantity"
                      className="data-div"
                      value={input.quantity}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="totalweight"
                      className="data-div"
                      value={input.totalweight}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="weightperunit"
                      className="data-div"
                      value={input.weightperunit}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="supplier"
                      className="data-div"
                      value={input.supplier}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="expirationdate"
                      className="data-div"
                      value={input.expirationdate}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="minimun_quantity"
                      className="data-div"
                      value={input.minimun_quantity}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="rateisnear"
                      className="data-div"
                      value={input.rateisnear}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      className="data-div"
                      value={input.employee_id}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={input.price}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
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
                    onClick={(e) => ClearSearch(e)}
                  >
                    Cancelar
                  </button>
                </div>
              );
            })}
      </InputsSpace>
      <NewInput>
        <input
          type="text"
          id="type"
          placeholder="Tipo ex: cereais"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          id="name"
          placeholder="Nome ex: arroz branco"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="quantity"
          placeholder="Quantidade ex: 25"
          value={interquantity || ""}
          onChange={(e) => setInterQuantity(e.target.value)}
        />
        <input
          type="text"
          id="totalweight"
          placeholder="Peso total ex: 10,50 (kg)"
          value={intertotalweight || ""}
          onChange={(e) => setInterTotalWeight(e.target.value)}
        />
        <input
          type="text"
          id="weightperunit"
          placeholder="Peso unitário ex: 1 (kg)"
          value={interweightperunit || ""}
          onChange={(e) => setInterWeightPerUnit(e.target.value)}
        />
        <input
          type="text"
          id="supplier"
          placeholder="Fornecedor ex: shopee"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <input
          type="text"
          id="expirationdate"
          placeholder="Validade ex: 25-03-2027"
          value={expirationdate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <input
          type="text"
          id="minimunQuantity"
          placeholder="quantidade mínima ex: 5"
          value={interminimun_quantity || ""}
          onChange={(e) => setInterMinimunQuantity(e.target.value)}
        />
        <input
          type="text"
          id="rateisnear"
          placeholder="Próximo ao limite ex: 10"
          value={interrateisnear || ""}
          onChange={(e) => setInterRateIsNear(e.target.value)}
        />
        <input
          type="text"
          id="price"
          placeholder="Preço ex: 10.90"
          value={price || ""}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => InputRegister(e)}>
          Adicionar
        </button>
      </NewInput>
    </InputsContainer>
  );
}
