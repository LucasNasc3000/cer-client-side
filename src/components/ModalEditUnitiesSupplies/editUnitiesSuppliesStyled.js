import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";

export const ModalEditUnitiesSuppliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  .reason-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .details-wrapper {
    display: flex;
    flex-direction: column;
    height: 150px;
    width: 300px;
    margin-top: 15px;
  }

  .buttons-wrapper {
    display: flex;
    gap: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    .details-wrapper {
      width: 100%;
    }
    .use-stock-supplies-label,
    .use-stock-supplies-label-disabled {
      width: auto;
      font-size: 13px;
    }
    .buttons-wrapper {
      flex-wrap: wrap;
    }
  }
`;
