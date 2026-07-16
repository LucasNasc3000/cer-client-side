/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";
import * as colors from "../../config/colors";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 690px;
  left: 590px;
  height: 500px;
  width: 450px;

  input {
    background-color: transparent;
    display: flex;
    position: relative;
    height: 40px;
    top: 50px;
    margin-top: 20px;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .new-pass {
    top: 50px;
  }

  .minitext-change-pass {
    top: 70px;
  }

  .minitext-current-pass {
    top: 75px;
  }

  .saveBtn {
    display: flex;
    position: relative;
    width: 170px;
    justify-content: center;
    top: 200px;
    left: 140px;
  }

  p {
    display: flex;
    position: relative;
    color: black;
    top: 190px;
    margin-top: 10px;
  }

  /* Abaixo de 1024px o menu lateral vira uma barra horizontal (ver
     Header), então esse formulário deixa de precisar dos deslocamentos
     gigantes usados para "subir" ao lado do menu fixo. Passa a fluir
     normalmente, centralizado, com largura de 100%. */
  @media (max-width: ${breakpoints.laptop}) {
    position: static;
    bottom: auto;
    left: auto;
    width: 90%;
    max-width: 450px;
    height: auto;
    margin: 30px auto;

    input,
    .saveBtn,
    p {
      position: static;
      top: auto;
      left: auto;
    }

    .saveBtn {
      width: 60%;
      max-width: 170px;
      margin: 20px auto 0;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 94%;

    input {
      width: 100%;
    }
  }
`;

export const Btn = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  transition: all 160ms;
  width: 150px;
  height: 40px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.laptop}) {
    margin: 40px auto 0;
    display: flex;
  }
`;
