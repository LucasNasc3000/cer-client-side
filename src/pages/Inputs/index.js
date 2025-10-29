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
import Register from "../../services/register";
import DoSearch from "../../services/search";
import * as actions from "../../store/modules/dataTransferInput/actions";
import { InputsContainer, InputsSpace, NewInput, SearchSpace } from "./styled";

export default function Inputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [weightperunit, setWeightPerUnit] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expirationdate, setExpirationDate] = useState("");
  const [minimun_quantity, setMinimunQuantity] = useState("");
  const [rateisnear, setRateIsNear] = useState("");
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

  async function GetInputs() {
    const inputs = await GetData(
      bossId,
      "inputsHistory",
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
    setCategory("");
    setName("");
    setReason("");
    setQuantity(null);
    setWeightPerUnit(null);
    setSupplier("");
    setExpirationDate("");
    setPrice("");
    setMinimunQuantity(null);
    setRateIsNear(null);
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

    const options = document.querySelector(".options");
    options.value = "";
  };

  async function SearchInputs(e) {
    e.preventDefault();

    const inArray = [];

    const search = await DoSearch(
      "inputsHistory",
      searchParam,
      searchInput.value
    );

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

  const InputRegister = async (e) => {
    e.preventDefault();

    const data = {
      category: document.querySelector("#category").value,
      name: document.querySelector("#name").value,
      reason: document.querySelector("#reason").value,
      quantity: document.querySelector("#quantity").value,
      weightperunit: document.querySelector("#weightperunit").value,
      price: document.querySelector("#price").value,
      supplier: document.querySelector("#supplier").value,
      expirationdate: document.querySelector("#expirationdate").value,
      employee_id,
      minimun_quantity: document.querySelector("#minimunQuantity").value,
      rateisnear: document.querySelector("#rateisnear").value,
    };

    const register = await Register(data, "inputsHistory");

    setReRender(register);

    clearDirectExecution();
  };

  const Transfer = (e, inputName) => {
    e.preventDefault();
    dispatch(actions.inputDataTransfer({ inputName }));

    history.push("/inputsCurrent");
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
            <option value="reason">Motivo</option>
            <option value="quantity">Quantidade</option>
            <option value="totalweightPerRegister">
              Peso total por registro
            </option>
            <option value="weightperunit">Peso unitário</option>
            <option value="supplier">Fornecedor</option>
            <option value="expirationdate">Data de validade</option>
            <option value="minimun_quantity">Quantidade mínima</option>
            <option value="rateisnear">Próximo ao limite</option>
            <option value="employee">Funcionário</option>
            <option value="price">Preço</option>
            <option value="totalprice">Preço total</option>
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
                      name="weightperunit"
                      className="data-div"
                      value={input.weightperunit}
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
                    <div className="label">Data validade: </div>
                    <input
                      type="text"
                      name="expirationdate"
                      className="data-div"
                      value={input.expirationdate}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="minimun_quantity"
                      className="data-div"
                      value={input.minimun_quantity}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Próximo ao limite: </div>
                    <input
                      type="text"
                      name="rateisnear"
                      className="data-div"
                      value={input.rateisnear}
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
                      value={input.totalprice}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.created_at.slice(8, 10)}-${input.created_at.slice(5, 7)}-${input.created_at.slice(0, 4)}`}
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
                      name="weightperunit"
                      className="data-div"
                      value={input.weightperunit}
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
                    <div className="label">Data validade: </div>
                    <input
                      type="text"
                      name="expirationdate"
                      className="data-div"
                      value={input.expirationdate}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="minimun_quantity"
                      className="data-div"
                      value={input.minimun_quantity}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Próximo ao limite: </div>
                    <input
                      type="text"
                      name="rateisnear"
                      className="data-div"
                      value={input.rateisnear}
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
      <NewInput>
        <input
          type="text"
          id="category"
          placeholder="Categoria ex: cereais"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          id="reason"
          placeholder="Motivo ex: entrada, reposição, etc..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          type="text"
          id="quantity"
          placeholder="Quantidade ex: 25"
          value={quantity || ""}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          id="weightperunit"
          placeholder="Peso unitário ex: 1 (kg)"
          value={weightperunit || ""}
          onChange={(e) => setWeightPerUnit(e.target.value)}
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
          value={minimun_quantity || ""}
          onChange={(e) => setMinimunQuantity(e.target.value)}
        />
        <input
          type="text"
          id="rateisnear"
          placeholder="Próximo ao limite ex: 10"
          value={rateisnear || ""}
          onChange={(e) => setRateIsNear(e.target.value)}
        />
        <input
          type="text"
          id="price"
          placeholder="Preço unitário ex: 10.90"
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
