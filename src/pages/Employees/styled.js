import styled from "styled-components";

export const EmployeesListContainer = styled.div``;

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
  }

  .email {
    left: 140px;
    top: 4px;
    bottom: 25px;
    width: 100px;
  }

  .email-label {
    top: 30px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 255px;
  }

  .permission-label {
    top: 30px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 255px;
  }

  .permission {
    left: 140px;
    top: 4px;
    bottom: 25px;
    width: 100px;
    border-bottom: none;
  }

  .al-label {
    border-bottom: none;
    top: 30px;
    border-bottom: 1px solid white;
    padding: 3px;
    width: 305px;
  }

  .a-l {
    top: 4px;
    left: 290px;
    bottom: 25px;
    width: 100px;
  }
`;
