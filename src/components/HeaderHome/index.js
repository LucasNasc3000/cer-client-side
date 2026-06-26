/* eslint-disable no-underscore-dangle */
import { BsGrid } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
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
import { MainHeader } from "./styledHeaderHome";

export default function HeaderHome() {
  const emailStored = useSelector((state) => state.auth.emailHeaders);

  const dispatch = useDispatch();

  const logout = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const logoutClick = confirm("Deseja mesmo sair?");

    if (logoutClick === true) {
      await axios.post("/auth/logout", { email: emailStored });

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
        <Link to="/inputs/history" class="inputs">
          <TbBaguette className="input-icon" />
          Insumos
        </Link>
        <Link to="/inputs/current" class="inputs-current">
          <MdOutlineUpdate className="input-current-icon" />
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
        <button type="button" onClick={(e) => logout(e)} className="logout-btn">
          Sair
        </button>
      </>
    </MainHeader>
  );
}
