import styled from "styled-components";
import * as colors from "../../config/colors";

export const EmployeesListContainer = styled.div`
  height: 740px;
`;

export const SearchSpace = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 120px;
  width: 1290px;
  bottom: 750px;
  left: 230px;

  .input-search {
    display: flex;
    height: 35px;
    width: 390px;
    position: relative;
    left: 285px;
    top: 23px;
    border-radius: 8px;
    border-style: none;
    font-size: 14px;
  }

  .search-icon {
    display: flex;
    height: 32px;
    width: 92px;
    position: relative;
    color: #fff;
    left: 290px;
    top: 25px;
  }

  .exemp-list {
    height: 35px;
    width: 190px;
    margin-left: 365px;
    margin-top: 24px;
  }

  .logout {
    display: flex;
    position: relative;
    height: 75px;
    width: 75px;
    color: #fff;
    left: 625px;
    top: 3px;
  }

  .arrow {
    display: flex;
    position: relative;
    height: 42px;
    width: 42px;
    right: 1040px;
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

export const EmployeeInputs = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 1400px;
  left: 1130px;
  width: 350px;
  height: 600px;

  input {
    width: 220px;
    height: 36px;
    margin-top: 7px;
    margin-left: 70px;
    border-style: none;
    border-radius: 4px;
  }

  button {
    margin-top: 10px;
    margin-left: 80px;
    width: 200px;
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
  bottom: 740px;
  left: 470px;
  width: 600px;
  height: 710px;
  overflow-y: auto;

  div {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-left: 80px;
    margin-top: 5px;
  }

  .main-data-div {
    background-color: #688da2;
    top: 10px;
    margin-top: 20px;
    width: 440px;
    height: 250px;
    border-radius: 6px;
    box-shadow: 3px 1.8px rgb(149, 148, 148);
  }

  .name {
    font-size: 24px;
    left: 0px;
    top: 5px;
    font-weight: bold;
  }

  .id-label {
    border-bottom: 1px solid white;
    padding: 3px;
    width: 335px;
    bottom: 30px;
    right: 60px;
  }

  .id {
    width: 310px;
    bottom: 56px;
    right: 30px;
    word-break: break-all;
  }

  .email {
    left: 0px;
    top: -68px;
    bottom: 25px;
    width: 100px;
  }

  .email-label {
    top: -40px;
    border-bottom: 1px solid white;
    padding: 3px;
    right: 60px;
    width: 255px;
  }

  .permission-label {
    top: -50px;
    border-bottom: 1px solid white;
    right: 60px;
    padding: 3px;
    width: 255px;
  }

  .permission {
    left: 30px;
    top: -77px;
    bottom: 25px;
    width: 120px;
    word-break: break-all;
    border-bottom: none;
  }

  .al-label {
    border-bottom: none;
    top: -60px;
    right: 60px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 305px;
  }

  .a-l {
    top: -87px;
    left: 190px;
    bottom: 25px;
    width: 100px;
  }

  .edit-icon {
    display: flex;
    position: relative;
    bottom: 23px;
    right: 60px;
  }

  .del-icon {
    display: flex;
    position: relative;
    bottom: 50px;
    right: 20px;
    color: red;
  }

  .edit-icon:hover {
    filter: brightness(70%);
  }

  .del-icon:hover {
    filter: brightness(70%);
  }
`;
