/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { FaArrowLeft, FaStore } from "react-icons/fa";
import { IoIosSearch, IoMdPaper } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { Modal } from "../../components/Modal";
import { ModalAddSaleItemsChildren } from "../../components/ModalAddSaleItems/addSaleItems";
import { ModalEditSalesStatusChildren } from "../../components/ModalEditSales/editSales";
import { ModalPlatformsChildren } from "../../components/ModalPlatforms/platforms";
import { ModalShowSaleItemsChildren } from "../../components/ModalShowSaleItems/showSaleItems";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import Update from "../../services/update";
import * as actionsEditSalesStatus from "../../store/modules/editSalesStatus/actions";
import * as actionsItems from "../../store/modules/saleItems/actions";
import { ErrorIcon, GetDataSpinner, Spinner } from "../../styles/GlobalStyles";
import { GetChangedFields } from "../../utils/GetChangedFields";
import { NewSale, SalesContainer, SalesSpace, SearchSpace } from "./styled";

export default function Sales() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);
  const getSaleItems = useSelector((state) => state.saleItems);
  const getUpdateSaleStatusDataIfExists = useSelector(
    (state) => state.editSalesStatus
  );

  const dispatch = useDispatch();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [originalSalesData, setOriginalSalesData] = useState({});
  const [bossId, setBossId] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [salesDataBackup, setSalesDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [rerender, setReRender] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [openAddItems, setOpenAddItems] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const [openPlatforms, setOpenPlatforms] = useState(false);
  const [itemsRedux, setItemsRedux] = useState([]);
  const [isLoadingSales, setIsLoadingSales] = useState(false);
  const [isLoadingSalesUpdate, setIsLoadingSalesUpdate] = useState(false);
  const [isLoadingGetSales, setIsLoadingGetSales] = useState(false);
  const [isLoadingGetCredentials, setIsLoadingGetCredentials] = useState(false);
  const [errorGetCredentials, setErrorGetCredentials] = useState(false);

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
    // eslint-disable-next-line no-useless-return
    if (getSaleItems.saleItems.length < 1) return;
    setItemsRedux(getSaleItems.saleItems);
    setPlatform(getSaleItems.platform);
  }, [getSaleItems]);

  const clearDirectExecution = () => {
    setClientName("");
    setClientEmail("");
    setPhoneNumber("");
    setAddress("");
    setSalesData(salesDataBackup);
    setStatus("");
    dispatch(actionsItems.clearSaleItems());
    dispatch(actionsEditSalesStatus.clearUpdateSalesStatusData());

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
    setSalesData(salesDataBackup);
    setSearchInputValue("");
  };

  async function GetSales() {
    if (!employee_id || !permissions) return;

    setIsLoadingGetSales(true);

    const sales = await GetData(
      bossId,
      "sales",
      employee_id,
      permissions,
      null,
      true,
      null
    );

    if (typeof sales === "undefined" || !sales) return;

    setIsLoadingGetSales(false);
    setSalesData(sales);
    setSalesDataBackup(sales);
    setOriginalSalesData(
      Object.fromEntries(sales.map((item) => [item.id, { ...item }]))
    );
  }

  useEffect(() => {
    if (isLoadingGetCredentials) return;
    GetSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (isLoadingGetCredentials) return;

    if (rerender === true) GetSales();

    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    const permissionVerify = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "SALES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar vendas necessária");
      return;
    }

    setSalesData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeSearch = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    const permissionVerify = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "SALES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar vendas necessária");
      return;
    }

    setSearchResults((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  async function SearchSales(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";

    if (searchParam === "date") {
      const year = searchInputValue.slice(6, 10);
      const month = searchInputValue.slice(3, 5);
      const day = searchInputValue.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch(
        "sales",
        searchParam,
        formattedDate,
        null,
        null,
        null
      );
    } else {
      search = await DoSearch(
        "sales",
        searchParam,
        searchInputValue,
        null,
        null,
        null
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

  const SaleUpdate = async (e, objectData) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "SALES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar vendas necessária");
      return;
    }

    const current = salesData.find((p) => p.id === objectData.id);
    const original = originalSalesData[objectData.id];

    const changedFields = GetChangedFields(original, current);

    const truthyFields = Object.fromEntries(
      // eslint-disable-next-line array-callback-return
      Object.entries(getUpdateSaleStatusDataIfExists).filter(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) =>
          getUpdateSaleStatusDataIfExists[key] !== 0 &&
          getUpdateSaleStatusDataIfExists[key] !== ""
      )
    );

    const ALWAYS_PRESENT_FIELDS = 2;

    if (
      Object.keys(changedFields).length === 0 &&
      Object.keys(truthyFields).length < ALWAYS_PRESENT_FIELDS
    ) {
      toast.info("Nenhuma alteração detectada");
      return;
    }

    const allData = {
      ...changedFields,
      ...truthyFields,
    };

    setIsLoadingSalesUpdate(true);

    const update = await Update(objectData.id, allData, "sales");

    if (update) {
      setOriginalSalesData((prev) => ({
        ...prev,
        [objectData.id]: { ...current },
      }));

      dispatch(actionsEditSalesStatus.clearUpdateSalesStatusData());

      setReRender(update);
    }

    setIsLoadingSalesUpdate(false);
  };

  const SaleRegister = async (e) => {
    e.preventDefault();

    // Adicionar status a partir do objeto no redux
    const data = {
      clientName,
      clientEmail: clientEmail || null,
      phoneNumber: phoneNumber || null,
      address: address || null,
      status,
      platform: platform || null,
      saleItems: itemsRedux,
    };

    setIsLoadingSales(true);

    const register = await Register(data, "sales");

    if (register) {
      setReRender(register);
    }

    setIsLoadingSales(false);
  };

  // eslint-disable-next-line consistent-return
  const CheckPlatformPermission = (e) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "READ" && p.resource === "PLATFORMS"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) return false;
  };

  return (
    <SalesContainer>
      <Header />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            size={30}
            className="search-btn"
            onClick={(e) => SearchSales(e)}
          >
            <IoIosSearch size={25} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="sale-search"
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
            <option value="date">Date</option>
            <option value="hour">Hora</option>
            <option value="clientName">Nome cliente</option>
            <option value="clientEmail">E-mail cliente</option>
            <option value="phoneNumber">Telefone</option>
            <option value="address">Endereço</option>
            <option value="products">Produtos</option>

            {permissions.some(
              (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
            ) && <option value="employee">Funcionário</option>}

            <option value="price">Preço</option>
          </select>
        </div>
      </SearchSpace>
      <SalesSpace>
        {isLoadingGetCredentials && <Spinner />}

        {errorGetCredentials && !isLoadingGetCredentials && (
          <ErrorIcon>
            <MdErrorOutline size={95} />
          </ErrorIcon>
        )}

        {isLoadingGetSales && <GetDataSpinner />}
        {searchResults.length < 1
          ? salesData.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div" id={sale.id}>
                  <div className="data-wrap">
                    <div className="label">Data: </div>
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={`${sale.createdAt.slice(8, 10)}/${sale.createdAt.slice(5, 7)}/${sale.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={`${sale.createdAt.slice(11, 13)}:${sale.createdAt.slice(14, 16)}:${sale.createdAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="clientName"
                      className="data-div"
                      value={sale.clientName}
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">E-mail: </div>
                    <input
                      type="text"
                      name="clientEmail"
                      className="data-div"
                      value={sale.clientEmail || "E-mail não fornecido"}
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Telefone: </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="data-div"
                      value={sale.phoneNumber || "Telefone não fornecido"}
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Endereço: </div>
                    <input
                      type="text"
                      name="address"
                      className="data-div"
                      value={sale.address || "Endereço não fornecido"}
                      onChange={(e) => HandleChange(e, sale.id)}
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
                        value={sale.employee.id}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="data-wrap">
                    <div className="label">Preço total: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={sale.totalPrice.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="footer">
                    <div className="footer-actions">
                      <Modal
                        isOpen={openModalId === `items-${sale.id}`}
                        onClose={() => setOpenModalId(null)}
                        title="Produtos vendidos"
                      >
                        <ModalShowSaleItemsChildren
                          saleItems={sale.saleItems}
                        />
                      </Modal>
                      <button
                        type="button"
                        onClick={() => setOpenModalId(`items-${sale.id}`)}
                        className="show-items"
                        disabled={isLoadingSalesUpdate}
                      >
                        Ver produtos
                      </button>
                      <Modal
                        isOpen={openModalId === `status-${sale.id}`}
                        onClose={() => setOpenModalId(null)}
                        title="Editar status de venda"
                      >
                        <ModalEditSalesStatusChildren status={sale.status} />
                      </Modal>
                      <button
                        type="button"
                        onClick={() => setOpenModalId(`status-${sale.id}`)}
                        className="status-edit"
                        disabled={isLoadingSalesUpdate}
                      >
                        Editar status da venda
                      </button>
                    </div>
                    {permissions.some(
                      (p) => p.action === "UPDATE" && p.resource === "PRODUCTS"
                    ) && (
                      <div className="footer-confirm">
                        <button
                          type="button"
                          className="confirm-changes"
                          onClick={(e) => SaleUpdate(e, sale)}
                          disabled={isLoadingSalesUpdate}
                        >
                          {isLoadingSalesUpdate ? <Spinner /> : "Salvar"}
                        </button>
                        <button
                          type="button"
                          className="cancel-changes"
                          onClick={(e) => clear(e)}
                          disabled={isLoadingSalesUpdate}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          : searchResults.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div" id={sale.id}>
                  <div className="data-wrap">
                    <div className="label">Data: </div>
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={`${sale.createdAt.slice(8, 10)}/${sale.createdAt.slice(5, 7)}/${sale.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={`${sale.createdAt.slice(11, 13)}:${sale.createdAt.slice(14, 16)}:${sale.createdAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome do cliente: </div>
                    <input
                      type="text"
                      name="clientName"
                      className="data-div"
                      value={sale.clientName}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">E-mail do cliente: </div>
                    <input
                      type="text"
                      name="clientEmail"
                      className="data-div"
                      value={sale.clientEmail || "E-mail não fornecido"}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Telefone: </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="data-div"
                      value={sale.phoneNumber || "Telefone não fornecido"}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Endereço: </div>
                    <input
                      type="text"
                      name="address"
                      className="data-div"
                      value={sale.address || "Endereço não fornecido"}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
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
                        value={sale.employee.id}
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
                      value={sale.totalPrice.replace(".", ",")}
                      readOnly
                    />
                  </div>
                  <div className="footer">
                    <div className="footer-actions">
                      <Modal
                        isOpen={openModalId === `items-${sale.id}`}
                        onClose={() => setOpenModalId(null)}
                        title="Produtos vendidos"
                      >
                        <ModalShowSaleItemsChildren saleItems={sale} />
                      </Modal>
                      <button
                        type="button"
                        onClick={() => setOpenModalId(`items-${sale.id}`)}
                        className="show-items"
                        disabled={isLoadingSalesUpdate}
                      >
                        Ver produtos
                      </button>
                      <Modal
                        isOpen={openModalId === `items-${sale.id}`}
                        onClose={() => setOpenModalId(null)}
                        title="Produtos vendidos"
                      >
                        <ModalEditSalesStatusChildren status={sale.status} />
                      </Modal>
                      <button
                        type="button"
                        onClick={() => setOpenModalId(`status-${sale.id}`)}
                        className="status-edit"
                        disabled={isLoadingSalesUpdate}
                      >
                        Editar status da venda
                      </button>
                    </div>
                    {permissions.some(
                      (p) => p.action === "UPDATE" && p.resource === "PRODUCTS"
                    ) && (
                      <div className="footer-confirm">
                        <div className="buttons">
                          <button
                            type="button"
                            className="confirm-changes"
                            onClick={(e) => SaleUpdate(e, sale)}
                            disabled={isLoadingSalesUpdate}
                          >
                            {isLoadingSalesUpdate ? <Spinner /> : "Salvar"}
                          </button>
                          <button
                            type="button"
                            className="cancel-changes"
                            onClick={(e) => clear(e)}
                            disabled={isLoadingSalesUpdate}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
      </SalesSpace>
      <NewSale>
        <div className="status">
          <select
            className="options-status"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="">Status</option>
            <option value="finalizada">Finalizada</option>
            <option value="cancelada">Cancelada</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <input
          type="text"
          id="clientName"
          placeholder="Nome cliente ex: Joao silva"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          id="clientEmail"
          placeholder="Email cliente ex: joao@gmail.com"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />
        <input
          type="text"
          id="phoneNumber"
          placeholder="Tel ex: 11 11111-2222"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          id="address"
          placeholder="Endereço ex: Rua tal, 123"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="button"
          className="btn"
          onClick={clear}
          disabled={isLoadingSales}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn"
          onClick={(e) => SaleRegister(e)}
          disabled={isLoadingSales}
        >
          {isLoadingSales ? <Spinner /> : "Salvar"}
        </button>
        <Modal
          isOpen={openAddItems}
          onClose={() => setOpenAddItems(false)}
          title="Adicionar produtos"
        >
          <ModalAddSaleItemsChildren bossId={bossId} employeeId={employee_id} />
        </Modal>
        <button
          type="button"
          className="add-items-btn"
          onClick={() => setOpenAddItems(true)}
          disabled={isLoadingSales}
        >
          <IoMdPaper className="items-icon" />
          Adicionar Produtos
        </button>
        <Modal
          isOpen={openPlatforms}
          onClose={() => setOpenPlatforms(false)}
          title="Plataformas"
        >
          <ModalPlatformsChildren employeeId={employee_id} />
        </Modal>
        {!CheckPlatformPermission() && (
          <button
            type="button"
            className="platforms"
            onClick={setOpenPlatforms(true)}
          >
            <FaStore className="platforms-icon" /> Plataformas
          </button>
        )}
      </NewSale>
    </SalesContainer>
  );
}
