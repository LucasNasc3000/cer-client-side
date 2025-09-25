/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { BarChart } from "../../components/Charts/BarChart";
import { BarChartProducts } from "../../components/Charts/BarChartProducts";
import Header from "../../components/Header";
import axios from "../../services/axios";
import { HomeContainer } from "./styled";

Chart.register(CategoryScale);

export default function Home() {
  const [salesData, setSalesData] = useState([]);

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
    labels: salesData.map((data) => {return data.data_venda}),
    datasets: [
      {
        label: "Unidades vendidas",
        data: salesData.map((data) => {return data.unidades}),
        skipNull: true,
        maxBarThicness: 10,
        backgroundColor: [
          "gray"
        ],
      },
    ],
  };

  const chartDataProducts = {
    labels: salesData.map((data) => {return data.produto}),
    datasets: [
      {
        label: "Unidades vendidas",
        data: salesData.map((data) => {return data.unidades}),
        skipNull: true,
        maxBarThicness: 10,
        backgroundColor: [
          "gray"
        ],
      },
    ],
  };

  return(
    <HomeContainer>
      <Header />
      <MdLogout size={32} class="logout" />
      <BarChart chartData={chartData} />
      <BarChartProducts chartData={chartDataProducts} />
    </HomeContainer>
  );
}
