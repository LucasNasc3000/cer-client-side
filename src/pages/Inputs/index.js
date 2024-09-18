/* eslint-disable prettier/prettier */
import React from "react";
import { FaSearch , FaPlus } from "react-icons/fa";

import { MdLogout } from "react-icons/md";
import Header from "../../components/Header";
import { InputsContainer, SearchSpace, AddInput, InputsSpace, NewInput } from "./styled";

export default function Inputs() {
    return(
        <InputsContainer>
            <Header />
            <SearchSpace>
                <FaSearch size={30} className="search-icon" />
                <input type="text" placeholder="Pesquisar insumo..." className="input-search" />
                <MdLogout size={27} class="logout" />
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
                <input type="text" placeholder="Nome..." />
                <input type="text" placeholder="Tipo..." />
                <input type="text" placeholder="Peso unitário..."/>
                <input type="text" placeholder="Peso total..." />
                <input type="text" placeholder="Unidades..." />
                <input type="text" placeholder="Data de compra..." />
                <input type="text" placeholder="Data de validade..." />
                <input type="text" placeholder="Fornecedor..." />
                <button type="button" className="btn">Cancelar</button>
                <button type="button" className="btn">Adicionar</button>
            </NewInput>
        </InputsContainer>
    );
}