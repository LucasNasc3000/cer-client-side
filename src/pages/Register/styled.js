/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import * as colors from "../../config/colors";

export const Title = styled.p`
  color: black;
  font-size: 20px;
  text-align: center;
  margin-left: 120px;
  margin-top: 25px;
  border-bottom: 0.5px solid black;
  width: 250px;
  padding: 5px;
`;

export const Btn = styled.button`
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  transition: all 160ms;
  width: 150px;
  margin-left: 170px;
  margin-top: 40px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 665px;
  margin-top: 30px;
  margin-left: 520px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  overflow: hidden;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  input {
    height: 40px;
    width: 340px;
    font-size: 15px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 20px;
    margin-left: 80px;
  }

  .login-link {
    display: flex;
    position: relative;
    left: 205px;
    top: 25px;
    color: black;
    width: 80px;
    align-items: center;
    justify-content: center;
    border-bottom: solid black 0.5px;
  }

  .login-link:hover {
    border-bottom: none;
  }

  &:focus {
    border: 1px solid ${colors.primaryColor};
  }
`;
