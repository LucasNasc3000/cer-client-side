/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { Form, UserContainer } from "./styled";

export default function Profile() {
  const userId = useSelector((state) => state.auth.user.id);
  const nameStored = useSelector((state) => state.auth.user.name);
  const emailStored = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function GetUserName() {
      try {
        const userName = await axios.get(
          `/employees/search/name/${nameStored}`
        );
        setName(userName.data[0].nome);
      } catch (e) {
        toast.error("Erro ao tentar obter o nome do usuário");
      } finally {
        setEmail(emailStored);
      }
    }
    GetUserName();
  }, [nameStored, emailStored, userId]);

  async function handleSubmit(e) {
    e.preventDefault();
    let FormErrors = false;

    if (name.length < 3 || name.length > 255) {
      FormErrors = true;
      toast.error("O nome deve ter entre 3 e 255 caracteres");
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

    dispatch(actions.registerRequest({ userId, name, email, password }));
    if (emailStored !== email) dispatch(actions.loginFailure());
  }

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  return (
    <UserContainer>
      <Header />
      <MdLogout size={30} class="logout" onClick={(e) => handleLogout(e)} />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome aqui"
        />

        <input
          type="email"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escolha um email"
        />

        <input
          type="password"
          className="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crie uma senha"
        />

        <p className="minitext">
          Caso você deseje mudar seu email, por razões de segurança, será
          deslogado automáticamente e terá que fazer login denovo
        </p>

        <p className="minitext">
          Mude as senhas ou digite a atual para confirmar as alterações de seus
          dados.
        </p>

        <button
          type="button"
          className="saveBtn"
          onClick={(e) => handleSubmit(e)}
        >
          Salvar
        </button>
      </Form>
    </UserContainer>
  );
}
