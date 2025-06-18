/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SecretsHandler from "../../secretsHandler";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { MainHeader } from "./styledHeader";

export default function Header() {
  const getAdmin = SecretsHandler("admin");
  const getInputsAccess = SecretsHandler("inputsAccess");
  const getOutputsAccess = SecretsHandler("outputsAccess");
  const getSalesAccess = SecretsHandler("salesAccess");
  const getSalesOutputsAccess = SecretsHandler("salesOutputsAccess");
  const getInputsOutputsAccess = SecretsHandler("inputsOutputsAccess");
  const getSalesOutputsInputsAccess = SecretsHandler(
    "salesOutputsInputsAccess"
  );

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
            permissison === getAdmin ? (
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
            permissison === getOutputsAccess ? (
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
            permissison === getInputsAccess ? (
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
            permissison === getInputsOutputsAccess ? (
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
            permissison === getSalesAccess ? (
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
            permissison === getSalesOutputsAccess? (
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
            permissison === getSalesOutputsInputsAccess ? (
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
