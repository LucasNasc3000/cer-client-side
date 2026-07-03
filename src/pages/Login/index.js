/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Title } from "./styled";

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);

  const SeePassword = (e) => {
    e.preventDefault();
    setEyeOpen((prev) => {
      const nextValue = prev === false;
      return nextValue;
    });
  };

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
          type={eyeOpen === true ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <button
          type="button"
          className="eye-icon"
          onClick={(e) => SeePassword(e)}
        >
          {eyeOpen === true ? (
            <AiOutlineEye size={27} />
          ) : (
            <AiOutlineEyeInvisible size={27} />
          )}
        </button>
        <Btn>
          <button type="submit">Entrar</button>
        </Btn>
      </Form>
    </FormContainer>
  );
}
