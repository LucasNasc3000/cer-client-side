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
    left: 250px;

    .search-space {
      display: flex;
      position: relative;
      width: 490px;
      height: fit-content;
      border-radius: 4px;
      border-style: none;
      font-size: 14px;
      left: 310px;
      top: 20px;
    }

    .output-search {
      display: flex;
      height: 39px;
      width: 300px;
      position: relative;
      right: 0px;
      border-radius: 4px;
      border-style: none;
      box-shadow: 1px 1.5px rgb(173, 173, 173);
    }

    .search-btn {
      display: flex;
      background-color: #696969;
      height: 38px;
      width: 84px;
      position: relative;
      align-content: center;
      justify-content: center;
      left: 390px;
      top: 1px;
      padding: 10px;
    }

    .checkbox {
      height: 13px;
      width: 13px;
      margin-left: 35px;
    }

    .checkboxes {
      display: flex;
      flex-direction: row;
      position: relative;
      right: 240px;
      top: 90px;
      height: 30px;
      width: 670px;
    }

    .checkbox-label {
      color: black;
      font-weight: 100;
      font-size: 12.5px;
      margin-left: 5px;
      margin-top: 0px;
    }

    .arrow {
      display: flex;
      position: relative;
      height: 42px;
      width: 42px;
      right: 400px;
      top: 20px;
      color: #fff;
    }

    .arrow:hover {
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
    left: 360px;

    .main-data-div {
      background-color: #4F4F4F;
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
      bottom: 150px;
      left: 110px;
      margin-top: 10px;
      color: white;
      font-size: 17px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      word-break: keep-all;
      border-bottom: 0.5px solid white;
    }

    .edit {
      display: flex;
      position: relative;
      top: 342px;
      left: 30px;
      width: fit-content
    }

    .edit-icon {
      position: relative;
      color: white;
      display: flex;
      height: 35px;
      width: 100px;
      justify-content: center;
      align-items: center;
      left: -30px;
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
    left: 1160px;
    height: fit-content;
    width: fit-content;

    input {
      background-color: #DCDCDC;
      height: 30px;
      width: 170px;
      margin-top: 10px;
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
