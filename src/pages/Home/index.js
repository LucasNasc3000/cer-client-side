/* eslint-disable prettier/prettier */
import React from "react";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";
import { IoBagHandle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { HomeContainer, Header } from "./styled";

export default function Home() {
    // usar uma lista ul da proxima vez
  return(
    <HomeContainer>
        <Header>
            <Link to="/home" class="home">
            <AiFillDashboard size={25} class="home-icon" />
                Dashboard
            </Link>
            <Link to="/inputs" class="inputs">
                <BiCabinet size={25} class="inputs-icon" />
                Insumos
            </Link>
            <Link to="/sales" class="sales">
                <IoBagHandle size={25} class="sales-icon" />
                Vendas
            </Link>
            <Link to="/profile" class="profile">
                <FaUser size={25} class="profile-icon" />
                Perfil
            </Link>
        </Header>
        <MdLogout size={32} class="logout" />
    </HomeContainer>
  );
}
