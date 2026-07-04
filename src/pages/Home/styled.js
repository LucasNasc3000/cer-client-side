/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";
import * as colors from "../../config/colors";

export const HomeContainer = styled.div`
  height: 700px;
  width: 100%;
  background-color: ${colors.primaryDarkColor};
  overflow-y: auto;

  .price {
    display: flex;
    position: relative;
    height: 90px;
    width: fit-content;
    bottom: 1420px;
    left: 870px;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 40px;
    color: black;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .price-today {
    display: flex;
    position: relative;
    height: 90px;
    width: fit-content;
    bottom: 1580px;
    left: 720px;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 40px;
    color: black;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .price-year {
    display: flex;
    position: relative;
    height: 90px;
    width: fit-content;
    bottom: 1510px;
    left: 720px;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 40px;
    color: black;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .total-price {
    display: flex;
    position: relative;
    top: 15px;
    right: 115px;
  }

  .text {
    display: flex;
    position: relative;
    font-size: 15px;
    bottom: 30px;
    left: 80px;
    width: 230px;
    align-items: center;
    justify-content: center;
  }

  .filter-space {
    display: flex;
    color: black;
    width: fit-content;
    height: fit-content;
    position: relative;
    bottom: 1360px;
    left: 1065px;
  }

  .filter-space-sales {
    display: flex;
    color: black;
    width: fit-content;
    height: fit-content;
    position: relative;
    bottom: 1765px;
    left: 1065px;
  }

  .filter-select-label {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    right: 6px;
  }

  .options {
    display: flex;
    background-color: #dad7d7ff;
    height: 35px;
    font-size: 15px;
    padding: 5px;
    border: none;
    border-radius: 6px;
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

  .warn {
    display: flex;
    position: relative;
    right: 70px;
    font-size: 18px;
    color: black;
  }

  /* Abaixo de 1024px o menu lateral vira uma barra horizontal (ver
     Header/HeaderHome), então todos os cards e gráficos deste dashboard
     deixam de depender dos deslocamentos gigantes calculados para uma
     tela cheia e passam a fluir normalmente, um abaixo do outro / lado
     a lado com quebra de linha, sem cortar nem esticar nada. */
  @media (max-width: ${breakpoints.laptop}) {
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px 40px;

    .price,
    .price-today,
    .price-year {
      position: static;
      bottom: auto;
      left: auto;
      width: 90%;
      max-width: 320px;
      margin: 10px 0;
      font-size: 28px;
    }

    .total-price {
      position: static;
      top: auto;
      right: auto;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }

    .text {
      position: static;
      bottom: auto;
      left: auto;
      width: 90%;
      max-width: 320px;
      text-align: center;
    }

    .filter-space,
    .filter-space-sales {
      position: static;
      bottom: auto;
      left: auto;
      width: 100%;
      justify-content: center;
      margin: 10px 0;
    }

    .filter-select-label {
      right: auto;
    }

    .warn {
      position: static;
      right: auto;
      text-align: center;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    .price,
    .price-today,
    .price-year {
      font-size: 22px;
      height: 70px;
    }
  }
`;
