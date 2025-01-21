/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
// import * as colors from "../../config/colors";

export const OutputsContainer = styled.div`
  overflow: hidden;
`;

export const SearchSpace = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 120px;
    width: 1290px;
    bottom: 750px;
    left: 230px;

    .output-search {
      display: flex;
      height: 33px;
      width: 500px;
      position: relative;
      left: 290px;
      top: 22px;
      border-radius: 8px;
      border-style: none;
      font-size: 14px;
      box-shadow: 1px 1.5px rgb(173, 173, 173);
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
      height: 16px;
      width: 16px;
      margin-left: 35px;
    }

    .checkboxes {
      display: flex;
      flex-direction: row;
      position: relative;
      right: 430px;
      top: 90px;
      height: 30px;
      width: 670px;
    }

    .checkbox-label {
      color: black;
      font-size: 12.5px;
      margin-left: 5px;
      margin-top: 2px;
    }

    .logout {
      display: flex;
      position: relative;
      height: 38px;
      width: 38px;
      color: #fff;
      left: 625px;
      top: 23px
    }

    .arrow {
      display: flex;
      position: relative;
      height: 38px;
      width: 38px;
      right: 570px;
      top: 20px;
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

export const OutputsSpace = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    bottom: 700px;
    height: 500px;
    width: 620px;
    left: 300px;

    .main-data-div {
      background-color: #688da2;
      display: flex;
      flex-direction: column;
      height: 315px;
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
      bottom: 135px;
      left: 110px;
      margin-top: 10px;
      color: white;
      font-size: 17px;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
      border-bottom: 0.5px solid white;
    }

    .label {
      display: flex;
      position: relative;
      right: 120px;
      top: 50px;
      margin-top: 10px;
      width: 170px;
      color: white;
      font-size: 17px;
      font-family: Arial, Helvetica, sans-serif;
      word-break: keep-all;
      border-bottom: 0.5px solid white;
    }

    .edit {
      display: flex;
      position: relative;
      top: 64px;
      left: 30px;
      width: 135px;
    }

    .edit-icon {
      position: relative;
      color: white;
      display: flex;
      height: 45px;
      width: 45px;
      padding: 4px;
      left: 15px;
    }

    .edit-icon:hover {
      filter: brightness(80%);
    }
`;

export const NewOutput = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    bottom: 1165px;
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
