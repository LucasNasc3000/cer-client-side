/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import * as actions from "../../store/modules/auth/actions";
import { Form, UserContainer } from "./styled";

export default function Profile() {
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const nameStored = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function HandleSubmit(e) {
    e.preventDefault();

    if (!password) {
      toast.error("A senha atual é obrigatória para atualizar dados");
      return;
    }

    dispatch(
      actions.updateRequest({
        name,
        email,
        currentPassword: password,
        newPassword,
      })
    );

    if (email !== "" && email !== emailStored) dispatch(actions.loginFailure());
  }

  return (
    <UserContainer>
      <Header />
      <Form onSubmit={(e) => HandleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder={nameStored}
          value={name}
        />

        <input
          type="email"
          id="emailInput"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailStored}
          value={email}
        />

        <p className="minitext">Mudar senha:</p>

        <input
          type="password"
          className="pass"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          value={newPassword}
        />

        <p className="minitext">
          Caso você deseje mudar seu email, por razões de segurança, será
          deslogado automáticamente e terá que fazer login denovo
        </p>

        <p className="minitext">Digite sua senha atual:</p>

        <input
          type="password"
          className="pass"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          type="button"
          className="saveBtn"
          onClick={(e) => HandleSubmit(e)}
        >
          Salvar
        </button>
      </Form>
    </UserContainer>
  );
}
