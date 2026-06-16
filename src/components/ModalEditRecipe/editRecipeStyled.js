import styled from "styled-components";

export const ModalEditRecipeContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  .ingredient-list-wrapper {
    max-height: 220px; /* altura máxima antes do scroll */
    overflow-y: auto; /* scroll vertical quando ultrapassar */
    overflow-x: hidden;
    width: 100%;
    margin-top: 10px;
  }

  .data-wrap {
    display: flex;
    flex-direction: row;
    background-color: #a5a4a4ff;
    align-items: center;
    height: 35px;
    border-radius: 8px;
    gap: 15px;
    margin-bottom: 10px;
  }

  .name {
    flex: 1;
  }

  .quantity {
    width: 60px;
    text-align: right;
  }

  .price-at-sale {
    width: 70px;
    text-align: center;
  }
`;
