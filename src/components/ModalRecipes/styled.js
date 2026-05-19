import styled, { keyframes } from "styled-components";

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
  padding: 2rem;
  min-width: 520px;
  max-width: 90vw;
  animation: ${fadeIn} 0.2s ease;
  color: black;

  .title {
    display: flex;
    width: fit-content;
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
