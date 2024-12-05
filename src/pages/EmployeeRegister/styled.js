import styled from "styled-components";
import * as colors from "../../config/colors";

export const EmployeeRegisterContainer = styled.div`
  display: flex;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  height: 630px;
  width: 450px;
  margin-left: 390px;
  margin-top: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  input {
    height: 40px;
    width: 330px;
    font-size: 13px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 30px;
    margin-left: 50px;
  }

  &:focus {
    border: 1px solid ${colors.primaryColor};
  }

  .btn {
    display: flex;
    margin-top: 75px;
    margin-left: 40px;
    justify-content: center;
    width: 350px;
  }
`;
