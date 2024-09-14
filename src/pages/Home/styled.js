/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import * as colors from "../../config/colors";

export const HomeContainer = styled.div`
    height: 683px;
    width: 1270px;
    background-color: ${colors.primaryDarkColor};

    .logout {
        display: flex;
        position: relative;
        color: #fff;
        left: 1200px;
        bottom: 648px;
    }

    .logout:hover {
        filter: brightness(70%);
    }
`;
