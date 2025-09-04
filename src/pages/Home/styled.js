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
    width: fit-content;
    bottom: 920px;
    left: 750px;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 40px;
    color: black;
    box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);
  }

  .total-price {
    display: flex;
    position: relative;
    top: 15px;
    right: 95px;
  }

  .text {
    display: flex;
    position: relative;
    font-size: 17px;
    bottom: 30px;
    left: 80px;
    width: 190px;
  }
`;
