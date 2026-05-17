import styled from "styled-components";

export const ModalRecipeContainer = styled.div`
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

  .supply-list {
    display: flex;
    position: relative;
    left: 180px;
    bottom: 115px;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: aqua;
    max-width: 270px;
  }

  .data-wrap {
    display: flex;
    flex-direction: row;
    background-color: red;
    align-items: center;
    gap: 15px;
  }

  .delete {
    position: relative;
    left: 70px;
  }

  .name {
    display: flex;
  }

  .quantity {
    width: fit-content;
    margin: auto;
    background-color: blanchedalmond;
  }

  .unit-type {
    display: flex;
    background-color: cadetblue;
  }

  .search-dropdown-item button:hover {
    background: #f0f0f0;
  }
`;
