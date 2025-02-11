import styled from "styled-components";

export const AdvicesContainer = styled.div`
  display: flex;
  overflow-x: visible;

  .logout {
    display: flex;
    position: relative;
    height: 37px;
    width: 37px;
    color: #fff;
    right: -1140px;
    bottom: -35px;
  }

  .logout:hover {
    filter: brightness(70%);
  }
`;

export const AdvicesSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  top: 45px;
  left: 50px;
  height: 630px;
  width: 850px;

  .main-data-div {
    background-color: #688da2;
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 790px;
    margin-top: 10px;
    margin-left: 30px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }

  .data-div {
    display: flex;
    flex-direction: row;
    color: black;
    width: 170px;
    bottom: 17px;
    margin-right: 15px;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    color: white;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    line-break: auto;
  }

  .edit {
    display: flex;
    top: 110px;
    margin-left: 5px;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  .delete {
    display: flex;
    top: 110px;
    margin-left: 5px;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  .edit-icon {
    color: white;
    display: flex;
    height: 34px;
    width: 34px;
    padding: 2px;
    left: 15px;
  }

  .delete-icon {
    color: white;
    display: flex;
    height: 34px;
    width: 34px;
    padding: 4px;
    left: 15px;
  }

  .edit-icon:hover {
    filter: brightness(80%);
  }

  .delete-icon:hover {
    filter: brightness(80%);
  }
`;

export const NewAdvice = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  top: 215px;
  left: 130px;
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

  .email-body {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    height: 80px;
    width: 220px;
    border-top: none;
    border-left: none;
    border-right: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  .btn {
    height: 40px;
    width: 120px;
    margin-top: 15px;
  }
`;
