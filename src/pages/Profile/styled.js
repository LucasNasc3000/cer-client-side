/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 690px;
  left: 590px;
  height: 500px;
  width: 450px;

  input {
    background-color: transparent;
    display: flex;
    position: relative;
    height: 40px;
    top: 50px;
    margin-top: 20px;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .new-pass {
    top: 50px;
  }

  .minitext-change-pass {
    top: 70px;
  }

  .minitext-current-pass {
    top: 75px;
  }

  .saveBtn {
    display: flex;
    position: relative;
    width: 170px;
    justify-content: center;
    top: 200px;
    left: 140px;
  }

  p {
    display: flex;
    position: relative;
    color: black;
    top: 190px;
    margin-top: 10px;
  }
`;
