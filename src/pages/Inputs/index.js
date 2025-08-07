/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import history from "../../services/history";
import Register from "../../services/register";
import DoSearch from "../../services/search";
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
  const [searchParam, setSearchParam] = useState("");
  const [inputId, setInputId] = useState(0);
  const [inputsData, setInputsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
    setInputId(0);
    setType("");
    setName("");
    setInterQuantity(0);
    setInterTotalWeight(0);
    setInterWeightPerUnit(0);
    setSupplier("");
    setExpirationDate("");
    setInterMinimunQuantity(0);
    setInterRateIsNear(0);
    searchInput.value = "";
    setSearchResults([]);

    const dataInputs = document.querySelectorAll(".data-div");
    const dataInputRateIsNear = document.querySelector(".data-div-rin");

    dataInputRateIsNear.value = "";

    dataInputs.forEach((dataDiv) => {
      // eslint-disable-next-line no-param-reassign
      dataDiv.value = "";
    });
  };

  useEffect(() => {
    console.log(type);
    console.log(name);
  }, [type, name, interquantity]);

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const SetValues = (dataObject) => {
    setInputId(dataObject.id);
    setType(dataObject.type);
    setName(dataObject.name);
    setInterQuantity(String(dataObject.quantity));
    setInterTotalWeight(String(dataObject.totalweight));
    setInterWeightPerUnit(String(dataObject.weightperunit));
    setSupplier(dataObject.supplier);
    setExpirationDate(dataObject.expirationdate);
    setInterMinimunQuantity(String(dataObject.minimun_quantity));
    setInterRateIsNear(String(dataObject.rateisnear));
  };

  const SetInputs = (e, idParam, data, fieldName) => {
    e.preventDefault();

    const element = document.getElementById(String(idParam));

    SetValues(data);

    // eslint-disable-next-line default-case
    switch (fieldName) {
      case "type":
        element.value = data.type;
        element.readOnly = false;
        break;

      case "name":
        element.value = data.name;
        element.readOnly = false;
        break;

      case "quantity":
        element.value = data.quantity;
        element.readOnly = false;
        break;

      case "totalweight":
        element.value = data.totalweight;
        element.readOnly = false;
        break;

      case "weightperunit":
        element.value = data.weightperunit;
        element.readOnly = false;
        break;

      case "supplier":
        element.value = data.supplier;
        element.readOnly = false;
        break;

      case "expirationdate":
        element.value = data.expirationdate;
        element.readOnly = false;
        break;

      case "minimunQuantity":
        element.value = data.minimun_quantity;
        element.readOnly = false;
        break;

      case "rateIsNear":
        element.value = data.rateisnear;
        element.readOnly = false;
        break;
    }

    element.focus();
  };

  async function SearchInputs(e) {
    e.preventDefault();

    const inArray = [];

    const search = await DoSearch("inputs", searchParam, searchInput.value);

    if (typeof search === "undefined" || !search) return;

    if (Array.isArray(search)) {
      setSearchResults(search);
      return;
    }

    inArray.push(search);
    setSearchResults(inArray);
    return;
  }

  const ElementNameVerify = async (elementData) => {
    const input = document.getElementById(String(elementData.id));

    // eslint-disable-next-line default-case
    switch (true) {
      case elementData.name === "type":
        setType(elementData.value);
        input.value = elementData.value;
        break;
      case elementData.name === "name":
        setName(elementData.value);
        input.value = elementData.value;
        break;
      case elementData.name === "quantity":
        setInterQuantity(elementData.value);
        input.value = elementData.value;
        break;
    }
  };

  const PreUpdate = async () => {
    const elementData = [];
    const all = document.querySelectorAll(".data-div");

    all.forEach((element) => {
      if (element.value) {
        elementData.push({
          id: element.id,
          name: element.name,
          value: element.value,
        });
      }
    });

    for (let i = 0; i < elementData.length; i++) {
      ElementNameVerify(elementData[i]);
    }
  };

  const InputUpdate = async (e) => {
    e.preventDefault();

    await PreUpdate();
    console.log(type);

    const data = {
      type,
      name,
      interquantity,
      intertotalweight,
      interweightperunit,
      supplier,
      expirationdate,
      employee_id,
      interminimun_quantity,
      interrateisnear,
    };

    console.log(data);

    // const update = await Update(inputId, data, "inputs");
    // setReRender(update);

    // clearDirectExecution();
  };

  console.log(type);
  console.log(name);
  console.log(interquantity);

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
            Pesquisar
          </button>
          <input
            type="text"
            placeholder="Pesquisar insumo..."
            className="input-search"
          />
        </div>

        <FaArrowLeft size={27} className="arrow" onClick={(e) => clear(e)} />
        <div className="checkboxes">
          <input
            type="checkbox"
            className="checkbox"
            name="type"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Tipo</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="name"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Nome</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="quantity"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Quantidade</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="totalweight"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Peso total</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="weightperunit"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Peso unitário</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="supplier"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Fornecedor</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="expirationdate"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Data de validade</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="minimunquantity"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Quantidade mínima</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="employeeid"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Registrado por</h3>
        </div>
      </SearchSpace>
      <InputsSpace>
        {searchResults.length < 1
          ? inputsData.map((input) => {
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
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) => SetInputs(e, input.id + 1, input, "type")}
                    >
                      <GoPencil size={30} className="pencil" />
                    </button>
                    <input
                      type="text"
                      name="type"
                      className="data-div"
                      readOnly
                      id={input.id + 1}
                      placeholder={input.type}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) => SetInputs(e, input.id + 2, input, "name")}
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      name="name"
                      type="text"
                      className="data-div"
                      readOnly
                      id={input.id + 2}
                      placeholder={input.name}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 3, input, "quantity")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      name="quantity"
                      type="text"
                      className="data-div"
                      readOnly
                      id={input.id + 3}
                      placeholder={input.quantity}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 4, input, "totalweight")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      name="totalweight"
                      type="text"
                      className="data-div"
                      readOnly
                      id={input.id + 4}
                      placeholder={input.totalweight}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 5, input, "weightperunit")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      name="weightperunit"
                      type="text"
                      className="data-div"
                      readOnly
                      id={input.id + 5}
                      placeholder={input.weightperunit}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 6, input, "supplier")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      name="supplier"
                      type="text"
                      className="data-div"
                      readOnly
                      id={input.id + 6}
                      placeholder={input.supplier}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 7, input, "expirationdate")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      name="expirationdate"
                      type="text"
                      className="data-div"
                      readOnly
                      id={input.id + 7}
                      placeholder={input.expirationdate}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 8, input, "minimunQuantity")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      type="text"
                      name="minimunQuantity"
                      className="data-div"
                      id={input.id + 8}
                      readOnly
                      placeholder={input.minimun_quantity}
                    />
                  </div>
                  <div className="data-wrap">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) =>
                        SetInputs(e, input.id + 9, input, "rateIsNear")
                      }
                    >
                      <GoPencil size={35} className="pencil" />
                    </button>
                    <input
                      type="text"
                      name="rateisnear"
                      className="data-div-rin"
                      id={input.id + 9}
                      readOnly
                      placeholder={input.rateisnear}
                    />
                  </div>
                  <div className="data-wrap">
                    <input
                      type="text"
                      className="data-div-eid"
                      id={input.id + 10}
                      readOnly
                      value={input.employee_id}
                    />
                  </div>
                  <button
                    type="button"
                    className="confirm-changes"
                    onClick={(e) => InputUpdate(e)}
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
              );
            })
          : searchResults.map((input) => {
              return (
                <div key={input.id} className="main-data-div">
                  <div className="edit">
                    <button
                      type="button"
                      className="edit-icon"
                      onClick={(e) => SetInputs(e, input.id, input)}
                    >
                      Editar
                    </button>
                  </div>
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
                  <div className="data-div">{input.type}</div>
                  <div className="data-div">{input.name}</div>
                  <div className="data-div">{input.quantity}</div>
                  <div className="data-div">{input.totalweight}</div>
                  <div className="data-div">{input.weightperunit}</div>
                  <div className="data-div">{input.supplier}</div>
                  <div className="data-div">{input.expirationdate}</div>
                  <div className="data-div">{input.minimun_quantity}</div>
                  <div className="data-div">{input.rateisnear}</div>
                  <div className="data-div">{input.employee_id}</div>
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
          value={interquantity}
          onChange={(e) => setInterQuantity(e.target.value)}
        />
        <input
          type="text"
          id="totalweight"
          placeholder="Peso total ex: 10,50 (kg)"
          value={intertotalweight}
          onChange={(e) => setInterTotalWeight(e.target.value)}
        />
        <input
          type="text"
          id="weightperunit"
          placeholder="Peso unitário ex: 1 (kg)"
          value={interweightperunit}
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
          value={interminimun_quantity}
          onChange={(e) => setInterMinimunQuantity(e.target.value)}
        />
        <input
          type="text"
          id="rateisnear"
          placeholder="Próximo ao limite ex: 10"
          value={interrateisnear}
          onChange={(e) => setInterRateIsNear(e.target.value)}
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
