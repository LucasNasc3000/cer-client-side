import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
        toast.error("Erro ao tentar obter dados do administrador");
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
        toast.error("Erro ao tentar obter dados dos funcionários");
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
            <div key={empData.id}>
              <div>{empData.name}</div>
              <div>{empData.email}</div>
              <div>{empData.permission}</div>
            </div>
          );
        })}
      </EmployeeCards>
    </EmployeesListContainer>
  );
}
