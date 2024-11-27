import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/index";
import axios from "../../services/axios";
import { EmployeeCards, EmployeesListContainer } from "./styled";

export function Employees() {
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const [employees, setEmployees] = useState([]);
  const [boss, setBoss] = useState([]);

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

  return (
    <EmployeesListContainer>
      <Header />
      <EmployeeCards>
        {employees.map((empData) => {
          return (
            <div className="main-data-div">
              <div key={empData.id}>
                <div className="name">{empData.name}</div>
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
    </EmployeesListContainer>
  );
}
