import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";

export const ModalAddIngredientsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  input {
    width: fit-content;
  }

  .search-wrapper {
    position: relative;
    margin-top: 10px;
    width: 100%;
  }

  .quantity-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  }

  .search-dropdown {
    position: absolute; /* sai do fluxo e flutua */
    top: 100%; /* começa logo abaixo do input */
    left: 0;
    width: 100%;
    background: #fff;
    font-size: 16x;
    color: black;
    border: 1px solid #ccc;
    border-radius: 0 0 6px 6px;
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 200px;
    overflow-y: auto; /* scroll se tiver muitos resultados */
    z-index: 10; /* fica por cima dos outros elementos */
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }

  .search-dropdown-item button {
    width: 100%;
    background: none;
    border: none;
    padding: 0.6rem 1rem;
    text-align: left;
    cursor: pointer;
  }

  .item-button {
    color: black;
    font-weight: lighter;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin-top: 8px;
    gap: 10px;
  }

  .save {
    display: flex;
    margin-top: 50px;
    margin-left: 50px;
    align-items: center;
    justify-content: center;
  }

  .supply-list-wrapper {
    max-height: 220px; /* altura máxima antes do scroll */
    overflow-y: auto; /* scroll vertical quando ultrapassar */
    overflow-x: hidden;
    width: 100%;
    margin-top: 10px;
  }

  .supply-list {
    margin-bottom: 8px;
  }

  .data-wrap {
    display: flex;
    flex-direction: row;
    background-color: #a5a4a4ff;
    align-items: center;
    height: 35px;
    border-radius: 8px;
    gap: 15px;
  }

  .delete {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    background: none;
    text-align: center;
  }

  .name {
    flex: 1;
  }

  .quantity {
    width: 60px;
    text-align: right;
  }

  .unit-type {
    width: 70px;
    text-align: center;
  }

  .use-stock-supplies {
    display: flex;
    background-color: aqua;
    height: 20px;
    width: 20px;
    margin-left: 40px;
    margin-top: 8px;
  }

  .use-stock-supplies-label {
    display: flex;
    width: 180px;
    height: fit-content;
    margin-top: 8px;
  }

  .search-dropdown-item button:hover {
    background: #f0f0f0;
  }

  .delete-icon:hover {
    filter: brightness(80%);
    transition: 0.1s ease-in-out;
  }

  @media (max-width: ${breakpoints.mobile}) {
    .use-stock-supplies-label {
      width: auto;
      font-size: 13px;
    }
    .button-wrapper {
      flex-wrap: wrap;
    }
    .save {
      margin-left: 0;
      width: 100%;
    }
  }
`;
