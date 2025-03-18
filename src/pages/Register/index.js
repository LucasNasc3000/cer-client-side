/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Title } from "./styled";

export default function Register() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [boss, setBoss] = useState("");
  const [address_allowed, setAddressAllowed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <FormContainer>
      <Title>Cadastre-se</Title>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <input
          type="password"
          value={adminpassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Digite sua senha de administrador"
        />
        <input
          type="password"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          placeholder="Digite sua permissão"
        />
        <input
          type="text"
          value={address_allowed}
          onChange={(e) => setAddressAllowed(e.target.value)}
          placeholder="Digite se tem permissão para receber e-mails"
        />
        <input
          type="text"
          value={boss}
          onChange={(e) => setBoss(e.target.value)}
          placeholder="Digite o nome do chefe"
        />
        <Btn>
          <button type="submit">Entrar</button>
        </Btn>
        <Link to="/login" className="login-link">
          Login
        </Link>
      </Form>
    </FormContainer>
  );
}
