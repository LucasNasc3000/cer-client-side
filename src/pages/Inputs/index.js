/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { InputsContainer, InputsSpace, NewInput, SearchSpace } from "./styled";

export default function Inputs() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalweight, setTotalWeight] = useState(0);
  const [weightperunit, setWeightPerUnit] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [expirationdate, setExpirationDate] = useState("");
  const [minimun_quantity, setMinimunQuantity] = useState(0);
  const [rateisnear, setRateIsNear] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("");
  //  const [id, setId] = useState(0);
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [inputsData, setInputsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = document.querySelector(".input-search");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const inputsRaw = [];

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
  }, [bossId]);

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
  }, [headerid]);

  useEffect(() => {
    // tentar economizar requests vendo se dá para colocar GetData em outro useEffect e executar uma vez só
    async function GetInputs() {
      try {
        if (bossId.length > 0) {
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
          setInputsData(inputsRaw[0]);

          if (!inputsData) toast.error("Erro ao exibir insumos");
        }
      } catch (e) {
        toast.error("Erro desconhecido");
      }
    }

    GetInputs();
  }, [bossId]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  const clear = (e) => {
    e.preventDefault();
    // setId(0);
    setType("");
    setName("");
    setQuantity(0);
    setTotalWeight(0);
    setWeightPerUnit(0);
    setSupplier("");
    setExpirationDate("");
    setMinimunQuantity(0);
    setRateIsNear(0);
    searchInput.value = "";
    setSearchResults([]);
  };

  const SetInputs = (e, idParam, data) => {
    e.preventDefault();

    // setId(idParam);
    setType(data.type);
    setName(data.name);
    setQuantity(data.quantity);
    setTotalWeight(data.totalweight);
    setWeightPerUnit(data.weightperunit);
    setSupplier(data.supplier);
    setExpirationDate(data.expirationdate);
    setMinimunQuantity(data.minimun_quantity);
    setRateIsNear(data.rateisnear);
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

  // async function InputUpdate() {
  //   try {
  //     await axios.put(`/inputs/${id}`, {
  //       nome: nomeValue,
  //       peso_unitario: pesoUnitario,
  //       unidades: unidadesValue,
  //       peso_total: pesoTotal,
  //       fornecedor: fornecedorValue,
  //       data_validade: dataValidade,
  //       data_compra: dataCompra,
  //     });

  //     clear();
  //   } catch (err) {
  //     const errors = get(err, "response.data.errors", []);

  //     if (errors.length > 0) {
  //       errors.map((error) => toast.error(error));
  //     } else {
  //       toast.error("Erro ao atualizar insumo. Verifique os dados inseridos");
  //     }
  //   }
  // }

  async function InputRegister(e) {
    e.preventDefault();

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

      // clear();
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error(
          "Erro ao cadastrar novo insumo. Verifique os dados inseridos"
        );
      }
    }
  }

  const Delete = async (e, idParam) => {
    e.preventDefault();

    try {
      await axios.delete(`/inputs/${idParam}`);
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }
    }
  };

  // const IdVerify = (e) => {
  //   e.preventDefault();

  //   if (id !== 0) {
  //     InputUpdate();
  //   } else {
  //     InputRegister(e);
  //   }
  // };

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
          <h3 className="checkbox-label">Peso unitário</h3>

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
          <h3 className="checkbox-label">Unidades</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="boughtdate"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Data da compra</h3>

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
          <h3 className="checkbox-label">Fornecedor</h3>
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
                      onClick={(e) => Delete(e, input.id)}
                    />
                  </div>
                  <div className="label">Tipo: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Quantidade: </div>
                  <div className="label">Peso total: </div>
                  <div className="label">Peso unitário: </div>
                  <div className="label">Fornecedor: </div>
                  <div className="label">Unidades: </div>
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
                      onClick={(e) => Delete(e, input.id)}
                    />
                  </div>
                  <div className="label">Tipo: </div>
                  <div className="label">Nome: </div>
                  <div className="label">Quantidade: </div>
                  <div className="label">Peso total: </div>
                  <div className="label">Peso unitário: </div>
                  <div className="label">Fornecedor: </div>
                  <div className="label">Unidades: </div>
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Peso total..."
          value={totalweight}
          onChange={(e) => setTotalWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Peso unitário..."
          value={weightperunit}
          onChange={(e) => setWeightPerUnit(e.target.value)}
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
          value={minimun_quantity}
          onChange={(e) => setMinimunQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Próximo ao limite..."
          value={rateisnear}
          onChange={(e) => setExpirationDate(e.target.value)}
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
