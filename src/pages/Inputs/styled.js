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
    bottom: 683px;
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

export const AddInput = styled.div`
    display: flex;
    position: relative;
    bottom: 650px;
    left: 1010px;
    height: 70px;
    width: 190px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .btn {
        height: 70px;
        width: 190px;
    }

    .btn-text {
        position: relative;
        top: -27px;
        left: 35px;
        width: 130px;
        font-size: 18px;
    }

    .icon {
        position: relative;
        right: 50px;
        top: 10px;
    }
`;

export const InputsSpace = styled.div`
    display: flex;
    position: relative;
    bottom: 720px;
    height: 520px;
    width: 620px;
    left: 300px;
    background-color: green;
`;

export const NewInput = styled.div`
    display: flex;
    background-color: yellow;
    position: relative;
    bottom: 690px;
    left: 300px;
    height: 90px;
    width: 120px;
`;