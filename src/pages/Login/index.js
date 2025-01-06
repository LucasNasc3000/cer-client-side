/* eslint-disable import/no-extraneous-dependencies */
import { get } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Title } from "./styled";

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, "location.state.prevPath", "/");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [permission, setPermission] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ação disparada que delega a responsabilidade para a função loginRequest (mesmo nome da action) no sagas, que além de
    // enviar o email e a senha, envia o caminho que o usuário estava antes de ser deslogado da aplicação.
    dispatch(
      actions.loginRequest({
        name,
        email,
        password,
        adminpassword,
        permission,
        prevPath,
      })
    );
  };

  return (
    <FormContainer>
      <Title>Login</Title>

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
        <Btn>
          <button type="submit">Entrar</button>
        </Btn>
      </Form>
    </FormContainer>
  );
}
