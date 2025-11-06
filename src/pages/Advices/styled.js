import styled from "styled-components";

export const AdvicesContainer = styled.div`
  display: flex;
  overflow-x: visible;
`;

export const AdvicesSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  top: 45px;
  left: 50px;
  height: 630px;
  width: 850px;

  .main-data-div {
    background-color: #4f4f4f;
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 820px;
    margin-top: 10px;
    margin-left: 15px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }

  .data-div {
    display: flex;
    flex-direction: row;
    color: black;
    padding: 6px;
    width: 170px;
    bottom: 17px;
    margin-right: 15px;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    color: white;
    font-size: 16px;
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
    text-align: center;
    line-break: auto;
  }

  .edit-icon {
    color: white;
    display: flex;
    height: 34px;
    width: fit-content;
    align-items: center;
    justify-content: center;
    padding: 12px;
    margin-right: 15px;
  }

  .delete-icon {
    color: white;
    display: flex;
    height: 34px;
    width: fit-content;
    align-items: center;
    justify-content: center;
    padding: 12px;
    margin-left: 0px;
    margin-right: 15px;
  }

  .edit-icon:hover {
    filter: brightness(80%);
  }

  .delete-icon:hover {
    filter: brightness(80%);
  }
`;

export const NewAdvice = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  top: 215px;
  left: 130px;
  height: fit-content;
  width: fit-content;

  input {
    background-color: #dcdcdc;
    height: 30px;
    width: 170px;
    margin-top: 15px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid black;
  }

  .email-body {
    display: flex;
    flex-direction: column;
    background-color: #dcdcdc;
    margin-top: 15px;
    height: 80px;
    width: 220px;
    border-top: none;
    border-left: none;
    border-right: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  .btn {
    height: 40px;
    width: 120px;
    margin-top: 15px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }
`;
