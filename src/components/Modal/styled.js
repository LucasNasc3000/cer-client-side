import styled, { keyframes } from "styled-components";
import { breakpoints } from "../../config/breakpoints";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Box = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 520px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.2s ease;
  color: black;

  .title {
    display: flex;
    width: fit-content;
  }

  /* Em telas menores que 520px o min-width fixo cortava o modal.
     Passa a ocupar quase toda a largura disponível, mantendo o mesmo visual. */
  @media (max-width: ${breakpoints.tablet}) {
    min-width: 0;
    width: 92vw;
    padding: 1.25rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 95vw;
    padding: 1rem;
  }
`;

export const CloseButton = styled.button`
  float: right;
  background: none;
  color: #a5a4a4ff;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;
