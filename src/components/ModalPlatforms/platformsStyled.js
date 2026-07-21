import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";

export const ModalPlatformsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  .platform-list-wrapper {
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

  .delete,
  .save {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    text-align: center;
    padding: 10px;
    background: none;
  }

  .cancel {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: fit-content;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    margin-left: 10px;
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

  .delete:hover {
    color: red;
  }

  .save:hover {
    color: blue;
  }

  .cancel:hover {
    color: gray;
  }

  @media (max-width: ${breakpoints.mobile}) {
    .data-wrap {
      gap: 8px;
    }
  }
`;
