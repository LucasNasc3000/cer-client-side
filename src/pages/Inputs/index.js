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
import * as actions from "../../store/modules/dataTransfer/actions";
import { InputsContainer, InputsSpace, NewInput, SearchSpace } from "./styled";

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
  const [inputsData, setInputsData] = useState([]);
  const [inputsDataBackup, setInputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);

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
            `/employees/search/email?value=${emailStored}`
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
    if (!employee_id || !permissions) return;

    const inputsReq = await GetData(
      bossId,
      "supplies",
      employee_id,
      permissions,
      "SUPPLY_HISTORY",
      true
    );

    if (typeof inputsReq === "undefined" || !inputsReq) return;

    setInputsData(inputsReq);
    setInputsDataBackup(inputsReq);
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
    setSearchParam("");
    setSearchResults([]);
    setSearchInputValue("");
  };

  async function SearchInputs(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";

    if (searchParam === "date" || searchParam === "expirationDate") {
      const year = searchInputValue.slice(6, 10);
      const month = searchInputValue.slice(3, 5);
      const day = searchInputValue.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch(
        "supplies",
        searchParam,
        formattedDate,
        "SUPPLY_HISTORY"
      );
    } else {
      search = await DoSearch(
        "supplies",
        searchParam,
        searchInputValue,
        "SUPPLY_HISTORY"
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

    const register = await Register(data, "supplies");

    setReRender(register);

    clearDirectExecution();
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
            <option value="weightPerUnit">Peso unitário</option>
            <option value="supplier">Fornecedor</option>
            <option value="expirationDate">Validade</option>
            <option value="date">Data de cadastro</option>
            <option value="lowStock">Quantidade mínima</option>

            {permissions.some(
              (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
            ) && <option value="employee">Funcionário</option>}

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
                      value={input.expirationDate}
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
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.createdAt.slice(8, 10)}/${input.createdAt.slice(5, 7)}/${input.createdAt.slice(0, 4)}`}
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
                    <div className="label">Detalhes: </div>
                    <input
                      type="text"
                      name="details"
                      className="data-div"
                      value={input.details}
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
                      value={input.expirationDate}
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

                  <div className="data-wrap-price">
                    <div className="label-price">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div-price"
                      value={input.price.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap-price">
                    <div className="label-price">Preço total: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div-price"
                      value={input.totalprice.replace(".", ",")}
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
          id="details"
          placeholder="Detalhes ex: produto se perdeu etc..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
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
          id="weightPerUnit"
          placeholder="Peso unitário ex: 1000 (g)"
          value={weightPerUnit || ""}
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
          id="expirationDate"
          placeholder="Validade ex: 25-03-2027"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <input
          type="text"
          id="lowStock"
          placeholder="quantidade mínima ex: 5 (opcional)"
          value={lowStock || ""}
          onChange={(e) => setLowStock(e.target.value)}
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
