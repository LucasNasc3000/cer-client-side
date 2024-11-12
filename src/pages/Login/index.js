/* eslint-disable import/no-extraneous-dependencies */
import { get } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmail } from "validator";

import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Title } from "./styled";

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, "location.state.prevPath", "/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [permission, setPermission] = useState("");

  /* Validação do front-end. Neste método é feita a verificação da quantidade de linhas nos inputs responsáveis
     pelo nome e senha. Já o email será validado usando a dependência isEmail. A senha aqui têm a sua validação
     tanto pela quantidade de caracteres quanto pela sua existência na base de dados, processo que acontece na API. */
  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("E-mail inválido");
    }

    if (password.length < 8 || password.length > 60) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error("Senha inválida");
    }

    if (formErrors) return;

    // Ação disparada que delega a responsabilidade para a função loginRequest (mesmo nome da action) no sagas, que além de
    // enviar o email e a senha, envia o caminho que o usuário estava antes de ser deslogado da aplicação.
    dispatch(
      actions.loginRequest({
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
          type="text"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          placeholder="Digite sua permissão"
        />
        <Btn>
          <button type="submit">Entrar</button>
        </Btn>
      </Form>
      <Link to="/register" class="register-link">
        Não tenho conta
      </Link>
    </FormContainer>
  );
}
