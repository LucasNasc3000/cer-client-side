/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { EmployeeRegisterContainer, Form } from "./styled";

export function EmployeeRegister() {
  const dispatch = useDispatch();
  const permissionlStored = useSelector((state) => state.auth.permission);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [address_allowed, setAddressAllowed] = useState("");
  const [bossName, setBossName] = useState("");
  let boss = "";

  useEffect(() => {
    const PermissionCheck = () => {
      if (permissionlStored !== process.env.REACT_APP_ADMIN_ROLE)
        history.goBack();
    };

    PermissionCheck();
  }, [permissionlStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bossData = await axios.get(
        `/employees/search/uniquename/${bossName}`
      );

      boss = bossData.data.id;
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar obter dados do chefe");
        }
      }
    }

    dispatch(
      actions.registerRequest({
        name,
        email,
        password,
        adminpassword,
        permission,
        address_allowed,
        boss,
      })
    );

    setEmail("");
    setName("");
    setPassword("");
    setAdminPassword("");
    setAddressAllowed("");
    setPermission("");
    setBossName("");
    boss = "";
  };

  return (
    <EmployeeRegisterContainer>
      <Header />
      <Form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
        />
        <input
          type="password"
          value={adminpassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Digite a senha de administrador"
        />
        <input
          type="text"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          placeholder="Digite a permissão"
        />
        <input
          type="text"
          value={address_allowed}
          onChange={(e) => setAddressAllowed(e.target.value)}
          placeholder="Digite se o e-mail é autorizado a receber e-mails"
        />
        <input
          type="text"
          value={bossName}
          onChange={(e) => setBossName(e.target.value)}
          placeholder="Digite o nome do chefe"
        />
        <button type="button" className="btn" onClick={(e) => handleSubmit(e)}>
          Adicionar Funcionário
        </button>
      </Form>
    </EmployeeRegisterContainer>
  );
}
