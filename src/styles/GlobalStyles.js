/* eslint-disable import/no-extraneous-dependencies */
import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle, styled } from "styled-components";
import * as colors from "../config/colors";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html {
    /* Impede que qualquer elemento com largura fixa gere scroll horizontal na página */
    overflow-x: hidden;
  }

  body {
    background: #f5f4f4ff;
    color: ${colors.primaryDarkColor};
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;
  }

  html, body, #root {
    height: 100%;
    max-width: 100%;
  }

  img, svg, canvas {
    max-width: 100%;
  }

  @media (max-width: 1024px) {
    button {
      padding: 8px 14px;
      font-size: 14px;
    }

    body {
      overflow: auto;
    }
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 160ms;
  }

  button:hover {
    filter: brightness(86%);
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.section`
  max-width: 600px;
  max-height: 580px;
  background: #808080;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const Spinner = styled.div`
  margin-top: 100px;
  width: 120px;
  height: 120px;
  border: 2.5px solid rgba(153, 150, 150, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const GetDataSpinner = styled.div`
  margin-top: 100px;
  width: 120px;
  height: 120px;
  border: 2.5px solid rgba(72, 71, 71, 0.4);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorIcon = styled.div`
  margin-top: 120px;
  color: rgba(123, 123, 123, 0.4);
`;
