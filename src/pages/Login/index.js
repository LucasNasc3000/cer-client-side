/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Spinner, Title } from "./styled";

export default function Login() {
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.loginFailure());
  }, []);

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
          disabled={isLoading}
        />
        <input
          type={eyeOpen === true ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          disabled={isLoading}
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
        <Btn disabled={isLoading}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Entrar"}
          </button>
        </Btn>
      </Form>
    </FormContainer>
  );
}
