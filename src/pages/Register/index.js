/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import * as actions from "../../store/modules/auth/actions";
import { BtnRegister, Form, FormContainerRegister, Title } from "./styled";

// O input não precisa de id por estar dentro de label, que já tem o nome do campo no htmlFor
export default function Register() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [permission, setPermission] = useState("");
  const [address_allowed, setAddressAllowed] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const whiteSpaceRegex = /\s/;
    let FormErrors = false;

    if (name.length < 3 || name.length > 255) {
      FormErrors = true;
      toast.error("O nome deve ter entre 3 e 255 caracteres");
    }

    if (whiteSpaceRegex.test(name)) {
      FormErrors = true;
      toast.error("O nome não pode conter espaços em branco");
    }

    if (!isEmail(email)) {
      FormErrors = true;
      toast.error("E-mail inválido");
    }

    if (password.length < 8 || password.length > 60) {
      // eslint-disable-next-line no-unused-vars
      FormErrors = true;
      toast.error("A senha deve ter entre 6 e 50 caracteres");
    }

    if (FormErrors) return;

    dispatch(
      actions.registerRequest({
        name,
        email,
        password,
        adminpassword,
        permission,
        address_allowed,
      })
    );
  }

  return (
    <FormContainerRegister>
      <Title>Cadastrar novo funcionário</Title>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu primeiro nome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escolha um email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crie uma senha"
        />
        <input
          type="password"
          value={adminpassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Crie uma senha de administrador"
        />
        <input
          type="text"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          placeholder="Escolha uma permissão"
        />
        <input
          type="text"
          value={address_allowed}
          onChange={(e) => setAddressAllowed(e.target.value)}
          placeholder="Autorização para receber emails. Escreva y ou n"
        />
        <BtnRegister>
          <button type="submit">Criar conta</button>
        </BtnRegister>
        <Link to="/" class="login-link">
          Entrar
        </Link>
      </Form>
    </FormContainerRegister>
  );
}
