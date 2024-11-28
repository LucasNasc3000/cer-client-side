import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Header from "../../components/Header/index";
import axios from "../../services/axios";
import {
  EmployeeCards,
  EmployeeInputs,
  EmployeesListContainer,
} from "./styled";

export function Employees() {
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const [employees, setEmployees] = useState([]);
  const [boss, setBoss] = useState([]);
  const [bossEdit, setBossEdit] = useState("");
  const [permissionEdit, setPermissionEdit] = useState("");
  const [alEdit, setAlEdit] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    async function getBoss() {
      try {
        const bossSearch = await axios.get(
          `/employees/search/email/${emailStored}`
        );
        setBoss(bossSearch.data);
      } catch (e) {
        console.log(e);
      }
    }

    getBoss();
  });

  useEffect(() => {
    async function getEmployees() {
      try {
        const employeesSearch = await axios.get(
          `/employees/search/boss/${boss[0].id}`
        );
        setEmployees(employeesSearch.data);
      } catch (e) {
        console.log(e);
      }
    }

    getEmployees();
  });

  useEffect(() => {
    async function EmployeeUpdate() {}
  });

  const SetInputs = (e, idParam, data) => {
    e.preventDefault();

    setId(idParam);
    setBossEdit(data.boss);
    setPermissionEdit(data.permission);
    setAlEdit(data.address_allowed);
  };

  const clear = (e) => {
    e.preventDefault();
    setId(0);
    setBossEdit("");
    setAlEdit("");
    setPermissionEdit("");
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
                <MdDelete size={30} className="del-icon" />
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
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button type="button" className="btn" onClick={(e) => IdVerify(e)}>
          Salvar
        </button>
      </EmployeeInputs>
    </EmployeesListContainer>
  );
}
