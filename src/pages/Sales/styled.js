/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
// import * as colors from "../../config/colors";

export const SalesContainer = styled.div``;

export const SearchSpace = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 120px;
    width: 1050px;
    bottom: 683px;
    left: 230px;

    .sale-search {
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

    .arrow {
      display: flex;
      position: relative;
      height: 95px;
      width: 95px;
      right: 310px;
      top: -5px;
      color: #fff;
    }

    .arrow:hover {
      filter: brightness(70%);
    }

    .logout:hover {
      filter: brightness(70%);
    }

    .search-icon:hover {
      filter: brightness(80%);
    }
`;

export const SalesSpace = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    bottom: 650px;
    height: 500px;
    width: 620px;
    left: 300px;

    .main-data-div {
      background-color: #688da2;
      display: flex;
      flex-direction: column;
      height: 350px;
      width: 450px;
      margin-top: 10px;
      margin-left: 90px;
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    }

    .data-div {
      position: relative;
      color: black;
      width: 170px;
      bottom: 154px;
      left: 110px;
      margin-top: 20px;
      color: white;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
      border-bottom: 0.5px solid white;
    }

    .label {
      display: flex;
      position: relative;
      right: 130px;
      top: 140px;
      margin-top: 10px;
      width: 130px;
      color: white;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
      border-bottom: 0.5px solid white;
    }

    .edit {
      display: flex;
      position: relative;
      top: 145px;
      left: -16px;
      width: 120px;
    }

    .edit-icon {
      position: relative;
      color: white;
      display: flex;
      height: 35px;
      width: 40px;
      padding: 4px;
      left: 15px;
    }

    .delete-icon {
      display: flex;
      position: relative;
      color: white;
      height: 35px;
      width: 40px;
      padding: 4px;
      left: 30px;
    }

    .edit-icon:hover {
      filter: brightness(80%);
    }

    .delete-icon:hover {
      color: red;
    }
`;

export const NewSale = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    bottom: 1155px;
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
