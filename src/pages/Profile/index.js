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
          className="name-input"
          onChange={(e) => setName(e.target.value)}
          placeholder={nameStored}
          value={name}
        />

        <input
          type="email"
          className="email-input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailStored}
          value={email}
        />

        <p className="minitext-change-pass">Mudar senha:</p>

        <input
          type="password"
          className="new-pass"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />

        <p className="minitext-warn">
          Caso você deseje mudar seu email, por razões de segurança, será
          deslogado automáticamente e terá que fazer login denovo
        </p>

        <p className="minitext-current-pass">Digite sua senha atual:</p>

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
