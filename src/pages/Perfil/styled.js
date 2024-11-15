/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
// import * as colors from "../../config/colors";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;

  .logout {
    display: flex;
    position: relative;
    bottom: 710px;
    left: 1400px;
    color: #fff;
  }

  .logout:hover {
    filter: brightness(70%);
  }
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
    display: flex;
    position: relative;
    height: 40px;
    top: 50px;
    margin-top: 8px;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  .saveBtn {
    display: flex;
    position: relative;
    width: 170px;
    justify-content: center;
    top: 200px;
    left: 140px;
  }

  .minitext {
    display: flex;
    position: relative;
    color: black;
    top: 120px;
    margin-top: 10px;
  }
`;
