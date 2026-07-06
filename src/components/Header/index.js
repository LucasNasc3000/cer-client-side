/* eslint-disable no-underscore-dangle */
import { BsGrid } from "react-icons/bs";
import { CiCircleCheck, CiUser } from "react-icons/ci";
import { GoPackageDependents } from "react-icons/go";
import { HiOutlineInboxArrowDown, HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineUpdate } from "react-icons/md";
import { TbBaguette } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { MainHeader } from "./styledHeader";

export default function Header() {
  const permissions = useSelector((state) => state.auth.permissions);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const onlyPermissions = [];
  const dispatch = useDispatch();

  permissions.map((p) => onlyPermissions.push(p.resource));

  const logout = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const logoutClick = confirm("Deseja mesmo sair?");

    if (logoutClick === true) {
      try {
        await axios.post("/auth/logout", { email: emailStored });
        history.push("/");
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <MainHeader>
      {onlyPermissions.includes("EMPLOYEES") ? (
        <>
          <Link to="/home" class="home">
            <TfiDashboard className="dashboard-icon" />
            Dashboard
          </Link>
          <Link to="/inputs/history" class="inputs">
            <TbBaguette className="input-icon" />
            Insumos
          </Link>
          <Link to="/inputs/current" class="inputs-current">
            <MdOutlineUpdate className="inputs-current-icon" />
            Insumos em tempo real
          </Link>
          <Link to="/sales" class="sales">
            <HiOutlineShoppingBag className="sale-icon" />
            Vendas
          </Link>
          <Link to="/outputs" class="outputs">
            <GoPackageDependents className="output-icon" />
            Saídas
          </Link>
          <Link to="/products" class="products">
            <BsGrid className="products-icon" />
            Produtos
          </Link>
          <Link to="/products/inflows" class="products-inflows">
            <HiOutlineInboxArrowDown className="products-inflows-icon" />
            Atualizações de produtos
          </Link>
          <Link to="/profile" class="profile">
            <CiUser className="profile-icon" />
            Perfil
          </Link>
          {/* <Link to="/employees" class="employees">
                  <MdOutlineBadge className="employee-icon" />
                  Funcionários
                </Link> */}
          <button
            type="button"
            onClick={(e) => logout(e)}
            className="logout-btn"
          >
            Sair
          </button>
        </>
      ) : (
        ""
      )}
      {!onlyPermissions.includes("EMPLOYEES")
        ? onlyPermissions.map((p) => {
            return (
              <>
                {p === "SUPPLIES" ? (
                  <>
                    <Link to="/inputs/history" class="inputs">
                      <TbBaguette className="input-icon" />
                      Insumos
                    </Link>
                    <Link to="/inputs/current" class="inputs-current">
                      <MdOutlineUpdate className="inputs-current-icon" />
                      Insumos em tempo real
                    </Link>
                  </>
                ) : (
                  ""
                )}
                {p === "OUTFLOWS" ? (
                  <Link to="/outputs" class="outputs">
                    <CiCircleCheck className="output-icon" />
                    Saídas
                  </Link>
                ) : (
                  ""
                )}
                {p === "SALES" ? (
                  <Link to="/sales" class="sales">
                    <HiOutlineShoppingBag className="sale-icon" />
                    Vendas
                  </Link>
                ) : (
                  ""
                )}
                {p === "PRODUCTS" ? (
                  <>
                    <Link to="/products" class="products">
                      <HiOutlineShoppingBag className="product-icon" />
                      Produtos
                    </Link>
                    <Link to="/products/inflows" class="products-inflows">
                      <HiOutlineInboxArrowDown className="products-inflows-icon" />
                      Atualizações de produtos
                    </Link>
                  </>
                ) : (
                  ""
                )}
                <Link to="/profile" class="profile">
                  <CiUser className="profile-icon" />
                  Perfil
                </Link>

                <button
                  type="button"
                  onClick={(e) => logout(e)}
                  className="logout-btn"
                >
                  Sair
                </button>
              </>
            );
          })
        : ""}
    </MainHeader>
  );
}
