import styled from "styled-components";

export const ModalRecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; /* âncora para o dropdown */
  width: 100%;

  .search-dropdown {
    position: absolute; /* sai do fluxo e flutua */
    top: 100%; /* começa logo abaixo do input */
    left: 0;
    width: 100%;
    background: #fff;
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

  .search-dropdown-item {
    padding: 0.6rem 1rem;
    cursor: pointer;
  }

  .search-dropdown-item:hover {
    background: #f0f0f0;
  }
`;
