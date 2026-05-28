import styled from "styled-components";

export const ModalEditUnitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  .reason-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .notes-wrapper {
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
`;
