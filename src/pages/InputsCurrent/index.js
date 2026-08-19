/* eslint-disable no-case-declarations */
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
import { Modal } from "../../components/Modal";
import { ModalEditUnitiesSuppliesChildren } from "../../components/ModalEditUnitiesSupplies/editUnitiesSupplies";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import DoSearch from "../../services/search";
import Update from "../../services/update";
import * as actions from "../../store/modules/dataTransfer/actions";
import * as actionsEditUnitiesSupply from "../../store/modules/editUnitiesDataSupplies/actions";
import { ErrorIcon, GetDataSpinner } from "../../styles/GlobalStyles";
import { GetChangedFields } from "../../utils/GetChangedFields";
import { InputsContainer, InputsSpace, SearchSpace, Spinner } from "./styled";

export default function InputsCurrent() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);
  const inputName = useSelector((state) => state.dataTransfer.inputName);
  const getEditedUnitiesIfExists = useSelector(
    (state) => state.editUnitiesDataSupplies
  );

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");
  const [originalSuppliesData, setOriginalSuppliesData] = useState({});
  const [inputsData, setInputsData] = useState([]);
  const [inputsDataBackup, setInputsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [searchValueAutoSearch, setSearchValueAutoSearch] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);
  const [openModalId, setOpenModalId] = useState("");
  const [errorGetCredentials, setErrorGetCredentials] = useState(false);
  const [isLoadingGetCredentials, setIsLoadingGetCredentials] = useState(false);
  const [isLoadingSupplyUpdate, setIsLoadingSupplyUpdate] = useState(false);
  const [isLoadingGetInputsCurrent, setIsLoadingGetInputsCurrent] =
    useState(false);

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

  useEffect(() => {
    if (!inputName) return;

    setSearchValueAutoSearch(inputName);
    setSearchParam("name");
  }, [inputName]);

  useEffect(() => {
    if (!searchValueAutoSearch || !inputName) return;

    async function SearchTheInput() {
      if (!searchParam) {
        toast.error("Selecione um filtro de busca");
        return;
      }

      const inArray = [];

      const search = await DoSearch(
        "supplies",
        searchParam,
        searchValueAutoSearch,
        "SUPPLY_REAL_TIME"
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

    SearchTheInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueAutoSearch]);

  async function GetInputs() {
    if (!employee_id || !permissions) return;

    setIsLoadingGetInputsCurrent(true);

    const inputs = await GetData(
      bossId,
      "supplies",
      employee_id,
      permissions,
      "SUPPLY_REAL_TIME",
      true
    );

    if (typeof inputs === "undefined" || !inputs) return;

    setIsLoadingGetInputsCurrent(false);
    setInputsData(inputs);
    setInputsDataBackup(inputs);
    setOriginalSuppliesData(
      Object.fromEntries(inputs.map((item) => [item.id, { ...item }]))
    );
  }

  useEffect(() => {
    if (isLoadingGetCredentials) return;
    GetInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    setTimeout(() => {
      setReRender(true);
    }, 120000);
  });

  useEffect(() => {
    if (isLoadingGetCredentials) return;

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
    setSearchInputValue("");
    setSearchValueAutoSearch("");

    dispatch(actions.clearDataTransfer());
  };

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    const permissionVerify = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar insumos necessária");
      return;
    }

    setInputsData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeSearch = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    const permissionVerify = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar insumos necessária");
      return;
    }

    setSearchResults((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

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
        "SUPPLY_REAL_TIME",
        null,
        GENERAL_PATH
      );
    } else if (searchParam === "price") {
      const formattedPrice = searchInputValue.replace(",", ".");

      search = await DoSearch(
        "supplies",
        searchParam,
        formattedPrice,
        "SUPPLY_REAL_TIME",
        null,
        GENERAL_PATH
      );
    } else {
      search = await DoSearch(
        "supplies",
        searchParam,
        searchInputValue,
        "SUPPLY_REAL_TIME",
        null,
        GENERAL_PATH
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

  const InputUpdate = async (e, objectData) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar insumos necessária");
      return;
    }

    if (objectData.price) {
      const editPricePermissionVerify = permissions.some(
        (p) => p.action === "EDIT_PRICES" && p.resource === "SUPPLIES"
      );

      if (!editPricePermissionVerify) {
        toast.error("Permissão para editar preços de insumos necessária");
        return;
      }
    }

    const current = inputsData.find((p) => p.id === objectData.id);
    const original = originalSuppliesData[objectData.id];

    const changedFields = GetChangedFields(original, current);

    const IsEmptyValue = (value) => {
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0;
      }
      return (
        value === 0 || value === "" || value === null || value === undefined
      );
    };

    const truthyFieldsEditUnities = Object.fromEntries(
      Object.entries(getEditedUnitiesIfExists).filter(
        ([, value]) => !IsEmptyValue(value)
      )
    );

    if (
      Object.keys(changedFields).length === 0 &&
      Object.keys(truthyFieldsEditUnities).length === 0
    ) {
      toast.info("Nenhuma alteração detectada");
      return;
    }

    const allData = {
      ...changedFields,
      ...truthyFieldsEditUnities,
    };

    setIsLoadingSupplyUpdate(true);

    const update = await Update(objectData.id, allData, "supplies");

    if (update) {
      setOriginalSuppliesData((prev) => ({
        ...prev,
        [objectData.id]: { ...current },
      }));

      setReRender(update);
    }

    dispatch(actionsEditUnitiesSupply.clearUpdateUnitiesSupplyData());

    setIsLoadingSupplyUpdate(false);
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
            value={searchValueAutoSearch !== "" ? inputName : searchInputValue}
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
            value={searchParam}
          >
            <option value="">Selecione</option>
            <option value="category">Categoria</option>
            <option value="name">Nome</option>
            <option value="quantity">Quantidade</option>
            <option value="weightPerUnit">Peso unitário</option>
            <option value="supplier">Fornecedor</option>
            <option value="expirationDate">Validade</option>

            {permissions.some(
              (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
            ) && <option value="employee">Funcionário</option>}

            <option value="price">Preço</option>
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

        {isLoadingGetInputsCurrent && <GetDataSpinner />}
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
                      name="totalWeight"
                      className="data-div"
                      value={input.totalWeight.replace(".", ",")}
                      onChange={(e) => HandleChange(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightPerUnit"
                      className="data-div"
                      value={input.weightPerUnit.replace(".", ",")}
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
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={input.lowStock || "Não definido"}
                      onChange={(e) => HandleChange(e, input.id)}
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
                    <div className="label">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={input.price.replace(".", ",")}
                      onChange={(e) => HandleChange(e, input.id)}
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
                  <div className="data-wrap">
                    <div className="label">Última atualização (data): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.updatedAt.slice(8, 10)}/${input.updatedAt.slice(5, 7)}/${input.updatedAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (hora): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.updatedAt.slice(11, 13)}:${input.updatedAt.slice(14, 16)}:${input.updatedAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                  {permissions.some(
                    (p) => p.resource === "SUPPLIES" && p.action === "UPDATE"
                  ) && (
                    <div className="footer">
                      <div className="footer-actions">
                        <Modal
                          isOpen={openModalId === `unities-${input.id}`}
                          onClose={() => setOpenModalId(null)}
                          title={`Editar quantidades do insumo ${input.name}`}
                        >
                          <ModalEditUnitiesSuppliesChildren
                            quantityProp={input.quantity}
                            savedData={getEditedUnitiesIfExists}
                          />
                        </Modal>
                        <button
                          type="button"
                          onClick={() => setOpenModalId(`unities-${input.id}`)}
                          className="edit-unities"
                          disabled={isLoadingSupplyUpdate}
                        >
                          Editar quantidade
                        </button>
                      </div>
                      <div className="footer-confirm">
                        <button
                          type="button"
                          className="confirm-changes"
                          onClick={(e) => InputUpdate(e, input)}
                          disabled={isLoadingSupplyUpdate}
                        >
                          {isLoadingSupplyUpdate ? <Spinner /> : "Salvar"}
                        </button>
                        <button
                          type="button"
                          className="cancel-changes"
                          onClick={(e) => clear(e)}
                          disabled={isLoadingSupplyUpdate}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
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
                      name="totalWeight"
                      className="data-div"
                      value={input.totalWeight.replace(".", ",")}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Peso unitário: </div>
                    <input
                      type="text"
                      name="weightPerUnit"
                      className="data-div"
                      value={input.weightPerUnit.replace(".", ",")}
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
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={input.lowStock || "Não definido"}
                      onChange={(e) => HandleChangeSearch(e, input.id)}
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
                      onChange={(e) => HandleChangeSearch(e, input.id)}
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
                  <div className="data-wrap">
                    <div className="label">Última atualização (data): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.updatedAt.slice(8, 10)}/${input.updatedAt.slice(5, 7)}/${input.updatedAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (hora): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${input.updatedAt.slice(11, 13)}:${input.updatedAt.slice(14, 16)}:${input.updatedAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                  {permissions.some(
                    (p) => p.resource === "SUPPLIES" && p.action === "UPDATE"
                  ) && (
                    <div className="footer">
                      <div className="footer-actions">
                        <Modal
                          isOpen={openModalId === `unities-${input.id}`}
                          onClose={() => setOpenModalId(null)}
                          title={`Editar quantidades do insumo ${input.name}`}
                        >
                          <ModalEditUnitiesSuppliesChildren
                            quantityProp={input.quantity}
                            savedData={getEditedUnitiesIfExists}
                          />
                        </Modal>
                        <button
                          type="button"
                          onClick={() => setOpenModalId(`unities-${input.id}`)}
                          className="edit-unities"
                          disabled={isLoadingSupplyUpdate}
                        >
                          Editar quantidade
                        </button>
                      </div>
                      <div className="footer-confirm">
                        <button
                          type="button"
                          className="confirm-changes"
                          onClick={(e) => InputUpdate(e, input)}
                          disabled={isLoadingSupplyUpdate}
                        >
                          {isLoadingSupplyUpdate ? <Spinner /> : "Salvar"}
                        </button>
                        <button
                          type="button"
                          className="cancel-changes"
                          onClick={(e) => clear(e)}
                          disabled={isLoadingSupplyUpdate}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </InputsSpace>
    </InputsContainer>
  );
}
