/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";

export const MainHeader = styled.nav`
  background-color: white;
  height: 100vh;
  position: sticky;
  top: 0;
  width: 280px;
  /* box-shadow: 2px 2px #f5f4f4ff; */
  box-shadow: 1px 1px 3px rgba(48, 48, 48, 0.5);

  .home {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
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
    color: #666565ff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 18px;
    top: 35px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .inputsCurrent {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 60px;
    width: fit-content;
    align-items: center;
    justify-content: center;
    left: 48px;
    top: 35px;
    font-size: 15px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .sales {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 12px;
    top: 35px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .outputs {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 10px;
    top: 43px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .profile {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 8px;
    top: 48px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .employees {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 45px;
    width: 165px;
    align-items: center;
    justify-content: center;
    left: 38px;
    top: 52px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .advices {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 45px;
    width: 165px;
    align-items: center;
    justify-content: center;
    left: 28px;
    top: 54px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .logout-btn {
    background-color: #a5a4a4ff;
    display: flex;
    position: relative;
    top: 120px;
    left: 63px;
    height: 45px;
    width: 105px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .dashboard-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
    margin-top: 3px;
  }

  .input-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .inpusCurrent-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .sale-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .output-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .profile-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .employee-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .home:hover {
    filter: brightness(10%);
  }

  .inputs:hover {
    filter: brightness(10%);
  }

  .inputsCurrent:hover {
    filter: brightness(10%);
  }

  .sales:hover {
    filter: brightness(10%);
  }

  .outputs:hover {
    filter: brightness(10%);
  }

  .profile:hover {
    filter: brightness(10%);
  }

  .employees:hover {
    filter: brightness(10%);
  }

  .advices:hover {
    filter: brightness(10%);
  }

  .logout-btn:hover {
    color:rgb(243, 64, 64);
  }

`;
