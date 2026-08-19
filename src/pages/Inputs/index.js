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
import { MdErrorOutline } from "react-icons/md";
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
import { ErrorIcon, GetDataSpinner } from "../../styles/GlobalStyles";
import {
  Btn,
  InputsContainer,
  InputsSpace,
  NewInput,
  SearchSpace,
  Spinner,
} from "./styled";

export default function Inputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [weightPerUnit, setWeightPerUnit] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [lowStock, setLowStock] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [supplySearchPath, setSupplySearchPath] = useState("");
  const [inputsData, setInputsData] = useState([]);
  const [inputsDataBackup, setInputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);
  const [isLoadingGetInputs, setIsLoadingGetInputs] = useState(false);
  const [isLoadingInputs, setIsLoadingInputs] = useState(false);
  const [isLoadingGetCredentials, setIsLoadingGetCredentials] = useState(false);
  const [errorGetCredentials, setErrorGetCredentials] = useState(false);

  const SPECIFIC_PATH = "specific";
  const GENERAL_PATH = "general";

  useEffect(() => {
    async function ExecuteGetBossId() {
      setIsLoadingGetCredentials(true);

      const get = await GetBossId(headerid, emailStored);

      if (typeof get === "undefined" || !get) return;

      if (get === "error") {
        setErrorGetCredentials(true);
        setIsLoadingGetCredentials(false);
      }

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
        setErrorGetCredentials(true);
        toast.error("Erro ao verificar id");
      } finally {
        setIsLoadingGetCredentials(false);
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  async function GetInputs() {
    if (!employee_id || !permissions) return;

    setIsLoadingGetInputs(true);

    const inputsReq = await GetData(
      bossId,
      "supplies",
      employee_id,
      permissions,
      "SUPPLY_HISTORY",
      true
    );

    if (typeof inputsReq === "undefined" || !inputsReq) return;

    setIsLoadingGetInputs(false);
    setInputsData(inputsReq);
    setInputsDataBackup(inputsReq);
  }

  useEffect(() => {
    if (isLoadingGetCredentials) return;
    GetInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (isLoadingGetCredentials) return;

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
    setDetails("");
    setLowStock(null);
    setInputsData(inputsDataBackup);

    if (searchResults.length > 0) setSearchResults(searchResultsBackup);
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const ClearSearch = (e) => {
    e.preventDefault();
    setSearchResults([]);
    setSearchInputValue("");
  };

  function HandleOptionsValue(e) {
    const searchType = e.slice(-1);
    const formattedParam = e.slice(0, -2);

    if (searchType === "S") {
      setSupplySearchPath(GENERAL_PATH);
    } else {
      setSupplySearchPath(SPECIFIC_PATH);
    }

    setSearchParam(formattedParam);
  }

  async function SearchInputs(e) {
    e.preventDefault();

    if (!searchParam) {
      toast.error("Selecione um filtro de busca");
      return;
    }

    const inArray = [];

    let search = "";

    if (searchParam === "date" || searchParam === "expirationDate") {
      const year = searchInputValue.slice(6, 10);
      const month = searchInputValue.slice(3, 5);
      const day = searchInputValue.slice(0, 2);

      const formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch(
        "supplies",
        searchParam,
        formattedDate,
        "SUPPLY_HISTORY",
        null,
        supplySearchPath
      );
    } else if (
      searchParam === "price" ||
      searchParam === "totalprice" ||
      searchParam === "weightPerUnit"
    ) {
      const formattedPWithDot = searchInputValue.replace(",", ".");

      search = await DoSearch(
        "supplies",
        searchParam,
        formattedPWithDot,
        "SUPPLY_HISTORY",
        null,
        supplySearchPath
      );
    } else {
      search = await DoSearch(
        "supplies",
        searchParam,
        searchInputValue,
        "SUPPLY_HISTORY",
        null,
        supplySearchPath
      );
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

  const InputRegister = async (e) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para cadastrar insumos necessária");
      return;
    }

    const data = {
      category,
      name,
      reason,
      details: details || null,
      quantity,
      weightPerUnit,
      price,
      supplier,
      expirationDate,
      lowStock: lowStock || null,
    };

    const year = data.expirationDate.slice(6, 10);
    const month = data.expirationDate.slice(3, 5);
    const day = data.expirationDate.slice(0, 2);

    data.expirationDate = `${year}-${month}-${day}`;
    data.price = data.price.replace(",", ".");

    setIsLoadingInputs(true);

    const register = await Register(data, "supplies");

    if (register) {
      setReRender(register);
    }

    setIsLoadingInputs(false);
  };

  const Transfer = (e, inputName) => {
    e.preventDefault();

    dispatch(actions.inputDataTransfer({ inputName }));

    history.push("/inputs/current");
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
            onChange={(e) => HandleOptionsValue(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="category-S">Categoria</option>
            <option value="name-S">Nome</option>
            <option value="reason-H">Motivo</option>
            <option value="totalweightPerRegister-H">
              Peso total por registro
            </option>
            <option value="weightPerUnit-S">Peso unitário</option>
            <option value="supplier-S">Fornecedor</option>
            <option value="expirationDate-H">Validade</option>
            <option value="date-S">Data de cadastro</option>

            {permissions.some(
              (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
            ) && <option value="employee-S">Funcionário</option>}

            <option value="price-S">Preço unitário</option>
            <option value="totalprice-S">Preço total</option>
          </select>
        </div>
      </SearchSpace>
      <InputsSpace>
        {isLoadingGetCredentials && <Spinner />}

        {errorGetCredentials && !isLoadingGetCredentials && (
          <ErrorIcon>
            <MdErrorOutline size={95} />
          </ErrorIcon>
        )}

        {isLoadingGetInputs && <GetDataSpinner />}

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
                      value={input.reason || "Não especificado"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="details"
                      className="data-div"
                      value={input.details || "Sem detalhes"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
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
                      value={input.totalWeightPerRegister.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightPerUnit"
                      className="data-div"
                      value={input.weightPerUnit.replace(".", ",")}
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
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={`${input.expirationDate.slice(8, 10)}/${input.expirationDate.slice(5, 7)}/${input.expirationDate.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={input.lowStock || "Não definido"}
                      readOnly
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
                        value={input.employee.id}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Preço unitário: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={input.price.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço total: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={input.totalPrice.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Data de registro: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.createdAt.slice(8, 10)}/${input.createdAt.slice(5, 7)}/${input.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora de registro: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={`${input.createdAt.slice(11, 13)}:${input.createdAt.slice(14, 16)}:${input.createdAt.slice(17, 19)}`}
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
                      value={input.reason || "Não especificado"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="details"
                      className="data-div"
                      value={input.details || "Sem detalhes"}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
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
                      value={input.totalWeightPerRegister.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightPerUnit"
                      className="data-div"
                      value={input.weightPerUnit.replace(".", ",")}
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
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={`${input.expirationDate.slice(8, 10)}/${input.expirationDate.slice(5, 7)}/${input.expirationDate.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={input.lowStock || "Não definido"}
                      readOnly
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
                        value={input.employee.id}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Preço unitário: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={input.price.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço total: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={input.totalPrice.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Data de registro: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.createdAt.slice(8, 10)}/${input.createdAt.slice(5, 7)}/${input.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora de registro: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={`${input.createdAt.slice(11, 13)}:${input.createdAt.slice(14, 16)}:${input.createdAt.slice(17, 19)}`}
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
        <div className="reasons-supply">
          <select
            className="options-new-supply"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          >
            <option value="">Motivo</option>
            <option value="entrada">Entrada</option>
            <option value="reposicao">Reposição</option>
            <option value="ajuste">Ajuste</option>
            <option value="doacao">Doação</option>
            <option value="transferencia">Transferência</option>
            <option value="correcao de perda">Correção de perda</option>
            <option value="correcao de escrita">Correção de escrita</option>
          </select>
        </div>
        <input
          type="text"
          id="category"
          placeholder="Categoria ex: cereais"
          value={category}
          disabled={isLoadingInputs}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          id="name"
          placeholder="Nome ex: arroz branco"
          value={name}
          disabled={isLoadingInputs}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          id="details"
          placeholder="Detalhes ex: produto se perdeu etc..."
          value={details}
          disabled={isLoadingInputs}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="text"
          id="quantity"
          placeholder="Quantidade ex: 25"
          value={quantity || ""}
          disabled={isLoadingInputs}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          id="weightPerUnit"
          placeholder="Peso unitário ex: 1000 (g)"
          value={weightPerUnit || ""}
          disabled={isLoadingInputs}
          onChange={(e) => setWeightPerUnit(e.target.value)}
        />
        <input
          type="text"
          id="supplier"
          placeholder="Fornecedor ex: shopee"
          value={supplier}
          disabled={isLoadingInputs}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <input
          type="text"
          id="expirationDate"
          placeholder="Validade ex: 25-03-2027"
          value={expirationDate}
          disabled={isLoadingInputs}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <input
          type="text"
          id="lowStock"
          placeholder="quantidade mínima ex: 5 (opcional)"
          value={lowStock || ""}
          disabled={isLoadingInputs}
          onChange={(e) => setLowStock(e.target.value)}
        />
        <input
          type="text"
          id="price"
          placeholder="Preço unitário ex: 10.90"
          value={price || ""}
          disabled={isLoadingInputs}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Btn disabled={isLoadingInputs}>
          <button type="button" onClick={clear}>
            Cancelar
          </button>
        </Btn>
        <Btn disabled={isLoadingInputs}>
          <button type="button" onClick={(e) => InputRegister(e)}>
            {isLoadingInputs ? <Spinner /> : "Adicionar"}
          </button>
        </Btn>
      </NewInput>
    </InputsContainer>
  );
}
