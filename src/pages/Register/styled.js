/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import * as colors from "../../config/colors";

export const Title = styled.p`
  color: black;
  font-size: 20px;
  text-align: center;
  margin-left: 170px;
  margin-top: 25px;
  border-bottom: 0.5px solid black;
  width: 250px;
`;

export const BtnRegister = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  transition: all 160ms;
  width: 350px;
  margin-left: 120px;
  margin-top: 60px;
`;

export const FormContainerRegister = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 460px;
  margin-top: 90px;
  margin-left: 330px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  input {
    height: 40px;
    width: 430px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 30px;
    margin-left: 80px;
  }

  .login-link {
    margin-left: 270px;
    margin-top: 15px;
    color: black;
    text-align: center;
    font-size: 15px;
    width: 50px;
  }

  .login-link:hover {
    border-bottom: 0.5px solid black;
  }

  &:focus {
    border: 1px solid ${colors.primaryColor};
  }
`;
