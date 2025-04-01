/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";

export const MainHeader = styled.nav`
  background-color: #4F4F4F;
  height: 750px;
  width: 250px;

  .home {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 50px;
    width: 230px;
    align-items: center;
    justify-content: center;
    left: -2px;
    top: 30px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    left: 18px;
    top: 35px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    left: 12px;
    top: 39px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .outputs {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 10px;
    top: 39px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .employees {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 45px;
    width: 165px;
    align-items: center;
    justify-content: center;
    left: 38px;
    top: 48px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .logout-btn {
    background-color: #4F4F4F;
    display: flex;
    position: relative;
    top: 83px;
    left: 63px;
    height: 45px;
    width: 105px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

  .outputs:hover {
    filter: brightness(70%);
  }

  .profile:hover {
    filter: brightness(70%);
  }

  .employees:hover {
    filter: brightness(70%);
  }

  .logout-btn:hover {
    color:rgb(243, 64, 64);
  }

  .home-icon,
  .inputs-icon,
  .sales-icon,
  .outputs-icon,
  .employees-icon,
  .logout-btn,
  .profile-icon {
    margin-right: 20px;
  }
`;
