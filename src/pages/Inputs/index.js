/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toInt } from "validator";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { InputsContainer, InputsSpace, NewInput, SearchSpace } from "./styled";

export default function Inputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);
  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [interquantity, setInterQuantity] = useState("");
  const [intertotalweight, setInterTotalWeight] = useState("");
  const [interweightperunit, setInterWeightPerUnit] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expirationdate, setExpirationDate] = useState("");
  const [interminimun_quantity, setInterMinimunQuantity] = useState("");
  const [interrateisnear, setInterRateIsNear] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("");
  const [inputId, setInputId] = useState(0);
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [inputsData, setInputsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = document.querySelector(".input-search");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");

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

  useEffect(() => {
    async function GetInputs() {
      const inputsRaw = [];
      const allInputs = [];
      const joinData = [];

      if (bossId.length > 0) {
        try {
          const getEmployeesByBoss = await axios.get(
            `/employees/search/boss/${bossId}`
          );

          const employeesIds = getEmployeesByBoss.data.map((employees) => {
            return employees.id;
          });

          for (let i = 0; i < employeesIds.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const inputs = await axios.get(
              `/inputs/search/employeeid/${employeesIds[i]}`
            );

            if (inputs.data) inputsRaw.push(inputs.data);
          }

          for (let i = 0; i < inputsRaw.length; i++) {
            const join = allInputs.concat(inputsRaw[i]);
            joinData.push(...join);
          }

          if (permissionlStored === process.env.REACT_APP_ADMIN_ROLE) {
            const bossInputs = await axios.get(
              `/inputs/search/employeeid/${employee_id}`
            );

            joinData.push(...bossInputs.data);
          } else {
            const bossInputs = await axios.get(
              `/inputs/search/employeeid/${bossId}`
            );

            joinData.push(...bossInputs.data);
          }

          setInputsData(joinData);

          if (!inputsData) toast.error("Erro ao exibir insumos");
        } catch (e) {
          toast.error("Erro desconhecido");
        }
      }
    }

    GetInputs();
  }, [bossId, employee_id, permissionlStored]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

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
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const SetInputs = (e, idParam, data) => {
    e.preventDefault();

    setInputId(idParam);
    setType(data.type);
    setName(data.name);
    setInterQuantity(String(data.quantity));
    setInterTotalWeight(String(data.totalweight));
    setInterWeightPerUnit(String(data.weightperunit));
    setSupplier(data.supplier);
    setExpirationDate(data.expirationdate);
    setInterMinimunQuantity(String(data.minimun_quantity));
    setInterRateIsNear(String(data.rateisnear));
  };

  async function DoSearch(e) {
    e.preventDefault();
    try {
      const results = await axios.get(
        `/inputs/search/${searchParam}/${searchInput.value}`
      );
      setSearchResults(results.data);
      clear();
    } catch (err) {
      toast.error(err);
    }
  }

  async function InputUpdate() {
    const quantity = toInt(interquantity);
    const totalweight = toInt(intertotalweight);
    const weightperunit = toInt(interweightperunit);
    const minimun_quantity = toInt(interminimun_quantity);
    const rateisnear = toInt(interrateisnear);

    try {
      await axios.put(`/inputs/${inputId}`, {
        type,
        name,
        quantity,
        totalweight,
        weightperunit,
        supplier,
        expirationdate,
        employee_id,
        minimun_quantity,
        rateisnear,
      });

      clearDirectExecution();
      toast.success(`${name} atualizado com sucesso`);
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar atualizar insumo");
        }
      }
    }
  }

  async function InputRegister(e) {
    e.preventDefault();

    const quantity = toInt(interquantity);
    const totalweight = toInt(intertotalweight);
    const weightperunit = toInt(interweightperunit);
    const minimun_quantity = toInt(interminimun_quantity);
    const rateisnear = toInt(interrateisnear);

    try {
      await axios.post("/inputs", {
        type,
        name,
        quantity,
        totalweight,
        weightperunit,
        supplier,
        expirationdate,
        employee_id,
        minimun_quantity,
        rateisnear,
      });

      toast.success("Insumo adicionado com sucesso");
      clearDirectExecution();
      return;
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar cadastrar insumo");
        }
      }
    }
  }

  const Delete = async (e, idParam, inputName) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals, no-alert
    const ask = confirm(`Deseja realmente deletar o insumo ${inputName}`);

    try {
      if (ask === true) {
        await axios.delete(`/inputs/${idParam}`);
      } else {
        return;
      }
      toast.success(`${inputName} deletado`);
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar deletar insumo");
        }
      }
    }
  };

  const IdVerify = (e) => {
    e.preventDefault();

    if (inputId !== 0) {
      InputUpdate();
    } else {
      InputRegister(e);
    }
  };

  return (
    <InputsContainer>
      <Header />
      <SearchSpace>
        <FaSearch
          size={30}
          className="search-icon"
          onClick={(e) => DoSearch(e)}
        />
        <input
          type="text"
          placeholder="Pesquisar insumo..."
          className="input-search"
        />
        <MdLogout size={27} class="logout" onClick={(e) => handleLogout(e)} />
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
            name="unitweight"
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
            name="unities"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Peso unitário</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="boughtdate"
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
            name="supplier"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Quantidade mínima</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="supplier"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Registrado por</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="supplier"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Próximo ao limite</h3>
        </div>
      </SearchSpace>
      <InputsSpace>
        {searchResults.length < 1
          ? inputsData.map((input) => {
              return (
                <div key={input.id} className="main-data-div">
                  <div className="edit">
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => SetInputs(e, input.id, input)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => Delete(e, input.id, input.name)}
                    />
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
            })
          : searchResults.map((input) => {
              return (
                <div key={input.id} className="main-data-div">
                  <div className="edit">
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => SetInputs(e, input.id, input)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => Delete(e, input.id, input.name)}
                    />
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
                  <div className="data-div">{input.type}</div>
                  <div className="data-div">{input.name}</div>
                  <div className="data-div">{input.quantity}</div>
                  <div className="data-div">{input.totalweight}</div>
                  <div className="data-div">{input.weightperunit}</div>
                  <div className="data-div">{input.supplier}</div>
                  <div className="data-div">{input.expirationdate}</div>
                  <div className="data-div">{input.minimun_quantity}</div>
                  <div className="data-div">{input.rateisnear}</div>
                </div>
              );
            })}
      </InputsSpace>
      <NewInput>
        <input
          type="text"
          placeholder="Tipo..."
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantidade..."
          value={interquantity}
          onChange={(e) => setInterQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Peso total..."
          value={intertotalweight}
          onChange={(e) => setInterTotalWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Peso unitário..."
          value={interweightperunit}
          onChange={(e) => setInterWeightPerUnit(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fornecedor..."
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <input
          type="text"
          placeholder="Data de validade --> dd-mm-aaa..."
          value={expirationdate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="quantidade mínima... (opcional)"
          value={interminimun_quantity}
          onChange={(e) => setInterMinimunQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Próximo ao limite..."
          value={interrateisnear}
          onChange={(e) => setInterRateIsNear(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => IdVerify(e)}>
          Adicionar
        </button>
      </NewInput>
    </InputsContainer>
  );
}
