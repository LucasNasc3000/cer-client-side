/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { isEmail } from "validator";
import { MdLogout } from "react-icons/md";
import Header from "../../components/Header";
import { UserContainer, Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Profile() {
  const userId = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function GetUserName() {
      try {
        const userName = await axios.get(`/users/search/name/${nomeStored}`);
        setNome(userName.data[0].nome);
      } catch (e) {
        toast.error("Erro ao tentar obter o nome do usuário");
      } finally {
        setEmail(emailStored);
      }
    }
    GetUserName();
  }, [nomeStored, emailStored, userId]);

  async function handleSubmit(e) {
    e.preventDefault();
    let FormErrors = false;

    if (nome.length < 3 || nome.length > 255) {
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

    dispatch(actions.registerRequest({ userId, nome, email, password }));
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
          Mude a senha ou digite a atual para confirmar as alterações de seus
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
