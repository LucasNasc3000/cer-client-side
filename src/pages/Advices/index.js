/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import { AdvicesContainer, AdvicesSpace, NewAdvice } from "./styled";

export default function Advices() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissionlStored = useSelector((state) => state.auth.permission);
  const clientBirthday = useSelector(
    (state) => state.dataTransfer.clientBirthday
  );
  const clientName = useSelector((state) => state.dataTransfer.clientName);
  const phoneNumber = useSelector((state) => state.dataTransfer.phoneNumber);
  const [employee_id, setEmployeeId] = useState("");
  const [advices, setAdvices] = useState([]);
  const [adviceId, setAdviceId] = useState(0);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [subject, setSubject] = useState("");
  const [email_body, setEmailBody] = useState("");
  const emailBodyText = `Aniversário do cliente ${clientName}, de telefone ${phoneNumber} no dia ${clientBirthday}`;

  useEffect(() => {
    const PermissionCheck = () => {
      if (
        permissionlStored !== process.env.REACT_APP_ADMIN_ROLE &&
        permissionlStored !== process.env.REACT_APP_SALES &&
        permissionlStored !== process.env.REACT_APP_SOUT &&
        permissionlStored !== process.env.REACT_APP_SIOUT
      )
        history.goBack();
    };

    PermissionCheck();
  }, []);

  useEffect(() => {
    async function headerIdCheck() {
      try {
        if (!headerid || headerid === "") {
          const bossData = await axios.get(
            `/employees/search/email/${emailStored}`
          );
          setEmployeeId(bossData.data.id);
          return;
        }
        setEmployeeId(headerid);
      } catch (e) {
        toast.error("Erro ao verificar id");
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  useEffect(() => {
    async function GetAdvices() {
      try {
        const getAdvices = await axios.get(
          `/advices/search/employeeid/${employee_id}`
        );
        setAdvices(getAdvices.data);
      } catch (err) {
        if (typeof err.response.data === "string") return;

        const errors = get(err, "response.data.error", []);

        if (err) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (err && errors.length < 1) {
            toast.error(`Erro desconhecido ao tentar obter avisos`);
          }
        }
      }
    }

    GetAdvices();
  }, [employee_id]);

  useEffect(() => {
    const SaleDataCheck = () => {
      if (clientBirthday !== "" && clientName !== "" && phoneNumber !== "") {
        setSubject(`Aniversário de ${clientName}`);
        setEmailBody(emailBodyText);
      }
    };

    SaleDataCheck();
  }, [clientBirthday, clientName, phoneNumber, emailBodyText]);

  const clearDirectExecution = () => {
    setAdviceId(0);
    setDate("");
    setHour("");
    setSubject("");
    setEmailBody("");
  };

  async function AdviceRegister() {
    try {
      await axios.post("/advices", {
        date,
        hour,
        subject,
        email_body,
        employee_id,
      });
      clearDirectExecution();
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar cadastrar novo aviso");
        }
      }
    }
  }

  async function AdviceUpdate() {
    try {
      await axios.patch("/advices", {
        date,
        hour,
        subject,
        email_body,
        employee_id,
      });
      clearDirectExecution();
    } catch (err) {
      const errors = get(err, "response.data.error", []);

      if (err) {
        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }

        if (err && errors.length < 1) {
          toast.error("Erro desconhecido ao tentar atualizar novo aviso");
        }
      }
    }
  }

  const Clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const SetInputs = (e, id, adviceData) => {
    e.preventDefault();

    setAdviceId(id);
    setDate(adviceData.date);
    setHour(adviceData.hour);
    setSubject(adviceData.subject);
    setEmailBody(adviceData.email_body);
  };

  const IdVerify = (e) => {
    e.preventDefault();

    if (adviceId !== 0) {
      AdviceUpdate();
    } else {
      AdviceRegister();
    }
  };

  const DeleteAdvice = async (e, id, subjectParam) => {
    e.preventDefault();

    const ask = confirm(
      `Deseja mesmo excluir o lembrete sobre "${subjectParam}"`
    );

    if (ask === true) {
      try {
        await axios.delete(`/advices/${id}`);
      } catch (err) {
        const errors = get(err, "response.data.error", []);

        if (err) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (err && errors.length < 1) {
            toast.error("Erro desconhecido ao tentar desligar funcionário");
          }
        }
      }
    }
  };

  return (
    <AdvicesContainer>
      <Header />
      <AdvicesSpace>
        {advices.map((advice) => {
          return (
            <div key={advice.id} className="main-data-div">
              <div className="data-div">{advice.subject}</div>
              <div className="data-div">{advice.date}</div>
              <div className="data-div">{advice.hour}</div>
              <div className="edit">
                <FaEdit
                  className="edit-icon"
                  onClick={(e) => SetInputs(e, advice.id, advice)}
                />
              </div>
              <div className="edit">
                <FaTrash
                  className="edit-icon"
                  onClick={(e) => DeleteAdvice(e, advice.id, advice.subject)}
                />
              </div>
            </div>
          );
        })}
      </AdvicesSpace>
      <NewAdvice>
        <input
          type="text"
          placeholder="ex: 25-05-2025"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="ex: 13:30:22"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assunto..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          type="text"
          className="email-body"
          placeholder="Corpo do email..."
          cols={60}
          rows={70}
          value={email_body}
          onChange={(e) => setEmailBody(e.target.value)}
        />

        <button type="button" className="btn" onClick={(e) => Clear(e)}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => IdVerify(e)}>
          Adicionar
        </button>
      </NewAdvice>
    </AdvicesContainer>
  );
}
