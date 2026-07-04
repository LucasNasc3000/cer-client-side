/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import { breakpoints } from "../../config/breakpoints";
import { fontStack } from "../../config/fonts";

export const MainHeader = styled.nav`
  background-color: white;
  height: 750px;
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
    font-family: ${fontStack};
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
    font-family: ${fontStack};
  }

  .inputs-current {
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
    font-family: ${fontStack};
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
    font-family: ${fontStack};
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
    font-family: ${fontStack};
  }

  .products {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 50px;
    width: 170px;
    align-items: center;
    justify-content: center;
    left: 20px;
    top: 50px;
    font-size: 18px;
    font-family: ${fontStack};
  }

  .products-inflows {
    position: relative;
    display: flex;
    flex-direction: row;
    color: #666565ff;
    height: 50px;
    width: 230px;
    align-items: center;
    justify-content: center;
    left: 50px;
    top: 65px;
    font-size: 18px;
    font-family: ${fontStack};
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
    left: 5px;
    top: 77px;
    font-size: 18px;
    font-family: ${fontStack};
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
    top: 81px;
    font-size: 18px;
    font-family: ${fontStack};
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
    font-family: ${fontStack};
  }

  .logout-btn {
    background-color: #a5a4a4ff;
    display: flex;
    position: relative;
    top: 145px;
    left: 63px;
    height: 45px;
    width: 105px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    font-family: ${fontStack};
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

  .inputs-current-icon {
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

  .products-icon {
    display: flex;
    height: 25px;
    width: 25px;
    margin-right: 15px;
  }

  .products-inflows-icon {
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

  .inputs-current:hover {
    filter: brightness(10%);
  }

  .sales:hover {
    filter: brightness(10%);
  }

  .outputs:hover {
    filter: brightness(10%);
  }

  .products:hover {
    filter: brightness(10%);
  }

  .products-inflows:hover {
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

  /* ==== Responsivo: abaixo de 900px o menu vertical vira uma barra
     horizontal com rolagem, mantendo todos os itens visíveis sem cortar
     nem esticar o conteúdo. Acima de 900px o layout original é preservado. ==== */
  @media (max-width: ${breakpoints.laptop}) {
    height: auto;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 6px 10px;
    gap: 4px;
    -webkit-overflow-scrolling: touch;

    .home,
    .inputs,
    .inputs-current,
    .sales,
    .outputs,
    .products,
    .products-inflows,
    .profile,
    .employees,
    .advices {
      position: static;
      top: 0;
      left: 0;
      right: auto;
      bottom: auto;
      height: 40px;
      width: auto;
      flex: 0 0 auto;
      padding: 0 12px;
      white-space: nowrap;
      font-size: 14px;
    }

    .logout-btn {
      position: static;
      top: 0;
      left: 0;
      height: 40px;
      width: auto;
      flex: 0 0 auto;
      padding: 0 14px;
      font-size: 14px;
      margin-left: auto;
    }

    .dashboard-icon,
    .input-icon,
    .inputs-current-icon,
    .sale-icon,
    .output-icon,
    .products-icon,
    .products-inflows-icon,
    .profile-icon,
    .employee-icon {
      height: 20px;
      width: 20px;
      margin-right: 8px;
      margin-top: 0;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 6px;
    gap: 2px;

    .home,
    .inputs,
    .inputs-current,
    .sales,
    .outputs,
    .products,
    .products-inflows,
    .profile,
    .employees,
    .advices,
    .logout-btn {
      height: 36px;
      padding: 0 8px;
      font-size: 12px;
    }

    .dashboard-icon,
    .input-icon,
    .inputs-current-icon,
    .sale-icon,
    .output-icon,
    .products-icon,
    .products-inflows-icon,
    .profile-icon,
    .employee-icon {
      height: 16px;
      width: 16px;
      margin-right: 4px;
    }
  }
`;
