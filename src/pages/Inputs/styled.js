/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
// import * as colors from "../../config/colors";

export const InputsContainer = styled.div`
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

  .input-search {
    display: flex;
    height: 39px;
    width: 300px;
    position: relative;
    right: 70px;
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
    left: 320px;
    top: 1px;
    padding: 10px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .checkbox {
    height: 32px;
    width: 32px;
    margin-left: 35px;
  }

  .checkboxes {
    display: flex;
    flex-direction: row;
    position: relative;
    right: 370px;
    top: 90px;
    height: 30px;
    width: 670px;
  }

  .checkbox-label {
    color: black;
    font-weight: 100;
    font-size: 12.5px;
    margin-left: 5px;
    margin-top: 8px;
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

export const InputsSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  bottom: 705px;
  height: 500px;
  width: 620px;
  left: 360px;

  .main-data-div {
    background-color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    height: 515px;
    width: 515px;
    margin-top: 25px;
    margin-left: 70px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .data-div {
    display: flex;
    background-color: #dad7d7ff;
    color: black;
    width: max-content;
    height: 38px;
    border-radius: 8px;
    left: 110px;
    margin-top: 0px;
    border: none;
    font-size: 16px;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    text-align: center;
  }

  .data-wrap {
    position: relative;
    margin-top: 40px;
    margin-left: 50px;
    bottom: 360px;
    right: 40px;
    display: flex;
    height: fit-content;
    width: fit-content;
    border-radius: 8px;
    background-color: aqua;
  }

  .label {
    display: flex;
    position: relative;
    margin-top: 55px;
    margin-left: 62px;
    bottom: 15px;
    color: black;
    right: 50px;
    width: 170px;
    font-size: 17px;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    word-break: keep-all;
  }

  /* .edit {
    display: flex;
    top: 522px;
    left: 30px;
    width: fit-content;
  } */

  .edit-icon {
    display: flex;
    height: 38px;
    width: 43px;
    justify-content: center;
    align-items: center;
    background-color: #dad7d7ff;
    padding: 10px;
    border-radius: 8px;
    margin-top: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .pencil {
    display: flex;
    color: #575757ff;
    padding: -2px;
  }

  .confirm-changes {
    display: flex;
    position: relative;
    background-color: #a5a4a4ff;
    bottom: 315px;
    width: 120px;
    right: 20px;
    justify-content: center;
    font-weight: 400;
    font-size: 15px;
  }

  .cancel-changes {
    display: flex;
    position: relative;
    background-color: #a5a4a4ff;
    bottom: 315px;
    width: 120px;
    right: 5px;
    justify-content: center;
    font-weight: 400;
    font-size: 15px;
  }

  .data-div::placeholder {
    color: black;
    font-size: 15px;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .data-div-eid::placeholder {
    color: black;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .data-div-rin::placeholder {
    color: black;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .edit-icon:hover {
    filter: brightness(80%);
  }
`;

export const NewInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  bottom: 1195px;
  left: 1160px;
  height: fit-content;
  width: fit-content;

  input {
    background-color: #f5f4f4ff;
    height: 30px;
    width: 170px;
    margin-top: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid black;
  }

  .btn {
    display: flex;
    position: relative;
    top: 20px;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 120px;
    margin-top: 15px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }
`;
