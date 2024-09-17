/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";

export const MainHeader = styled.nav`
  background-color: #688da2;
  height: 683px;
  width: 230px;

  .home {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 50px;
    width: 230px;
    align-items: center;
    justify-content: center;
    left: 0px;
    top: 30px;
    font-size: 20px;
  }

  .inputs {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 20px;
    top: 35px;
    font-size: 20px;
  }

  .sales {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 16px;
    top: 39px;
    font-size: 20px;
  }

  .profile {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 5px;
    top: 44px;
    font-size: 20px;
  }

  .home:hover {
    filter: brightness(70%);
  }

  .inputs:hover {
    filter: brightness(70%);
  }

  .sales:hover {
    filter: brightness(70%);
  }

  .profile:hover {
    filter: brightness(70%);
  }

  .home-icon,
  .inputs-icon,
  .sales-icon,
  .profile-icon {
    margin-right: 20px;
  }
`;
