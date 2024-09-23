import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { get } from "lodash";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import Header from "../../components/Header";
import { InputsContainer, SearchSpace, InputsSpace, NewInput } from "./styled";

export default function Inputs() {
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [pesoUnitario, setPesoUnitario] = useState("");
  const [pesoTotal, setPesoTotal] = useState("");
  const [unidades, setUnidades] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [inputsData, setInputsData] = useState([]);

  useEffect(() => {
    async function GetData() {
      try {
        const data = await axios.get("/inputs");
        setInputsData(data.data);
      } catch (e) {
        toast.error(e);
      }
    }

    GetData();
  });

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  const clear = () => {
    setNome("");
    setPesoUnitario("");
    setPesoTotal("");
    setUnidades("");
    setDataValidade("");
    setDataCompra("");
    setFornecedor("");
  };

  async function handleClick(e) {
    e.preventDefault();

    try {
      await axios.post("/inputs", {
        nome,
        peso_unitario: pesoUnitario,
        unidades,
        peso_total: pesoTotal,
        fornecedor,
        data_validade: dataValidade,
        data_compra: dataCompra,
      });

      // clear();
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }
    }
  }

  return (
    <InputsContainer>
      <Header />
      <SearchSpace>
        <FaSearch size={30} className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar insumo..."
          className="input-search"
        />
        <MdLogout size={27} class="logout" onClick={(e) => handleLogout(e)} />
        <div className="checkboxes">
          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Nome</h3>

          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Peso unitário</h3>

          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Peso total</h3>

          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Unidades</h3>

          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Data da compra</h3>

          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Data de validade</h3>

          <input type="checkbox" className="checkbox" />
          <h3 className="checkbox-label">Fornecedor</h3>
        </div>
      </SearchSpace>
      <InputsSpace>
        {inputsData.map((input) => {
          return (
            <div key={input.id} className="main-data-div">
              <div className="label">Nome: </div>
              <div className="label">Peso unitário: </div>
              <div className="label">Peso total: </div>
              <div className="label">Unidades: </div>
              <div className="label">Fornecedor: </div>
              <div className="data-div">{input.nome}</div>
              <div className="data-div">{input.peso_unitario}</div>
              <div className="data-div">{input.peso_total}</div>
              <div className="data-div">{input.unidades}</div>
              <div className="data-div">{input.fornecedor}</div>
            </div>
          );
        })}
      </InputsSpace>
      <NewInput>
        <input
          type="text"
          id="name"
          placeholder="Nome..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          id="u-weight"
          placeholder="Peso unitário..."
          value={pesoUnitario}
          onChange={(e) => setPesoUnitario(e.target.value)}
        />
        <input
          type="text"
          id="t-weight"
          placeholder="Peso total..."
          value={pesoTotal}
          onChange={(e) => setPesoTotal(e.target.value)}
        />
        <input
          type="text"
          id="unities"
          placeholder="Unidades..."
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
        />
        <input
          type="text"
          id="b-date"
          placeholder="Data de compra..."
          value={dataCompra}
          onChange={(e) => setDataCompra(e.target.value)}
        />
        <input
          type="text"
          id="e-date"
          placeholder="Data de validade..."
          value={dataValidade}
          onChange={(e) => setDataValidade(e.target.value)}
        />
        <input
          type="text"
          id="supplier"
          placeholder="Fornecedor..."
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => handleClick(e)}>
          Adicionar
        </button>
      </NewInput>
    </InputsContainer>
  );
}
