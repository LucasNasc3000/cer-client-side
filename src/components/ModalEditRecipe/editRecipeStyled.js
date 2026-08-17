import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";

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
    height: 40px;
    border-radius: 8px;
    gap: 15px;
    margin-bottom: 10px;
  }

  .delete {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: fit-content;
    height: 35px;
    background: none;
    text-align: center;
    color: red;
    font-size: 20px;
  }

  .save {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: fit-content;
    height: 35px;
    background: none;
    text-align: center;
    color: blue;
    font-size: 20px;
  }

  .cancel {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: fit-content;
    background-color: #a5a4a4;
    color: white;
    text-align: center;
    margin-left: 10px;
  }

  .save-icon,
  .delete-icon {
    height: 20px;
    width: 25px;
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

  .cancel:hover,
  .delete:hover,
  .save:hover {
    filter: brightness(80%);
  }

  @media (max-width: ${breakpoints.mobile}) {
    .data-wrap {
      gap: 8px;
    }
  }
`;
