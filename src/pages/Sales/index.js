/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import history from "../../services/history";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import Update from "../../services/update";
import * as actionsDataTransfer from "../../store/modules/dataTransfer/actions";
import { NewSale, SalesContainer, SalesSpace, SearchSpace } from "./styled";

export default function Sales() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [client_name, setClientName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [client_birthday, setClientBirthday] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("");
  const [bossId, setBossId] = useState("");
  const [saleId, setSaleId] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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

  const clearDirectExecution = () => {
    setSaleId("");
    setDate("");
    setClientName("");
    setPhoneNumber("");
    setAddress("");
    setProducts("");
    setClientBirthday("");
    searchSale.value = "";
    setSearchResults([]);
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const SetSales = (e, idParam, data) => {
    e.preventDefault();

    setSaleId(idParam);
    setDate(data.date);
    setClientName(data.client_name);
    setPhoneNumber(data.phone_number);
    setAddress(data.address);
    setProducts(data.products);
    setClientBirthday(data.client_birthday);
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

  async function SearchSales(e) {
    e.preventDefault();

    const search = await DoSearch("sales", searchParam, searchSale.value);

    if (typeof search === "undefined" || !search) return;

    setSearchResults(search);
  }

  async function SaleUpdate() {
    const data = {
      date,
      client_name,
      phone_number,
      address,
      products,
      employee_id,
      client_birthday,
    };

    const update = await Update(saleId, data, "sales");
    setReRender(update);

    clearDirectExecution();
  }

  async function SaleRegister(e) {
    e.preventDefault();

    const ddate = new Date();
    const hour = ddate.toLocaleTimeString("pt-br", {
      hourCycle: "h24",
    });

    const data = {
      date,
      hour,
      client_name,
      phone_number,
      address,
      products,
      employee_id,
      client_birthday,
    };

    const register = await Register(data, "sales");
    setReRender(register);

    clearDirectExecution();
  }

  const IdVerify = (e) => {
    e.preventDefault();

    if (saleId !== "") {
      SaleUpdate();
    } else {
      SaleRegister(e);
    }
  };

  const Transfer = (e, saleData) => {
    e.preventDefault();
    dispatch(actionsDataTransfer.saleDataTransfer(saleData));

    history.push("/advices");
  };

  return (
    <SalesContainer>
      <Header />
      <SearchSpace>
        <div className="sale-search">
          <button
            type="button"
            onClick={(e) => SearchSales(e)}
            className="search-btn"
          >
            Pesquisar
          </button>
          <input
            type="text"
            placeholder="Pesquisar venda..."
            className="search-bar"
          />
        </div>

        <FaArrowLeft size={27} className="arrow" onClick={(e) => clear(e)} />
        <div className="checkboxes">
          <input
            type="checkbox"
            className="checkbox"
            name="date"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Data</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="hour"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Hora</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="clientname"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Nome cliente</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="phonenumber"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Telefone</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="address"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Endereço</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="products"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Produtos</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="employeeid"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Registrado por</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="clientbirthday"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Anv. cliente</h3>
        </div>
      </SearchSpace>
      <SalesSpace>
        {searchResults.length < 1
          ? salesData.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div">
                  <div className="edit">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) => SetSales(e, sale.id, sale)}
                    >
                      Editar
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btd-button"
                    onClick={(e) => Transfer(e, sale)}
                  >
                    Agendar lembrete de aniversário
                  </button>
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome cliente: </div>
                  <div className="label">Telefone: </div>
                  <div className="label">Endereço: </div>
                  <div className="label">Anv. Cliente: </div>
                  <div className="label">Funcionário: </div>
                  <div className="label">Produtos: </div>
                  <div className="data-div">{sale.date}</div>
                  <div className="data-div">{sale.hour}</div>
                  <div className="data-div">{sale.client_name}</div>
                  <div className="data-div">{sale.phone_number}</div>
                  <div className="data-div">{sale.address}</div>
                  <div className="data-div">{sale.client_birthday}</div>
                  <div className="data-div">{sale.employee_id}</div>
                  <div className="data-div">{sale.products}</div>
                </div>
              );
            })
          : searchResults.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div">
                  <div className="edit">
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => SetSales(e, sale.id, sale)}
                    />
                  </div>
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome cliente: </div>
                  <div className="label">Telefone: </div>
                  <div className="label">Endereço: </div>
                  <div className="label">Produtos: </div>
                  <div className="label">Anv. Cliente: </div>
                  <div className="label">Funcionário: </div>
                  <div className="data-div">{sale.date}</div>
                  <div className="data-div">{sale.hour}</div>
                  <div className="data-div">{sale.client_name}</div>
                  <div className="data-div">{sale.phone_number}</div>
                  <div className="data-div">{sale.address}</div>
                  <div className="data-div">{sale.products}</div>
                  <div className="data-div">{sale.client_birthday}</div>
                  <div className="data-div">{sale.employee_id}</div>
                </div>
              );
            })}
      </SalesSpace>
      <NewSale>
        <input
          type="text"
          placeholder="Data..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome cliente..."
          value={client_name}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone..."
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Produtos..."
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
        <input
          type="text"
          placeholder="Anv. Cliente..."
          value={client_birthday}
          onChange={(e) => setClientBirthday(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => IdVerify(e)}>
          Adicionar
        </button>
      </NewSale>
    </SalesContainer>
  );
}
