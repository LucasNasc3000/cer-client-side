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
  margin-top: 60px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 385px;
  margin-top: 130px;
  margin-left: 400px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  .register-link {
    margin-left: 180px;
    margin-top: 15px;
    color: black;
    text-align: center;
    font-size: 15px;
    width: 130px;
  }

  .register-link:hover {
    border-bottom: 0.5px solid black;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  input {
    height: 40px;
    width: 330px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 30px;
    margin-left: 80px;
  }

  &:focus {
    border: 1px solid ${colors.primaryColor};
  }
`;
