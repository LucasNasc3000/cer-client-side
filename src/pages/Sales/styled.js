/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";
import { fontStack } from "../../config/fonts";

export const SalesContainer = styled.div`
  overflow-y: hidden;
  height: 800px;

  @media (max-width: ${breakpoints.desktop}) {
    height: auto;
    min-height: 100vh;
    overflow-y: visible;
  }
`;

export const SearchSpace = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 120px;
  width: 1290px;
  bottom: 750px;
  left: 250px;

  .search-space {
    display: flex;
    position: relative;
    background-color: #f5f4f4ff;
    height: fit-content;
    width: fit-content;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    left: 360px;
    top: 20px;
    border-bottom: 1px solid black;
  }

  .sale-search {
    display: flex;
    height: 39px;
    width: 250px;
    right: 20px;
    border-radius: 4px;
    border-style: none;
    background-color: #f5f4f4ff;
  }

  .search-btn {
    display: flex;
    height: fit-content;
    width: fit-content;
    background-color: #f5f4f4ff;
    color: #a5a4a4ff;
    align-content: center;
    justify-content: center;
    left: 320px;
    top: 1px;
    padding: 5px;
  }

  .arrow {
    display: flex;
    position: relative;
    height: 32px;
    width: 32px;
    right: 180px;
    top: 30px;
    color: #fff;
  }

  .options {
    display: flex;
    background-color: #dad7d7ff;
    height: 35px;
    font-size: 15px;
    padding: 5px;
    border: none;
    border-radius: 6px;
    font-family: ${fontStack};
  }

  .filter-space {
    display: flex;
    position: relative;
    height: fit-content;
    width: fit-content;
    justify-content: center;
    align-items: center;
    top: 22px;
    left: 450px;
  }

  .filter-select-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 85px;
    color: black;
    font-size: 15px;
    font-weight: normal;
    font-family: ${fontStack};
  }

  .search-btn:hover {
    filter: brightness(99%);
  }

  .arrow:hover {
    filter: brightness(70%);
  }

  .search-icon:hover {
    filter: brightness(70%);
  }

  /* Responsivo: abaixo de  a barra de busca deixa de ter
     largura e posicionamento fixos (pensados para uma tela de ~1440px
     ao lado do menu) e passa a quebrar linha e ocupar a largura
     disponível, sem cortar nem esticar nada. */
  @media (max-width: ${breakpoints.desktop}) {
    position: static;
    bottom: auto;
    left: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
    flex-wrap: wrap;
    row-gap: 12px;
    padding: 15px 20px;

    .search-space,
    .filter-space {
      position: static;
      top: auto;
      left: auto;
      right: auto;
    }

    .input-search,
    .sale-search,
    .output-search,
    .product-search,
    .inflow-search {
      width: 100%;
      max-width: 280px;
      right: auto;
    }

    .search-btn,
    .arrow,
    .exemp-list,
    .link {
      position: static;
      top: auto;
      left: auto;
      right: auto;
    }

    .link {
      width: auto;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    gap: 8px;

    .options {
      font-size: 13px;
    }
  }
`;

export const SalesSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  bottom: 735px;
  height: 500px;
  width: 820px;
  left: 320px;
  margin-bottom: 20px; /* espaço embaixo do último card */
  padding-bottom: 20px;
  align-items: center;

  .main-data-div {
    background-color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    height: auto;
    margin-top: 25px;
    padding: 15px 15px 0 15px;
    border-radius: 10px;
    justify-content: center;
    align-items: flex-start;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .data-div {
    display: flex;
    background-color: #dad7d7ff;
    color: black;
    width: max-content;
    height: 38px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-family: ${fontStack};
    text-align: center;
  }

  .data-div-price {
    display: flex;
    background-color: #dad7d7ff;
    color: black;
    width: max-content;
    height: 38px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-family: ${fontStack};
    text-align: center;
  }

  .data-wrap {
    display: flex;
    height: fit-content;
    margin-right: 30px;
    margin-top: 15px;
    width: fit-content;
  }

  .label {
    display: flex;
    color: black;
    right: 50px;
    width: 130px;
    font-size: 17px;
    font-family: ${fontStack};
    word-break: keep-all;
  }

  .footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    margin-top: 20px;
    padding: 12px 16px;
    border-top: 1px solid #e0e0e0;
    background-color: transparent;
  }

  .footer-actions {
    display: flex;
    gap: 10px;
    flex: 1;
  }

  .footer-confirm {
    display: flex;
    gap: 10px;
  }

  .footer button {
    height: 38px;
    padding: 0 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  .confirm-changes {
    background-color: #2563eb;
    color: white;
  }

  .cancel-changes {
    background-color: #a5a4a4;
    color: white;
  }

  .status-edit {
    background-color: #2563eb;
    color: white;
  }
  .show-items {
    background-color: #06b6d4;
    color: white;
  }

  .footer button:hover {
    filter: brightness(80%);
  }

  /* Responsivo: o painel de conteudo deixa de depender de posição e
     largura fixas e passa a ocupar 100% da largura disponível, com os
     cartões e botões quebrando linha em vez de estourar a tela. */
  @media (max-width: ${breakpoints.desktop}) {
    position: static;
    bottom: auto;
    left: auto;
    top: auto;
    right: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 70vh;
    padding: 15px;

    .main-data-div {
      width: 100%;
      height: auto;
    }

    .data-wrap,
    .data-wrap-price {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
      justify-content: space-between;
    }

    .label,
    .label-price {
      right: auto;
    }

    .buttons,
    .footer {
      margin: 15px 0 0 0;
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
    }

    .confirm-changes,
    .cancel-changes,
    .real-time-stock-btn,
    .product-stock-btn,
    .del-btn,
    .status-edit,
    .show-items {
      width: auto;
      left: auto;
      bottom: auto;
    }

    .for-empty-results {
      margin: 40px auto;
      text-align: center;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;

    .main-data-div {
      padding: 10px;
    }

    .data-div,
    .data-div-price {
      font-size: 14px;
    }
  }
`;

export const NewSale = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  bottom: 1225px;
  left: 1230px;
  height: fit-content;
  width: fit-content;

  input {
    background-color: #f5f4f4ff;
    height: 30px;
    width: 170px;
    margin-top: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid black;
  }

  .status {
    display: flex;
    position: relative;
    height: fit-content;
    width: fit-content;
    justify-content: center;
    align-items: center;
  }

  .options-status {
    display: flex;
    background-color: #dad7d7ff;
    height: 30px;
    font-size: 15px;
    padding: 5px;
    border: none;
    border-radius: 6px;
    font-family: ${fontStack};
  }

  .btn {
    display: flex;
    position: relative;
    top: 20px;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 120px;
    margin-top: 15px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .add-items-btn {
    display: flex;
    position: relative;
    top: 20px;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: fit-content;
    margin-top: 15px;
    gap: 10px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .items-icon {
    display: flex;
    color: #fff;
    height: 30px;
    width: 30px;
  }

  @media (max-width: ${breakpoints.desktop}) {
    position: static;
    bottom: auto;
    left: auto;
    top: auto;
    width: 92%;
    max-width: 320px;
    margin: 20px auto;

    input {
      width: 100%;
    }
  }
`;
