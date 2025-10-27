import styled from "styled-components";

export const EmployeesListContainer = styled.div`
  height: 740px;
  /* overflow: auto; */
`;

export const SearchSpace = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 120px;
  width: 1280px;
  bottom: 750px;
  left: 250px;

  .search-space {
    display: flex;
    position: relative;
    background-color: #f5f4f4ff;
    height: fit-content;
    width: fit-content;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    left: 360px;
    top: 20px;
    border-bottom: 1px solid black;
  }

  .input-search {
    display: flex;
    height: 39px;
    width: 250px;
    right: 20px;
    border-radius: 4px;
    border-style: none;
    background-color: #f5f4f4ff;
  }

  .search-btn {
    display: flex;
    height: fit-content;
    width: fit-content;
    background-color: #f5f4f4ff;
    color: #a5a4a4ff;
    align-content: center;
    justify-content: center;
    left: 320px;
    top: 1px;
    padding: 5px;
  }

  .exemp-list {
    display: flex;
    position: relative;
    height: 35px;
    width: 190px;
    left: 750px;
    top: 24px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .arrow {
    display: flex;
    position: relative;
    height: 32px;
    width: 32px;
    right: 370px;
    top: 30px;
    color: #fff;
  }

  .options {
    display: flex;
    background-color: #dad7d7ff;
    height: 35px;
    width: 161px;
    font-size: 15px;
    padding: 5px;
    border: none;
    border-radius: 6px;
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

  .filter-space {
    display: flex;
    position: relative;
    height: fit-content;
    width: fit-content;
    justify-content: center;
    align-items: center;
    top: 22px;
    left: 250px;
  }

  .filter-select-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 85px;
    color: black;
    font-size: 15px;
    font-weight: normal;
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
    width: 230px;
    height: 35px;
    top: 72px;
    left: 262px;
    background-color: #a5a4a4ff;
    color: #fff;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    justify-content: space-between;
  }

  .plus-icon {
    display: flex;
    margin-right: 10px;
  }

  .search-btn:hover {
    filter: brightness(99%);
  }

  .arrow:hover {
    filter: brightness(70%);
  }

  .search-icon:hover {
    filter: brightness(80%);
  }

  .link:hover {
    filter: brightness(80%);
  }
`;

// export const EmployeeInputs = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   bottom: 1230px;
//   left: 1130px;
//   width: 350px;
//   height: 600px;

//   input {
//     background-color: #dcdcdc;
//     width: 220px;
//     height: 36px;
//     margin-top: 15px;
//     margin-left: 70px;
//     border-style: none;
//     border-bottom: 0.5px solid black;
//   }

//   button {
//     margin-top: 10px;
//     margin-left: 80px;
//     width: 200px;
//     box-shadow: 1px 1.5px rgb(102, 96, 96);
//   }

//   .btn-cancel {
//     margin-top: 45px;
//   }

//   .link {
//     display: flex;
//     width: 230px;
//     height: 35px;
//     margin-top: 10px;
//     margin-left: 65px;
//     background-color: ${colors.primaryColor};
//     color: #fff;
//     border-radius: 4px;
//     padding: 10px 20px;
//     font-size: 15px;
//     font-weight: bold;
//     justify-content: space-between;
//   }

//   .link:hover {
//     filter: brightness(70%);
//     transition: all 160ms;
//   }
// `;

export const EmployeeCards = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 740px;
  left: 295px;
  width: 1220px;
  height: 585px;
  overflow-y: auto;
  padding: 20px;
  align-items: center;

  .for-empty-results {
    display: flex;
    font-size: 20px;
    margin-left: 370px;
    margin-top: 150px;
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
    color: #a5a4a4ff;
  }

  .main-data-div {
    background-color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    height: 300px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .data-div {
    display: flex;
    background-color: #dad7d7ff;
    color: black;
    width: max-content;
    height: 38px;
    border-radius: 8px;
    border: none;
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
  }

  .data-wrap {
    display: flex;
    height: fit-content;
    margin-right: 20px;
    margin-top: 15px;
    width: fit-content;
  }

  .label {
    display: flex;
    color: black;
    right: 50px;
    width: 130px;
    font-size: 17px;
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
    word-break: keep-all;
  }

  .buttons {
    display: flex;
    margin-top: 40px;
    margin-right: 150px;
    margin-left: 120px;
    gap: 20px;
    width: fit-content;
    font-weight: 400;
    font-size: 15px;
  }

  .confirm-changes {
    display: flex;
    background-color: #a5a4a4ff;
    width: 180px;
    justify-content: center;
    font-weight: 400;
    font-size: 15px;
  }

  .cancel-changes {
    display: flex;
    background-color: #a5a4a4ff;
    width: 180px;
    justify-content: center;
    font-weight: 400;
    font-size: 15px;
  }

  .del-btn {
    display: flex;
    color: red;
    width: fit-content;
    width: 140px;
    justify-content: center;
    font-weight: 400;
    font-size: 15px;
    margin-left: 30px;
  }

  .edit-icon:hover {
    filter: brightness(70%);
  }

  .del-icon:hover {
    filter: brightness(70%);
  }
`;
