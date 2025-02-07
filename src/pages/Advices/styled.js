import styled from "styled-components";

export const AdvicesContainer = styled.div`
  display: flex;
`;

export const AdvicesSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: green;
  top: 45px;
  left: 50px;
  height: 630px;
  width: 850px;
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
