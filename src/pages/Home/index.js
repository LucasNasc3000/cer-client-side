/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BarChart } from "../../components/Charts/BarChart";
import { BarChartProducts } from "../../components/Charts/BarChartProducts";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetData from "../../services/getData";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { HomeContainer } from "./styled";

Chart.register(CategoryScale);

export default function Home() {
  const permission = useSelector((state) => state.auth.permission);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const headerid = useSelector((state) => state.auth.headerid);
  const dispatch = useDispatch();
  const [employee_id, setEmployeeId] = useState("");
  const [outputsData, setOutputsData] = useState([]);

  useEffect(() => {
    const PermissionCheck = () => {
      if (permission !== process.env.REACT_APP_ADMIN_ROLE) history.goBack();
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
      } catch (err) {
        toast.error("Erro ao verificar id");
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  useEffect(() => {
    async function GetOutputsData() {
      try {
        const outputs = await GetData(
          employee_id,
          "outputs",
          employee_id,
          permission
        );

        if (typeof outputs === "undefined" || !outputs) return;

        setOutputsData(outputs);
      } catch (err) {
        if (typeof err.response.data === "string") return;
        toast.error("Erro ao obter dados das saídas");
      }
    }

    GetOutputsData();
  }, [employee_id, permission]);

  function DaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function GetDates() {
    const dates = [];
    const date = new Date();
    const month = date.toLocaleDateString("pt-br", {
      month: "2-digit",
    });
    const year = date.toLocaleDateString("pt-br", {
      year: "numeric",
    });
    const daysInMonth = DaysInMonth(month, year);

    for (let i = 0; i < daysInMonth + 1; i++) {
      dates.push(String(`${i}-${month}`));
    }

    for (let i = 0; i < 10; i++) {
      dates[i] = `0${i}-${month}`;
    }

    dates.shift();

    return dates;
  }

  async function SearchForSalesByDates() {
    try {
      const dates = GetDates();
      const sales = [];

      for (let i = 0; i < dates.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const getSalesByDates = await axios.post(`/sales/search/date`, {
          employeeidBody: employee_id,
          forDashboard: true,
        });

        sales.push(getSalesByDates.data);
      }

      return sales;
    } catch (err) {
      if (typeof err.response.data === "string") return;
      toast.error("Erro ao obter vendas nas datas especificadas");
    }
  }

  // eslint-disable-next-line no-unused-vars
  const chartData = {
    labels: GetDates(),
    datasets: [
      {
        label: "Vendas realizadas neste dia",
        data: SearchForSalesByDates(),
        skipNull: true,
        maxBarThicness: 10,
        backgroundColor: ["gray"],
      },
    ],
  };

  const chartDataProducts = {
    labels: outputsData.map((data) => {
      return data.name;
    }),
    datasets: [
      {
        label: "Saídas por unidade (total)",
        data: outputsData.map((data) => {
          return data.unities;
        }),
        skipNull: true,
        maxBarThicness: 10,
        backgroundColor: ["gray"],
      },
    ],
  };

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/");
  };

  return (
    <HomeContainer>
      <Header />
      <MdLogout size={39} class="logout" onClick={(e) => handleLogout(e)} />
      <BarChart chartData={chartData} />
      <BarChartProducts chartData={chartDataProducts} />
    </HomeContainer>
  );
}
