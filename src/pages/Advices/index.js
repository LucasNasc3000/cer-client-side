/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import { get } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import axios from "../../services/axios";
import history from "../../services/history";
import { AdvicesContainer } from "./styled";

export default function Advices({ saleData }) {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.email);
  const permissionlStored = useSelector((state) => state.auth.permission);
  const [employee_id, setEmployeeId] = useState("");
  const [advices, setAdvices] = useState([]);

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
        const errors = get(err, "response.data.error", []);

        if (err) {
          if (errors.length > 0) {
            errors.map((error) => toast.error(error));
          }

          if (err && errors.length < 1) {
            toast.error(`Erro desconhecido ao tentar obter avisos`);
          }
          return false;
        }
      }
    }

    GetAdvices();
  }, [employee_id]);

  return (
    <AdvicesContainer>
      <Header />
    </AdvicesContainer>
  );
}

Advices.defaultProps = {
  saleData: [],
};

Advices.propTypes = {
  saleData: PropTypes.array,
};
