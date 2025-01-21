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
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";
import { HomeContainer } from "./styled";

Chart.register(CategoryScale);

export default function Home() {
  const permission = useSelector((state) => state.auth.permission);
  const dispatch = useDispatch();
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const PermissionCheck = () => {
      if (permission !== process.env.REACT_APP_ADMIN_ROLE) history.goBack();
    };

    PermissionCheck();
  }, []);

  useEffect(() => {
    async function GetSalesData() {
      try {
        const data = await axios.get("/sales");
        setSalesData(data.data);
      } catch (e) {
        toast.error("Erro ao obter dados das vendas");
      }
    }

    GetSalesData();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const chartData = {
    labels: salesData.map((data) => {
      return data.data_venda;
    }),
    datasets: [
      {
        label: "Unidades vendidas",
        data: salesData.map((data) => {
          return data.unidades;
        }),
        skipNull: true,
        maxBarThicness: 10,
        backgroundColor: ["gray"],
      },
    ],
  };

  const chartDataProducts = {
    labels: salesData.map((data) => {
      return data.produto;
    }),
    datasets: [
      {
        label: "Unidades vendidas",
        data: salesData.map((data) => {
          return data.unidades;
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
      <MdLogout size={32} class="logout" onClick={(e) => handleLogout(e)} />
      <BarChart chartData={chartData} />
      <BarChartProducts chartData={chartDataProducts} />
    </HomeContainer>
  );
}
