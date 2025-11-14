/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Btn, Form, FormContainer, Title } from "./styled";

export default function MfaCode() {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ação disparada que delega a responsabilidade para a função loginRequest (mesmo nome da action) no sagas, que além de
    // enviar o email e a senha, envia o caminho que o usuário estava antes de ser deslogado da aplicação.
    dispatch(
      actions.loginRequest({
        code,
        verifyemail: "lucasnascdev@gmail.com",
      })
    );
  };

  return (
    <FormContainer>
      <Title>Digite o código de acesso</Title>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <Btn>
          <button type="submit">Entrar</button>
        </Btn>
      </Form>
    </FormContainer>
  );
}
