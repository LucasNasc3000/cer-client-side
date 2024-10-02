import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { get } from "lodash";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import Header from "../../components/Header";
import { SalesContainer, SearchSpace, SalesSpace, NewSale } from "./styled";

export default function Sales() {
  const dispatch = useDispatch();

  const [produto, setProduto] = useState("");
  const [pesoTotal, setPesoTotal] = useState("");
  const [unidadesValue, setUnidades] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchParam, setSearchParam] = useState("");
  const [id, setId] = useState(0);
  const [inputsData, setInputsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = document.querySelector(".sale-search");

  useEffect(() => {
    async function GetData() {
      try {
        const data = await axios.get("/sales");
        setInputsData(data.data);
      } catch (e) {
        toast.error("Erro ao exibir vendas");
      }
    }

    GetData();
  });

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  const clear = (e) => {
    e.preventDefault();

    setId(0);
    setProduto("");
    setPesoTotal("");
    setUnidades("");
    setNomeCliente("");
    setTelefoneCliente("");
    setEnderecoCliente("");
    setDataVenda("");
    setSearchParam("");
    searchInput.value = "";
    setSearchResults([]);
  };

  const SetSales = (e, idParam, data) => {
    e.preventDefault();

    setId(idParam);
    setProduto(data.produto);
    setPesoTotal(data.peso_total);
    setUnidades(data.unidades);
    setNomeCliente(data.nome_cliente);
    setTelefoneCliente(data.telefone_cliente);
    setEnderecoCliente(data.endereco_cliente);
    setDataVenda(data.data_venda);
  };

  async function DoSearch(e) {
    e.preventDefault();
    try {
      const result = await axios.get(
        `/sales/search/${searchParam}/${searchInput.value}`
      );
      setSearchResults(result.data);
      clear();
    } catch (err) {
      toast.error(err);
    }
  }

  async function SaleUpdate() {
    try {
      await axios.put(`/sales/${id}`, {
        produto,
        peso_total: pesoTotal,
        unidades: unidadesValue,
        nome_cliente: nomeCliente,
        telefone_cliente: telefoneCliente,
        endereco_cliente: enderecoCliente,
        data_venda: dataVenda,
      });

      clear();
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro ao atualizar venda. Verifique os dados inseridos");
      }
    }
  }

  async function SaleRegister(e) {
    e.preventDefault();

    try {
      await axios.post("/sales", {
        produto,
        peso_total: pesoTotal,
        unidades: unidadesValue,
        nome_cliente: nomeCliente,
        telefone_cliente: telefoneCliente,
        endereco_cliente: enderecoCliente,
        data_venda: dataVenda,
      });

      clear();
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error(
          "Erro ao cadastrar nova venda. Verifique os dados inseridos"
        );
      }
    }
  }

  const Delete = async (e, idParam) => {
    e.preventDefault();

    try {
      await axios.delete(`/sales/${idParam}`);
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }
    }
  };

  const IdVerify = (e) => {
    e.preventDefault();

    if (id !== 0) {
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
            name="clientName"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Nome cliente</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="clientAddress"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Endereco cliente</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="clientPhone"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Telefone cliente</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="product"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Produto</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="saleDate"
            onChange={(e) => setSearchParam(e.target.name)}
          />
          <h3 className="checkbox-label">Data venda</h3>

          <input
            type="checkbox"
            className="checkbox"
            name="totalWeight"
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
        </div>
      </SearchSpace>
      <SalesSpace>
        {searchResults.length < 1
          ? inputsData.map((sale) => {
              return (
                <div key={sale.id} className="main-data-div">
                  <div className="edit">
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => SetSales(e, sale.id, sale)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => Delete(e, sale.id)}
                    />
                  </div>
                  <div className="label">Produto: </div>
                  <div className="label">Peso total: </div>
                  <div className="label">Unidades: </div>
                  <div className="label">Nome do cliente: </div>
                  <div className="label">Telefone do cliente: </div>
                  <div className="label">Endereco do cliente: </div>
                  <div className="label">Data da venda: </div>
                  <div className="data-div">{sale.produto}</div>
                  <div className="data-div">{sale.peso_total}</div>
                  <div className="data-div">{sale.unidades}</div>
                  <div className="data-div">{sale.nome_cliente}</div>
                  <div className="data-div">{sale.telefone_cliente}</div>
                  <div className="data-div">{sale.endereco_cliente}</div>
                  <div className="data-div">{sale.data_venda}</div>
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
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => Delete(e, sale.id)}
                    />
                  </div>
                  <div className="label">Produto: </div>
                  <div className="label">Peso total: </div>
                  <div className="label">Unidades: </div>
                  <div className="label">Nome do cliente: </div>
                  <div className="label">Telefone do cliente: </div>
                  <div className="label">Endereco do cliente: </div>
                  <div className="label">Data da venda: </div>
                  <div className="data-div">{sale.produto}</div>
                  <div className="data-div">{sale.peso_total}</div>
                  <div className="data-div">{sale.unidades}</div>
                  <div className="data-div">{sale.nome_cliente}</div>
                  <div className="data-div">{sale.telefone_cliente}</div>
                  <div className="data-div">{sale.endereco_cliente}</div>
                  <div className="data-div">{sale.data_venda}</div>
                </div>
              );
            })}
      </SalesSpace>
      <NewSale>
        <input
          type="text"
          id="product"
          placeholder="Produto..."
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
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
          value={unidadesValue}
          onChange={(e) => setUnidades(e.target.value)}
        />
        <input
          type="text"
          id="c-name"
          placeholder="Nome do cliente..."
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />
        <input
          type="text"
          id="c-phone"
          placeholder="Telefone do cliente..."
          value={telefoneCliente}
          onChange={(e) => setTelefoneCliente(e.target.value)}
        />
        <input
          type="text"
          id="c-address"
          placeholder="Endereço do cliente..."
          value={enderecoCliente}
          onChange={(e) => setEnderecoCliente(e.target.value)}
        />
        <input
          type="text"
          id="sale-date"
          placeholder="Data da venda..."
          value={dataVenda}
          onChange={(e) => setDataVenda(e.target.value)}
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
