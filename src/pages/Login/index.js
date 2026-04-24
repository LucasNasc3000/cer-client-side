/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Title } from "./styled";

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      actions.loginRequest({
        email,
        password,
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
        <Btn>
          <button type="submit">Entrar</button>
        </Btn>
      </Form>
    </FormContainer>
  );
}
