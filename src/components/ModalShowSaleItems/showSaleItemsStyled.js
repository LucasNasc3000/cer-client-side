import styled from "styled-components";

export const ModalShowSaleItemsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  .items-list-wrapper {
    max-height: 220px; /* altura máxima antes do scroll */
    overflow-y: auto; /* scroll vertical quando ultrapassar */
    overflow-x: hidden;
    width: 100%;
    margin-top: 10px;
  }

  .items-list {
    margin-bottom: 8px;
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
