/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
// import * as colors from "../../config/colors";

export const InputsContainer = styled.div``;

export const SearchSpace = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
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

export const InputsSpace = styled.div`
    display: flex;
    position: relative;
    bottom: 650px;
    height: 520px;
    width: 620px;
    left: 300px;
    background-color: green;

    .main-data-div {
      background-color: aqua;
      display: flex;
      flex-direction: column;
      height: 200px;
      width: 300px;
      margin-top: 10px;
      margin-left: 150px;
      border-radius: 8px;
      justify-content: center;
      align-items: center;
    }

    .data-div {
      background-color: white;
      color: black;
      width: fit-content;
      margin-top: 4px;
    }
`;

export const NewInput = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    bottom: 1170px;
    left: 1020px;
    height: fit-content;
    width: fit-content;

    input {
        height: 30px;
        width: 170px;
        margin-top: 5px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 0.5px solid black;
    }

    .btn {
        height: 40px;
        width: 120px;
        margin-top: 15px;
    }
`;
