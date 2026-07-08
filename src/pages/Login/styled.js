/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";
import * as colors from "../../config/colors";

export const Title = styled.p`
  color: black;
  font-size: 20px;
  text-align: center;
  margin-left: 120px;
  margin-top: 45px;
  border-bottom: 0.5px solid black;
  width: 250px;
  padding: 5px;

  @media (max-width: ${breakpoints.laptop}) {
    margin: 30px auto 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80%;
    max-width: 250px;
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
  margin-left: 170px;
  margin-top: 60px;
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

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 515px;
  margin-top: 100px;
  margin-left: 520px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  overflow: hidden;

  .eye-icon {
    display: flex;
    background-color: transparent;
    align-items: center;
    justify-content: center;
    color: black;
  }

  /* Em telas menores a caixa deixa de ter margem fixa (que a empurrava
     para fora da tela) e passa a se centralizar sozinha, com largura
     fluida, sem cortar nem esticar o conteúdo. */
  @media (max-width: ${breakpoints.laptop}) {
    width: 90%;
    max-width: 490px;
    height: auto;
    min-height: 460px;
    margin: 60px auto 0;
    padding-bottom: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 94%;
    margin: 30px auto 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  input {
    height: 40px;
    width: 330px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 30px;
    margin-left: 80px;
  }

  &:focus {
    border: 1px solid ${colors.primaryColor};
  }

  @media (max-width: ${breakpoints.laptop}) {
    align-items: center;

    input {
      width: 80%;
      max-width: 330px;
      margin-left: 0;
    }
  }
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
