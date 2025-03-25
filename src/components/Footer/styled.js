import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  position: relative;
  background-color: #696969;
  color: #fff;
  height: 90px;
  width: 1512px;
  left: 0px;
  align-items: center;
  justify-content: center;

  .text {
    display: flex;
    position: relative;
    bottom: 10px;
    left: 150px;
    font-weight: 100;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .link {
    display: flex;
    position: relative;
    top: 26px;
    margin-left: 10px;
    font-size: 18px;
    right: 235px;
    color: #fff;
    font-weight: 100;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .link:hover {
    border-bottom: solid #fff 0.5px;
  }
`;
