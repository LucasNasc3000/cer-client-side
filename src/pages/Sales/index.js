/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import Register from "../../services/register";
import Update from "../../services/update";
import * as actions from "../../store/modules/auth/actions";
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
    async function GetData() {
      try {
        if (!headerid || headerid === "") {
          const bossData = await axios.get(
            `/employees/search/email/${emailStored}`
          );

          const { id } = bossData.data;
          setBossId(id);
          return;
        }
        const employeeData = await axios.get(
          `/employees/search/email/${emailStored}`
        );

        const { boss } = employeeData.data;
        setBossId(boss);
      } catch (e) {
        toast.error("Erro ao obter dados identificadores");
      }
    }
    GetData();
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
        toast.error("Erro ao verificar id no cabeçalho");
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

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
    const salesRaw = [];
    const allSales = [];
    const joinData = [];

    try {
      const getEmployeesByBoss = await axios.get(
        `/employees/search/boss/${bossId}`
      );

      const employeesIds = getEmployeesByBoss.data.map((employees) => {
        return employees.id;
      });

      for (let i = 0; i < employeesIds.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const sales = await axios.get(
          `/sales/search/employeeid/${employeesIds[i]}`
        );

        if (sales.data) salesRaw.push(sales.data);
      }

      for (let i = 0; i < salesRaw.length; i++) {
        const join = allSales.concat(salesRaw[i]);
        joinData.push(...join);
      }

      if (permissionlStored === process.env.REACT_APP_ADMIN_ROLE) {
        const bossSales = await axios.get(
          `/sales/search/employeeid/${employee_id}`
        );

        joinData.push(...bossSales.data);
      } else {
        const bossSales = await axios.get(`/sales/search/employeeid/${bossId}`);

        joinData.push(...bossSales.data);
      }

      setSalesData(joinData);
    } catch (e) {
      const errors = get(e, "response.data.error", []);

      if (e) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (e && errors.length < 1 && typeof errors !== "object") {
          toast.error("Erro desconhecido ao tentar exibir vendas");
        }
      }
    }
  }

  useEffect(() => {
    GetSales();
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetSales();
    setReRender(false);
  });

  async function DoSearch(e) {
    e.preventDefault();
    try {
      const result = await axios.get(
        `/sales/search/${searchParam}/${searchSale.value}`
      );
      setSearchResults(result.data);
      clear();
    } catch (err) {
      toast.error(err);
    }
  }

  async function SaleUpdate() {
    console.log(saleId);
    console.log(date);
    console.log(client_name);
    console.log(phone_number);
    console.log(address);
    console.log(products);
    console.log(client_birthday);

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
    console.log(rerender);
    setReRender(update);
    console.log(rerender);
    console.log(update);

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

  return (
    <SalesContainer>
      <Header />
      <SearchSpace>
        <FaSearch
          size={30}
          className="search-icon"
          onClick={(e) => DoSearch(e)}
        />
        <input
          type="text"
          placeholder="Pesquisar venda..."
          className="sale-search"
        />
        <MdLogout size={27} class="logout" onClick={(e) => handleLogout(e)} />
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
