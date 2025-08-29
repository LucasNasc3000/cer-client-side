/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import * as colors from "../../config/colors";

export const HomeContainer = styled.div`
  height: 683px;
  width: 1270px;
  background-color: ${colors.primaryDarkColor};

  .price {
    display: flex;
    position: relative;
    height: 90px;
    width: 200px;
    bottom: 600px;
    left: 400px;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 40px;
    color: black;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .text {
    display: flex;
    font-size: 15px;
    margin-bottom: 40px;
    width: 190px;
    background-color: aqua;
  }
`;
