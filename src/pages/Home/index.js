/* eslint-disable prettier/prettier */
import React from "react";
import { MdLogout } from "react-icons/md";
import { HomeContainer } from "./styled";
import Header from "../../components/Header";

export default function Home() {
    // usar uma lista ul da proxima vez
  return(
    <HomeContainer>
        <Header />
        <MdLogout size={32} class="logout" />
    </HomeContainer>
  );
}
