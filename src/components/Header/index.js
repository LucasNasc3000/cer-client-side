/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { MainHeader } from "./styledHeader";

export default function Header() {

  const permissison = useSelector((state) => state.auth.permission);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

    return(
        <MainHeader>
          {
            permissison === window._env_.REACT_APP_ADMIN_ROLE ? (
              <>
                <Link to="/home" class="home">
                  Dashboard
                </Link>
                <Link to="/inputs" class="inputs">
                  Insumos
                </Link>
                <Link to="/sales" class="sales">
                  Vendas
                </Link>
                <Link to="/outputs" class="outputs">
                  Saídas
                </Link>
                <Link to="/profile" class="profile">
                  Perfil
                </Link>
                <Link to="/employees" class="employees">
                  Funcionários
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
            permissison === window._env_.REACT_APP_OUTPUTS ? (
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
            permissison === window._env_.REACT_APP_INPUTS ? (
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
            permissison === window._env_.REACT_APP_IOUT ? (
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
            permissison === window._env_.REACT_APP_SALES ? (
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
            permissison === window._env_.REACT_APP_SOUT ? (
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
            permissison === window._env_.REACT_APP_SIOUT ? (
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
