/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { Form, UserContainer } from "./styled";

export default function Profile() {
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const nameStored = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState("");

  useEffect(() => {
    async function employeeSearch() {
      try {
        const employee = await axios.get(
          `/employees/search/email/${emailStored}`
        );

        setId(employee.data[0].id);
        setEmail(emailStored);
      } catch (e) {
        toast.error(e.response.data.error[0]);
      }
    }

    employeeSearch();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // let FormErrors = false;

    // if (name.length < 3 || name.length > 255) {
    //   FormErrors = true;
    //   toast.error("O nome deve ter entre 3 e 255 caracteres");
    // }

    // if (!isEmail(email)) {
    //   FormErrors = true;
    //   toast.error("E-mail inválido");
    // }

    // if (password.length < 8 || password.length > 60) {
    //   // eslint-disable-next-line no-unused-vars
    //   FormErrors = true;
    //   toast.error("A senha deve ter entre 6 e 50 caracteres");
    // }

    // if (FormErrors) return;

    dispatch(
      actions.updateRequest({
        id,
        name,
        email,
        password,
        adminpassword,
      })
    );

    if (email !== "" && email !== emailStored) dispatch(actions.loginFailure());
  }

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  return (
    <UserContainer>
      <Header />
      <MdLogout size={40} class="logout" onClick={(e) => handleLogout(e)} />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder={nameStored}
        />

        <input
          type="email"
          id="emailInput"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailStored}
        />

        <input
          type="password"
          className="pass"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha ou escolha uma nova"
        />

        <input
          type="password"
          className="pass"
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Digite sua senha de admin ou escolha uma nova"
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
