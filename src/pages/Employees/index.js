import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header/index";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import {
  EmployeeCards,
  EmployeeInputs,
  EmployeesListContainer,
} from "./styled";

export function Employees() {
  const dispatch = useDispatch();

  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permission = useSelector((state) => state.auth.permission);
  const [employees, setEmployees] = useState([]);
  const [boss, setBoss] = useState("");
  const [bossEdit, setBossEdit] = useState("");
  const [permissionEdit, setPermissionEdit] = useState("");
  const [alEdit, setAlEdit] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    const PermissionCheck = () => {
      if (permission !== process.env.REACT_APP_ADMIN_ROLE) history.goBack();
    };

    PermissionCheck();
  }, []);

  useEffect(() => {
    async function getBoss() {
      try {
        const bossSearch = await axios.get(
          `/employees/search/email/${emailStored}`
        );
        setBoss(bossSearch.data.id);
      } catch (e) {
        const errors = get(e, "response.data.errors", []);

        if (e) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          } else {
            toast.error("Erro ao tentar obter os dados do chefe");
          }
        }
      }
    }

    getBoss();
  }, []);

  useEffect(() => {
    async function getEmployees() {
      try {
        const employeesSearch = await axios.get(
          `/employees/search/boss/${boss}`
        );
        setEmployees(employeesSearch.data);
      } catch (e) {
        const errors = get(e, "response.data.error", []);

        if (e) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (e && errors.length > 0) {
            toast.error("Erro ao tentar obter os dados do chefe");
          }
        }
      }
    }

    getEmployees();
  });

  const clear = (e) => {
    e.preventDefault();
    setId(0);
    setBossEdit("");
    setAlEdit("");
    setPermissionEdit("");
  };

  const employeeUpdate = (e) => {
    e.preventDefault();

    dispatch(
      actions.adminUpdateRequest({
        id,
        bossEdit,
        permissionEdit,
        alEdit,
      })
    );

    clear(e);
  };

  const SetInputs = async (e, idParam, data) => {
    e.preventDefault();

    const getBossName = await axios.get(`/employees/search/id/${data.boss}`);

    setId(idParam);
    setBossEdit(getBossName.data.name);
    setPermissionEdit(data.permission);
    setAlEdit(data.address_allowed);
  };

  const DeleteAsk = (e, email, idParamExclude) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals, no-alert
    const ask = confirm(`Deseja mesmo excluir o funcionário ${email}`);

    if (ask === true) {
      try {
        axios.put(`/employees/${idParamExclude}`, {
          is_active: 0,
        });
      } catch (err) {
        const errors = get(e, "response.data.error", []);

        if (e) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (e && errors.length > 0) {
            toast.error("Erro ao tentar obter os dados do chefe");
          }
        }
      }
    }
  };

  return (
    <EmployeesListContainer>
      <Header />
      <EmployeeCards>
        {employees.map((empData) => {
          return (
            <div className="main-data-div">
              <div key={empData.id}>
                <div className="name">{empData.name}</div>
                <FaRegEdit
                  size={25}
                  className="edit-icon"
                  onClick={(e) => SetInputs(e, empData.id, empData)}
                />
                <MdDelete
                  size={30}
                  className="del-icon"
                  onClick={(e) => DeleteAsk(e, empData.email, empData.id)}
                />
                <div className="email-label">E-mail:</div>
                <div className="email">{empData.email}</div>
                <div className="permission-label">Permissão:</div>
                <div className="permission">{empData.permission}</div>
                <div className="al-label">
                  Autorização para receber e-mails:
                </div>
                <div className="a-l">{empData.address_allowed}</div>
              </div>
            </div>
          );
        })}
      </EmployeeCards>
      <EmployeeInputs>
        <input
          type="text"
          className="permission"
          placeholder="Permissao..."
          value={permissionEdit}
          onChange={(e) => setPermissionEdit(e.target.value)}
        />
        <input
          type="text"
          className="a-l"
          placeholder="Endereço de email autorizado..."
          value={alEdit}
          onChange={(e) => setAlEdit(e.target.value)}
        />
        <input
          type="text"
          className="boss"
          placeholder="Nome do chefe..."
          value={bossEdit}
          onChange={(e) => setBossEdit(e.target.value)}
        />
        <button type="button" className="btn-cancel" onClick={clear}>
          Cancelar
        </button>
        <button
          type="button"
          className="btn"
          onClick={(e) => employeeUpdate(e)}
        >
          Salvar
        </button>
        <Link to="/employee/new" className="link">
          <FaPlus size={18} className="plus-icon" />
          Adicionar Funcionário
        </Link>
      </EmployeeInputs>
    </EmployeesListContainer>
  );
}
