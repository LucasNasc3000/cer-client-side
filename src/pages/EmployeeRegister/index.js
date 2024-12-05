/* eslint-disable camelcase */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import * as actions from "../../store/modules/auth/actions";
import { EmployeeRegisterContainer, Form } from "./styled";

export function EmployeeRegister() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [address_allowed, setAddressAllowed] = useState("");
  const [boss, setBoss] = useState("");

  const handleSubmit = () => {
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
          value={boss}
          onChange={(e) => setBoss(e.target.value)}
          placeholder="Digite o nome do chefe"
        />
        <button type="button" className="btn" onClick={handleSubmit}>
          Adicionar Funcionário
        </button>
      </Form>
    </EmployeeRegisterContainer>
  );
}
