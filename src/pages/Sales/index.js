/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/index";
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

  const [date, setDate] = useState("");
  const [client_name, setClientName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("");
  const [bossId, setBossId] = useState("");
  const [saleId, setSaleId] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [rerender, setReRender] = useState(false);
  const searchSale = document.querySelector(".search-bar");

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

    const inArray = [];

    const search = await DoSearch("sales", searchParam, searchSale.value);

    if (typeof search === "undefined" || !search) return;

    if (Array.isArray(search)) {
      setSearchResults(search);
      return;
    }

    inArray.push(search);
    setSearchResults(inArray);
    return;
  }

  async function SaleUpdate() {
    const data = {
      date,
      client_name,
      phone_number,
      address,
      products,
      employee_id,
      client_birthday: null,
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
      client_birthday: null,
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

  return (
    <SalesContainer>
      <Header />
      <Footer />
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
                  <div className="label">Data: </div>
                  <div className="label">Hora: </div>
                  <div className="label">Nome cliente: </div>
                  <div className="label">Telefone: </div>
                  <div className="label">Endereço: </div>
                  <div className="label">Funcionário: </div>
                  <div className="label">Produtos: </div>
                  <div className="data-div">{sale.date}</div>
                  <div className="data-div">{sale.hour}</div>
                  <div className="data-div">{sale.client_name}</div>
                  <div className="data-div">{sale.phone_number}</div>
                  <div className="data-div">{sale.address}</div>
                  <div className="data-div">{sale.employee_id}</div>
                  <div className="data-div">{sale.products}</div>
                </div>
              );
            })
          : searchResults.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div-search">
                  <div className="edit-search">
                    <button
                      type="button"
                      className="edit-icon-search"
                      onClick={(e) => SetSales(e, sale.id, sale)}
                    >
                      Editar
                    </button>
                  </div>
                  <div className="label-search">Data: </div>
                  <div className="label-search">Hora: </div>
                  <div className="label-search">Nome cliente: </div>
                  <div className="label-search">Telefone: </div>
                  <div className="label-search">Endereço: </div>
                  <div className="label-search">Produtos: </div>
                  <div className="label-search">Funcionário: </div>
                  <div className="data-div-search">{sale.date}</div>
                  <div className="data-div-search">{sale.hour}</div>
                  <div className="data-div-search">{sale.client_name}</div>
                  <div className="data-div-search">{sale.phone_number}</div>
                  <div className="data-div-search">{sale.address}</div>
                  <div className="data-div-search">{sale.products}</div>
                  <div className="data-div-search">{sale.employee_id}</div>
                </div>
              );
            })}
      </SalesSpace>
      <NewSale>
        <input
          type="text"
          placeholder="Data ex: 02-07-2025"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome cliente ex: Joao silva"
          value={client_name}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tel ex: 11 11111-2222"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço ex: Rua tal, 123"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Produtos ex: coxinha,suco"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
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
