import styled from "styled-components";

export const EmployeesListContainer = styled.div``;

export const EmployeeInputs = styled.div`
  display: flex;
  background-color: lime;
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
`;

export const EmployeeCards = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 740px;
  left: 250px;
  width: 850px;
  height: 710px;

  div {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-left: 20px;
    margin-top: 5px;
  }

  .main-data-div {
    background-color: #688da2;
    top: 10px;
    margin-top: 20px;
    width: 390px;
    height: 230px;
    border-radius: 6px;
    box-shadow: 3px 1.8px #a0a0a0;
  }

  .name {
    font-size: 24px;
    left: 110px;
    font-weight: bold;
  }

  .email {
    left: 140px;
    top: -48px;
    bottom: 25px;
    width: 100px;
  }

  .email-label {
    top: -20px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 255px;
  }

  .permission-label {
    top: -30px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 255px;
  }

  .permission {
    left: 140px;
    top: -57px;
    bottom: 25px;
    width: 100px;
    border-bottom: none;
  }

  .al-label {
    border-bottom: none;
    top: -40px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 305px;
  }

  .a-l {
    top: -67px;
    left: 290px;
    bottom: 25px;
    width: 100px;
  }

  .edit-icon {
    display: flex;
    position: relative;
    bottom: 23px;
  }

  .del-icon {
    display: flex;
    position: relative;
    bottom: 51px;
    left: 45px;
    color: red;
  }

  .edit-icon:hover {
    filter: brightness(70%);
  }

  .del-icon:hover {
    filter: brightness(70%);
  }
`;
