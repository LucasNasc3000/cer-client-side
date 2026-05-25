import styled from "styled-components";

export const ProductsContainer = styled.div`
  overflow: auto;
`;

export const SearchSpace = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 120px;
  width: 1290px;
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

  .product-search {
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

  .arrow {
    display: flex;
    position: relative;
    height: 32px;
    width: 32px;
    right: 95px;
    top: 30px;
    color: #fff;
  }

  .options {
    display: flex;
    background-color: #dad7d7ff;
    height: 35px;
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
    left: 450px;
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

  .search-btn:hover {
    filter: brightness(99%);
  }

  .arrow:hover {
    filter: brightness(70%);
  }

  .search-icon:hover {
    filter: brightness(70%);
  }
`;

export const ProductsSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  bottom: 735px;
  height: 500px;
  width: 820px;
  left: 320px;
  padding: 20px;
  align-items: center;

  .main-data-div {
    background-color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 0;
    flex-shrink: 0;
    height: auto;
    margin-top: 25px;
    padding: 15px 15px 0 15px;
    border-radius: 10px;
    justify-content: center;
    align-items: flex-start;
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

  .data-div-price {
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
    margin-right: 30px;
    margin-top: 15px;
    width: fit-content;
  }

  .data-wrap-price {
    display: flex;
    margin-left: 50px;
    margin-top: 10px;
    height: fit-content;
    margin-right: 20px;
    width: fit-content;
  }

  .label-price {
    display: flex;
    color: black;
    right: 50px;
    width: 100px;
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

  .footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    margin-top: 20px;
    padding: 12px 16px;
    border-top: 1px solid #e0e0e0;
    background-color: transparent;
  }

  .footer-actions {
    display: flex;
    gap: 10px;
    flex: 1;
  }

  .footer-confirm {
    display: flex;
    gap: 10px;
  }

  .footer button {
    height: 38px;
    padding: 0 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  .confirm-changes {
    background-color: #2563eb;
    color: white;
  }

  .cancel-changes {
    background-color: #a5a4a4;
    color: white;
  }

  .add-recipe,
  .edit-recipe {
    background-color: #06b6d4;
    color: white;
  }

  .edit-unities {
    background-color: #3b82f6;
    color: white;
  }

  .footer button:hover {
    filter: brightness(80%);
  }
`;

export const NewProduct = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  bottom: 1225px;
  left: 1220px;
  height: fit-content;
  width: fit-content;

  input {
    background-color: #f5f4f4ff;
    height: 30px;
    width: 250px;
    margin-top: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid black;
  }

  .btn {
    display: flex;
    position: relative;
    top: 20px;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 120px;
    margin-top: 15px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .add-recipe-btn {
    display: flex;
    position: relative;
    top: 20px;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: fit-content;
    margin-top: 15px;
    gap: 10px;
    box-shadow: 1px 1.5px rgb(102, 96, 96);
  }

  .recipe-icon {
    display: flex;
    color: #fff;
    height: 30px;
    width: 30px;
  }
`;
