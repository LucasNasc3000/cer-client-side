/* eslint-disable no-underscore-dangle */
import { BsGrid } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GoPackageDependents } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineBadge, MdOutlineUpdate } from "react-icons/md";
import { TbBaguette } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { MainHeader } from "./styledHeaderHome";

export default function HeaderHome() {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const logoutClick = confirm("Deseja mesmo sair?");

    if (logoutClick === true) {
      dispatch(actions.loginFailure());
      history.push("/");
    }
  };

  return (
    <MainHeader>
      <>
        <Link to="/home" class="home">
          <TfiDashboard className="dashboard-icon" />
          Dashboard
        </Link>
        <Link to="/inputs" class="inputs">
          <TbBaguette className="input-icon" />
          Insumos
        </Link>
        <Link to="/inputs/current" class="inputs-current">
          <MdOutlineUpdate className="inpusCurrent-icon" />
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
          <BsGrid className="product-icon" />
          Produtos
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
    </MainHeader>
  );
}
