/* eslint-disable prettier/prettier */
import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { BiCabinet } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GoPackageDependents } from "react-icons/go";
import { IoBagHandle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MainHeader } from "./styledHeader";

export default function Header() {
  const permissison = useSelector((state) => state.auth.permission);

    return(
        <MainHeader>
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
            <Link to="/outputs" class="outputs">
                <GoPackageDependents size={25} class="outputs-icon" />
                Saídas
            </Link>
            <Link to="/profile" class="profile">
                <FaUser size={25} class="profile-icon" />
                Perfil
            </Link>
            {permissison === process.env.REACT_APP_ADMIN_ROLE ? (
              <Link to="/employees" class="employees">
                <FaUsers size={25} class="employees-icon" />
                Funcionários
              </Link>
            ) : (
              ""
            )}
        </MainHeader>
    );
}
