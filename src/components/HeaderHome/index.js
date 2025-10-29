/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import { CiCircleCheck, CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineBadge, MdOutlineUpdate } from "react-icons/md";
import { TbBaguette } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { MainHeader } from "./styledHeaderHome";

export default function HeaderHome() {

  const permissison = useSelector((state) => state.auth.permission);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const logoutClick = confirm("Deseja mesmo sair?")

    if (logoutClick === true) {
      dispatch(actions.loginFailure());
      history.push("/");
    }

  };

    return(
        <MainHeader>
          {
            permissison === process.env.REACT_APP_ADMIN_ROLE ? (
              <>
                <Link to="/home" class="home">
                  <TfiDashboard className="dashboard-icon" />
                  Dashboard
                </Link>
                <Link to="/inputs" class="inputs">
                  <TbBaguette className="input-icon" />
                  Insumos
                </Link>
                <Link to="/inputsCurrent" class="inputsCurrent">
                  <MdOutlineUpdate className="inpusCurrent-icon" />
                  Insumos em tempo real
                </Link>
                <Link to="/sales" class="sales">
                  <HiOutlineShoppingBag className="sale-icon" />
                  Vendas
                </Link>
                <Link to="/outputs" class="outputs">
                  <CiCircleCheck className="output-icon" />
                  Saídas
                </Link>
                <Link to="/profile" class="profile">
                  <CiUser className="profile-icon" />
                  Perfil
                </Link>
                <Link to="/employees" class="employees">
                  <MdOutlineBadge className="employee-icon" />
                  Funcionários
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
          {
            permissison === process.env.REACT_APP_OUTPUTS ? (
              <>
                <Link to="/outputs" class="outputs">
                  Saídas
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
          {
            permissison === process.env.REACT_APP_INPUTS ? (
              <>
                <Link to="/inputs" class="inputs">
                  Insumos
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
          {
            permissison === process.env.REACT_APP_IOUT ? (
              <>
                <Link to="/inputs" class="inputs">
                  Insumos
                </Link>
                <Link to="/outputs" class="outputs">
                  Saídas
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
          {
            permissison === process.env.REACT_APP_SALES ? (
              <>
                <Link to="/sales" class="sales">
                  Vendas
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <Link to="/advices" class="advices">
                  Lembretes
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
          {
            permissison === process.env.REACT_APP_SOUT ? (
              <>
                <Link to="/sales" class="sales">
                  Vendas
                </Link>
                <Link to="/outputs" class="outputs">
                  Saídas
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <Link to="/advices" class="advices">
                  Lembretes
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
          {
            permissison === process.env.REACT_APP_SIOUT ? (
              <>
                <Link to="/sales" class="sales">
                  Vendas
                </Link>
                <Link to="/inputs" class="inputs">
                   Insumos
                </Link>
                <Link to="/outputs" class="outputs">
                  Saídas
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <Link to="/advices" class="advices">
                  Lembretes
                </Link>
                <button type="button" onClick={(e) => logout(e)} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              ""
            )
          }
        </MainHeader>
    );
}
