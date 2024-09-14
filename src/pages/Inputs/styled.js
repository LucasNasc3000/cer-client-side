/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
// import * as colors from "../../config/colors";

export const InputsContainer = styled.div`
    background-color: aqua;
`;

export const SearchSpace = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    background-color: burlywood;
    height: 120px;
    width: 1050px;
    bottom: 678px;
    left: 230px;

    .input-search {
        height: 35px;
        width: 450px;
        margin-left: 20px;
        margin-top: 20px;
        border-radius: 8px;
        border-style: none;
        font-size: 14px;
    }

    .search-icon {
        height: 40px;
        width: 40px;
        color: #fff;
        margin-left: 240px;
        margin-top: 20px;
    }

    .radio {
        height: 20px;
        width: 25px;
        margin-left: 90px;
        margin-top: 3px;
    }

    .radios {
        display: flex;
        flex-direction: row;
        background-color: aquamarine;
        margin-left: -540px;
        margin-top: 80px;
        height: 30px;
        width: 600px;
    }

    .search-icon:hover {
        filter: brightness(80%);
    }
`;