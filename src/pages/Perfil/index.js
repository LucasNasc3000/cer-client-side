/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header";
import axios from "../../services/axios";
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

        setId(employee.data.id);
        setEmail(emailStored);
      } catch (e) {
        toast.error("Erro ao tentar obter dados do funcionário");
      }
    }

    employeeSearch();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

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

  return (
    <UserContainer>
      <Header />
      <Footer />
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
