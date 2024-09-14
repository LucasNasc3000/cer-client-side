/* eslint-disable prettier/prettier */
import React from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../../components/Header";
import { InputsContainer, SearchSpace } from "./styled";

export default function Inputs() {
    return(
        <InputsContainer>
            <Header />
            <SearchSpace>
                <FaSearch size={25} className="search-icon" />
                <input type="text" placeholder="Pesquisar insumo..." className="input-search" />
                <span className="radios">
                    <input type="radio" className="radio" />
                    <input type="radio" className="radio" />
                    <input type="radio" className="radio" />
                    <input type="radio" className="radio" />
                </span>
            </SearchSpace>
        </InputsContainer>
    );
}