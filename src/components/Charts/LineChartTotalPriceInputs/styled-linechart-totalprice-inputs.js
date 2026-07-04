import styled from "styled-components";
import { breakpoints } from "../../../config/breakpoints";

export const ChartContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 1350px;
  left: 290px;
  height: 300px;
  width: fit-content;

  .chart-container {
    display: flex;
    background-color: #fff;
    padding: 5px;
    border-radius: 6px;
    width: 950px;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  /* Responsivo: em telas menores o gráfico sai do posicionamento fixo
     (calculado para o dashboard em tela cheia) e passa a ocupar a largura
     disponível, um abaixo do outro, sem cortar nem esticar o canvas. */
  @media (max-width: ${breakpoints.desktop}) {
    position: static;
    bottom: auto;
    left: auto;
    top: auto;
    right: auto;
    height: auto;
    width: 100%;
    max-width: 100%;
    margin: 10px auto;
    justify-content: center;

    .chart-container {
      width: 100%;
      max-width: 500px;
      height: 280px;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    .chart-container {
      height: 240px;
      padding: 10px;
    }
  }
`;
