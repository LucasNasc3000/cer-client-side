/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
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
  const [bossId, setBossId] = useState("");
  const [rerender, setReRender] = useState(false);
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
    async function ExecuteGetBossId() {
      const getBossId = await GetBossId(headerid, emailStored);

      if (typeof getBossId === "undefined" || !getBossId) return;

      setBossId(getBossId);
    }

    ExecuteGetBossId();
  }, [bossId, emailStored, headerid]);

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

  async function GetAdvices() {
    const advicesData = await GetData(
      employee_id,
      "advices",
      employee_id,
      permissionlStored
    );

    if (typeof advicesData === "undefined" || !advicesData) return;

    setAdvices(advicesData);
  }

  useEffect(() => {
    GetAdvices();
  }, [employee_id]);

  useEffect(() => {
    if (rerender === true) GetAdvices();
    setReRender(false);
  }, [rerender]);

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
      setReRender(true);
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
      await axios.patch(`/advices/${adviceId}`, {
        date,
        hour,
        subject,
        email_body,
        employee_id,
      });
      clearDirectExecution();
      setReRender(true);
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

  const SetInputs = (e, adviceData) => {
    e.preventDefault();

    setAdviceId(adviceData.id);
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
        setReRender(true);
      } catch (err) {
        const errors = get(err, "response.data.error", []);

        if (err) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (err && errors.length < 1) {
            toast.error("Erro desconhecido ao tentar excluir lembrete");
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
              <div className="data-div">{advice.email_body}</div>
              <div className="data-div">{advice.date}</div>
              <div className="data-div">{advice.hour}</div>
              <button
                type="button"
                className="edit-icon"
                onClick={(e) => SetInputs(e, advice)}
              >
                Editar
              </button>
              <button
                type="button"
                className="delete-icon"
                onClick={(e) => DeleteAdvice(e, advice.id, advice.subject)}
              >
                Excluir
              </button>
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
