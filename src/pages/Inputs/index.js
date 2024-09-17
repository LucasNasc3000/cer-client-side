/* eslint-disable prettier/prettier */
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Header from "../../components/Header";
import { InputsContainer, SearchSpace } from "./styled";

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
        </InputsContainer>
    );
}