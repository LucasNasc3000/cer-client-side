/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";

export const SalesContainer = styled.div`
  height: 840px;
`;

export const SearchSpace = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 120px;
  width: 1280px;
  bottom: 829px;
  left: 260px;

  .sale-search {
    display: flex;
    height: fit-content;
    width: 490px;
    position: relative;
    left: 310px;
    top: 20px;
    border-radius: 4px;
    border-style: none;
    font-size: 14px;
  }

  .search-bar {
    display: flex;
    position: relative;
    width: 300px;
    height: 39px;
    right: 70px;
    border-style: none;
    border-radius: 4px;
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
    box-shadow: 1px 1.5px rgb(173, 173, 173);
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
    right: 340px;
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
    right: 380px;
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

export const SalesSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  bottom: 760px;
  height: 500px;
  width: 580px;
  left: 450px;

  .main-data-div {
    background-color: #4f4f4f;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    height: 385px;
    width: 450px;
    margin-left: 70px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }

  .main-data-div-search {
    background-color: #4f4f4f;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    height: 385px;
    width: 450px;
    margin-left: 70px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }

  .data-div {
    position: relative;
    color: #fff;
    width: 170px;
    bottom: 182px;
    left: 110px;
    margin-top: 13px;
    color: #fff;
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
    line-break: auto;
    border-bottom: 0.5px solid #fff;
  }

  .data-div-search {
    position: relative;
    color: #fff;
    width: 170px;
    bottom: 182px;
    left: 110px;
    margin-top: 13px;
    color: #fff;
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
    line-break: auto;
    border-bottom: 0.5px solid #fff;
  }

  .label {
    display: flex;
    position: relative;
    right: 120px;
    top: 66px;
    margin-top: 13px;
    width: 170px;
    color: #fff;
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
    word-break: keep-all;
    border-bottom: 0.5px solid #fff;
  }

  .label-search {
    display: flex;
    position: relative;
    right: 110px;
    top: 66px;
    margin-top: 13px;
    width: 170px;
    color: #fff;
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
    word-break: keep-all;
    border-bottom: 0.5px solid #fff;
  }

  .edit {
    display: flex;
    position: relative;
    top: 410px;
    left: 28px;
    width: fit-content;
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

  .edit-icon-search {
    position: relative;
    color: white;
    display: flex;
    height: 35px;
    width: 100px;
    justify-content: center;
    align-items: center;
    left: 0px;
    top: 415px;
  }

  .btd-button {
    display: flex;
    position: relative;
    top: 465px;
    left: 50px;
  }

  .edit-icon:hover {
    filter: brightness(80%);
  }
`;

export const NewSale = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  bottom: 1235px;
  left: 1180px;
  height: fit-content;
  width: fit-content;

  input {
    background-color: #dcdcdc;
    height: 30px;
    width: 170px;
    margin-top: 15px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid black;
  }

  .btn {
    height: 40px;
    width: 120px;
    margin-top: 15px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }
`;
