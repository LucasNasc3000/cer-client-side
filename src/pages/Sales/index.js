/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
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
import { NewSale, SalesContainer, SalesSpace, SearchSpace } from "./styled";

export default function Sales() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);
  // const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [client_name, setClientName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [client_birthday, setClientBirthday] = useState("");
  const [price, setPrice] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [bossId, setBossId] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [salesDataBackup, setSalesDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const [rerender, setReRender] = useState(false);
  const searchSale = document.querySelector(".sale-search");

  useEffect(() => {
    const PermissionCheck = () => {
      if (
        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE &&
        permissionlStored !== process.env.REACT_APP_SALES &&
        permissionlStored !== process.env.REACT_APP_SOUT &&
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

  const clearDirectExecution = () => {
    setDate("");
    setClientName("");
    setPhoneNumber("");
    setAddress("");
    setProducts("");
    setClientBirthday("");
    setPrice("");
    setSalesData(salesDataBackup);

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
    searchSale.value = "";

    const options = document.querySelector(".options");
    options.value = "";
  };

  async function GetSales() {
    const sales = await GetData(
      bossId,
      "sales",
      employee_id,
      permissionlStored
    );

    if (typeof sales === "undefined" || !sales) return;

    setSalesData(sales);
    setSalesDataBackup(sales);
  }

  useEffect(() => {
    GetSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetSales();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    if (permissionlStored !== process.env.REACT_APP_ADMIN_ROLE) return;

    setSalesData((prevData) =>
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

  async function SearchSales(e) {
    e.preventDefault();

    const inArray = [];

    const search = await DoSearch("sales", searchParam, searchSale.value);

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

    const update = await Update(objectData.id, objectData, "sales");

    setReRender(update);

    clearDirectExecution();
  };

  const SaleRegister = async (e) => {
    e.preventDefault();

    const takeCommaPrice = document
      .querySelector("#price")
      .value.replace(",", ".");

    const ddate = new Date();
    const hour = ddate.toLocaleTimeString("pt-br", {
      hourCycle: "h24",
    });

    const data = {
      date: document.querySelector("#date").value,
      hour,
      client_name: document.querySelector("#clientName").value,
      phone_number: document.querySelector("#phoneNumber").value,
      address: document.querySelector("#address").value,
      products: document.querySelector("#products").value,
      employee_id,
      client_birthday: document.querySelector("#clientBirthday").value,
      price: takeCommaPrice,
    };

    const register = await Register(data, "sales");

    setReRender(register);

    clearDirectExecution();
  };

  // const Transfer = (e, saleData) => {
  //   e.preventDefault();
  //   dispatch(actionsDataTransfer.saleDataTransfer(saleData));

  //   history.push("/advices");
  // };

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
            <option value="phoneNumber">Telefone</option>
            <option value="address">Endereço</option>
            <option value="products">Produtos</option>
            <option value="clientBirthday">Aniversário do cliente</option>
            <option value="employee">Funcionário</option>
            <option value="price">Preço</option>
          </select>
        </div>
      </SearchSpace>
      <SalesSpace>
        {searchResults.length < 1
          ? salesData.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div" id={sale.id}>
                  <div className="data-wrap">
                    <div className="label">Date: </div>
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      value={sale.date}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      value={sale.hour}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome cliente: </div>
                    <input
                      type="text"
                      name="client_name"
                      className="data-div"
                      value={sale.client_name}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Telefone: </div>
                    <input
                      type="text"
                      name="phone_number"
                      className="data-div"
                      value={sale.phone_number}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Endereço: </div>
                    <input
                      type="text"
                      name="address"
                      className="data-div"
                      value={sale.address}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Produtos: </div>
                    <input
                      type="text"
                      name="products"
                      className="data-div"
                      value={sale.products}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Aniversário do cliente: </div>
                    <input
                      type="text"
                      name="client_birthday"
                      className="data-div"
                      value={sale.client_birthday}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={sale.employee_id}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap-price">
                    <div className="label-price">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div-price"
                      value={sale.price}
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      onChange={(e) => HandleChange(e, sale.id)}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className="confirm-changes"
                      onClick={(e) => SaleUpdate(e, sale)}
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
          : searchResults.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div" id={sale.id}>
                  <div className="data-wrap">
                    <div className="label">Date: </div>
                    <input
                      type="text"
                      name="date"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.date}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Hora: </div>
                    <input
                      type="text"
                      name="hour"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.hour}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome cliente: </div>
                    <input
                      type="text"
                      name="client_name"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.client_name}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Telefone: </div>
                    <input
                      type="text"
                      name="phone_number"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.phone_number}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Endereço: </div>
                    <input
                      type="text"
                      name="address"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.address}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Produtos: </div>
                    <input
                      type="text"
                      name="products"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.products}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Aniversário do cliente: </div>
                    <input
                      type="text"
                      name="client_birthday"
                      className="data-div"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.client_birthday}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={sale.employee_id}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap-price">
                    <div className="label-price">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div-price"
                      readOnly={
                        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE
                      }
                      value={sale.price}
                      onChange={(e) => HandleChangeSearch(e, sale.id)}
                    />
                  </div>
                  {permissionlStored === process.env.REACT_APP_ADMIN_ROLE ? (
                    <div className="buttons">
                      <button
                        type="button"
                        className="confirm-changes"
                        onClick={(e) => SaleUpdate(e, sale)}
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
      </SalesSpace>
      <NewSale>
        <input
          type="text"
          id="date"
          placeholder="Data ex: 02-07-2025"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          id="clientName"
          placeholder="Nome cliente ex: Joao silva"
          value={client_name}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          id="phoneNumber"
          placeholder="Tel ex: 11 11111-2222"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          id="address"
          placeholder="Endereço ex: Rua tal, 123"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          id="products"
          placeholder="Produtos ex: coxinha,suco"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
        <input
          type="text"
          id="clientBirthday"
          placeholder="Anv. Cliente ex: 15-02"
          value={client_birthday}
          onChange={(e) => setClientBirthday(e.target.value)}
        />
        <input
          type="text"
          id="price"
          placeholder="Preço ex: 15,99"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => SaleRegister(e)}>
          Adicionar
        </button>
      </NewSale>
    </SalesContainer>
  );
}
