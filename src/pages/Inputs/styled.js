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
        display: flex;
        height: 35px;
        width: 930px;
        position: relative;
        left: 310px;
        top: 20px;
        border-radius: 8px;
        border-style: none;
        font-size: 14px;
    }

    .search-icon {
        display: flex;
        height: 30px;
        width: 90px;
        position: relative;
        color: #fff;
        left: 300px;
        top: 25px;
    }

    .checkbox {
        height: 30px;
        width: 30px;
        margin-left: 35px;
    }

    .checkboxes {
        display: flex;
        flex-direction: row;
        position: relative;
        right: 270px;
        top: 80px;
        height: 30px;
        width: 670px;
    }

    .checkbox-label {
        color: black;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 8px;
    }

    .logout {
        display: flex;
        position: relative;
        height: 95px;
        width: 95px;
        color: #fff;
        left: 625px;
        top: -5px
    }

    .logout:hover {
        filter: brightness(70%);
    }

    .search-icon:hover {
        filter: brightness(80%);
    }
`;