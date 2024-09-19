/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch , FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { get } from "lodash";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import Header from "../../components/Header";
import { InputsContainer, SearchSpace, AddInput, InputsSpace, NewInput } from "./styled";

export default function Inputs() {
    const dispatch = useDispatch();

    const [nome, setNome] = useState("");
    const [pesoUnitario, setPesoUnitario] = useState("");
    const [pesoTotal, setPesoTotal] = useState("");
    const [unidades, setUnidades] = useState("");
    const [dataCompra, setDataCompra] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [fornecedor, setFornecedor] = useState("");

    const handleLogout = (e) => {
        e.preventDefault();
    
        dispatch(actions.loginFailure());
        history.push("/");
      };

        async function handleClick(e) {
            e.preventDefault();
        
            try {
              await axios.post("/inputs", {
                nome,
                peso_unitario: pesoUnitario,
                peso_total: pesoTotal,
                unidades,
                data_compra: dataCompra,
                data_validade: dataValidade,
                fornecedor,
              });
            } catch (err) {
              const errors = get(err, "response.data.errors", []);
        
              if (errors.length > 0) {
                errors.map((error) => toast.error(error));
              } else {
                toast.error("Erro desconhecido");
              }
            }
          }

        // const cancel = (e) => {

        // }

    return(
        <InputsContainer>
            <Header />
            <SearchSpace>
                <FaSearch size={30} className="search-icon" />
                <input type="text" placeholder="Pesquisar insumo..." className="input-search" />
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
            <AddInput>
                <button type="button" className="btn">
                    <FaPlus size={32} className="icon" />
                    <h4 className="btn-text">Adicionar insumo</h4>
                </button>
            </AddInput>
            <InputsSpace />
            <NewInput>
                <input type="text" placeholder="Nome..." value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="text" placeholder="Peso unitário..." value={pesoUnitario} onChange={(e) => setPesoUnitario(e.target.value)}/>
                <input type="text" placeholder="Peso total..." value={pesoTotal} onChange={(e) => setPesoTotal(e.target.value)} />
                <input type="text" placeholder="Unidades..." value={unidades} onChange={(e) => setUnidades(e.target.value)} />
                <input type="text" placeholder="Data de compra..." value={dataCompra} onChange={(e) => setDataCompra(e.target.value)} />
                <input type="text" placeholder="Data de validade..." value={dataValidade} onChange={(e) => setDataValidade(e.target.value)} />
                <input type="text" placeholder="Fornecedor..." value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
                <button type="button" className="btn">Cancelar</button>
                <button type="button" className="btn" onClick={(e) => handleClick(e)}>Adicionar</button>
            </NewInput>
        </InputsContainer>
    );
}