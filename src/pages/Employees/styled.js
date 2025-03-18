import styled from "styled-components";
import * as colors from "../../config/colors";

export const EmployeesListContainer = styled.div`
  height: 840px;
  overflow: hidden;
`;

export const SearchSpace = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 120px;
  width: 1280px;
  bottom: 830px;
  left: 250px;

  .search-space {
    display: flex;
    height: fit-content;
    width: 430px;
    position: relative;
    left: 310px;
    top: 20px;
    border-radius: 4px;
    border-style: none;
    font-size: 14px;
  }

  .input-search {
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

  .exemp-list {
    height: 35px;
    width: 190px;
    margin-left: 365px;
    margin-top: 22px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .arrow {
    display: flex;
    position: relative;
    height: 42px;
    width: 42px;
    right: 875px;
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

export const EmployeeInputs = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 1290px;
  left: 1130px;
  width: 350px;
  height: 600px;

  input {
    background-color: #dcdcdc;
    width: 220px;
    height: 36px;
    margin-top: 15px;
    margin-left: 70px;
    border-style: none;
    border-bottom: 0.5px solid black;
  }

  button {
    margin-top: 10px;
    margin-left: 80px;
    width: 200px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .btn-cancel {
    margin-top: 45px;
  }

  .link {
    display: flex;
    width: 230px;
    height: 35px;
    margin-top: 10px;
    margin-left: 65px;
    background-color: ${colors.primaryColor};
    color: #fff;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    justify-content: space-between;
  }

  .link:hover {
    filter: brightness(70%);
    transition: all 160ms;
  }
`;

export const EmployeeCards = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 800px;
  left: 470px;
  width: 600px;
  height: 575px;
  overflow-y: auto;
  overflow-x: hidden;

  div {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-left: 80px;
    margin-top: 5px;
    color: #fff;
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

  .main-data-div {
    background-color: #4f4f4f;
    top: 10px;
    margin-top: 25px;
    margin-left: 40px;
    width: 510px;
    height: 310px;
    border-radius: 6px;
    box-shadow: 3px 1.8px rgb(149, 148, 148);
  }

  .name {
    font-size: 24px;
    left: 30px;
    top: 5px;
    font-weight: bold;
  }

  .id-label {
    border-bottom: 1px solid white;
    padding: 3px;
    width: 335px;
    bottom: 25px;
    right: 15px;
  }

  .id {
    width: 310px;
    bottom: 56px;
    left: 15px;
    word-break: break-all;
  }

  .email {
    left: 50px;
    top: -70px;
    width: 100px;
  }

  .email-label {
    top: -40px;
    border-bottom: 1px solid white;
    padding: 3px;
    right: 14px;
    width: 255px;
  }

  .permission-label {
    top: -50px;
    border-bottom: 1px solid white;
    right: 14px;
    padding: 3px;
    width: 255px;
  }

  .permission {
    left: 76px;
    top: -80px;
    bottom: 25px;
    width: 120px;
    word-break: break-all;
    border-bottom: none;
  }

  .al-label {
    border-bottom: none;
    top: -60px;
    right: 14px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 305px;
  }

  .a-l {
    top: -92px;
    left: 230px;
    bottom: 25px;
    width: 100px;
  }

  .edit-btn {
    display: flex;
    position: relative;
    bottom: 23px;
    right: 60px;
    width: fit-content;
  }

  .del-btn {
    display: flex;
    position: relative;
    bottom: 10px;
    right: 65px;
    color: red;
    width: fit-content;
  }

  .edit-icon:hover {
    filter: brightness(70%);
  }

  .del-icon:hover {
    filter: brightness(70%);
  }
`;
