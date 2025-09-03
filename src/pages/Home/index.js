/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PieChart } from "../../components/Charts/PieChart";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetData from "../../services/getData";
import history from "../../services/history";
import { HomeContainer } from "./styled";

Chart.register(CategoryScale);

export default function Home() {
  const permission = useSelector((state) => state.auth.permission);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const headerid = useSelector((state) => state.auth.headerid);
  const dispatch = useDispatch();
  const [employee_id, setEmployeeId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [prices, setPrices] = useState([]);
  const [outputsData, setOutputsData] = useState([]);
  const [inputsData, setInputsData] = useState([]);
  const [datesAndLength, setDatesAndLength] = useState([]);
  const [colorsCollection, setColorsCollection] = useState([]);
  const [dataPieChart, setDataPieChart] = useState({});
  const [dataForPriceAndMonth, setDataForPriceAndMonth] = useState({});
  const [priceMonths, setPriceMonths] = useState([]);
  const [dataPriceMonthChart, setDataPriceMonthChart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  // useEffect(() => {
  //   async function GetOutputsData() {
  //     try {
  //       const outputs = await GetData(
  //         employee_id,
  //         "outputs",
  //         employee_id,
  //         permission
  //       );

  //       if (typeof outputs === "undefined" || !outputs) return;

  //       setOutputsData(outputs);
  //     } catch (err) {
  //       if (typeof err.response.data === "string") return;
  //       toast.error("Erro ao obter dados das saídas");
  //     }
  //   }

  //   GetOutputsData();
  // }, [employee_id, permission]);

  useEffect(() => {
    async function GetInputsData() {
      try {
        const inputs = await GetData(
          employee_id,
          "inputs",
          employee_id,
          permission
        );

        if (typeof inputs === "undefined" || !inputs) return;

        setInputsData(inputs);
      } catch (err) {
        if (typeof err.response.data === "string") return;
        toast.error("Erro ao obter dados dos insumos");
      }
    }

    GetInputsData();
  }, [employee_id, permission]);

  // function DaysInMonth(month, year) {
  //   return new Date(year, month, 0).getDate();
  // }

  // function GetDates() {
  //   const dates = [];
  //   const date = new Date();
  //   const month = date.toLocaleDateString("pt-br", {
  //     month: "2-digit",
  //   });
  //   const year = date.toLocaleDateString("pt-br", {
  //     year: "numeric",
  //   });
  //   const daysInMonth = DaysInMonth(month, year);

  //   for (let i = 0; i < daysInMonth + 1; i++) {
  //     dates.push(String(`${i}-${month}-${year}`));
  //   }

  //   for (let i = 0; i < 10; i++) {
  //     dates[i] = `0${i}-${month}-${year}`;
  //   }

  //   dates.shift();

  //   return dates;
  // }

  // useEffect(() => {
  //   async function SearchForSalesByDates() {
  //     try {
  //       const dates = GetDates();
  //       const preDatesAndLength = [];

  //       for (let i = 0; i < dates.length; i++) {
  //         // eslint-disable-next-line no-await-in-loop
  //         const getSalesByDates = await axios.post(`/sales/search/date`, {
  //           saledateBody: dates[i],
  //           forDashboard: true,
  //         });

  //         preDatesAndLength.push({
  //           date: dates[i],
  //           salesNumber: getSalesByDates.data,
  //         });
  //       }

  //       setDatesAndLength(preDatesAndLength);
  //     } catch (err) {
  //       if (typeof err.response.data === "string") return;
  //       toast.error("Erro ao obter vendas nas datas especificadas");
  //     }
  //   }

  //   SearchForSalesByDates();
  // }, [employee_id]);

  useEffect(() => {
    function GetColors(r, g, b) {
      return `rgb(${r}, ${g}, ${b})`;
    }

    function RandomNumber(min, max) {
      if (min < 0) return "The min is 0";

      if (max > 255) return "The max is 255";

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function MakingColors() {
      const toColorsCollection = [];

      for (let i = 0; i < inputsData.length; i++) {
        let r = RandomNumber(0, 255);
        let g = RandomNumber(0, 255);
        let b = RandomNumber(0, 255);

        let colors = GetColors(r, g, b);
        toColorsCollection.push(colors);
      }

      setColorsCollection(toColorsCollection);
      setIsLoading(false);
    }

    MakingColors();
  }, [inputsData]);

  useEffect(() => {
    function GetMonths() {
      const pricesInMonth = [];
      const priceAndMonths = [];

      if (inputsData && inputsData.length > 0) {
        const data = inputsData.map((input) => {
          for (let i = 0; i < 12; i++) {
            const months = [];

            const isolatedMonth = input.find(
              (inputCreatedAt) =>
                parseInt(inputCreatedAt.created_at[6], 10) === i
            );

            months.push(isolatedMonth.price);

            console.log(isolatedMonth);

            const sum = months.reduce((acc, currentVal) => {
              return acc.plus(new Decimal(currentVal));
            }, new Decimal(0));

            pricesInMonth.push(sum.toString());
          }

          for (let i = 0; i < 12; i++) {
            priceAndMonths.push({
              month: i,
              totalPrice: pricesInMonth[i],
            });
          }
        });
      }

      for (let i = 0; i < 12; i++) {
        priceAndMonths.push({
          month: i,
          totalPrice: pricesInMonth[i],
        });
      }

      priceAndMonths.map((element) => {
        if (element.month.length === 1) {
          const withZero = `0${element.month}`;
          // eslint-disable-next-line no-param-reassign
          element.month = withZero;
        }
      });

      priceAndMonths.map((element) => {
        // eslint-disable-next-line no-param-reassign
        element.month = `${element.month}/2025`;
      });
    }

    GetMonths();
  }, [inputsData]);

  useEffect(() => {
    function FillTheChart() {
      setDataPieChart({
        labels: inputsData.map((inputData) => inputData.name),
        datasets: [
          {
            label: "Insumo",
            data: inputsData.map((inputData) => inputData.quantity),
            backgroundColor: colorsCollection,
            hoverOffset: 6,
          },
        ],
      });
    }

    FillTheChart();
  }, [colorsCollection, inputsData]);

  useEffect(() => {
    setDataPriceMonthChart({
      labels: priceMonths.map((date) => date.month),
      datasets: [
        {
          label: "Gasto total com insumos no mês",
          data: priceMonths.map((price) => price.price),
          skipNull: true,
          maxBarThicness: 10,
          backgroundColor: ["rgb(48, 48, 48)"],
        },
      ],
    });
  }, [inputsData, priceMonths]);

  useEffect(() => {
    const inputsPrices = inputsData.map((input) => input.price);
    setPrices(inputsPrices);
  }, [inputsData]);

  useEffect(() => {
    if (prices.length > 0) {
      const sumOfPrices = prices.reduce((acc, currentVal) => {
        return acc.plus(new Decimal(currentVal));
      }, new Decimal(0));

      const priceToString = sumOfPrices.toString();

      if (priceToString.length === 3) {
        setTotalPrice(`${priceToString}0`);
        return;
      }

      setTotalPrice(sumOfPrices.toString());
    }
  }, [prices, totalPrice, inputsData]);

  // const chartDataProducts = {
  //   labels: outputsData.map((data) => {
  //     return data.name;
  //   }),
  //   datasets: [
  //     {
  //       label: "Saídas por unidade (total)",
  //       data: outputsData.map((data) => {
  //         return data.unities;
  //       }),
  //       skipNull: true,
  //       maxBarThicness: 10,
  //       backgroundColor: ["gray"],
  //     },
  //   ],
  // };

  return (
    <HomeContainer>
      <Header />
      {isLoading === false ? (
        <PieChart chartData={dataPieChart} />
      ) : (
        <div>Carregando...</div>
      )}
      <div className="price">
        <p className="text">Gasto total de insumos</p>
        {totalPrice}
      </div>
    </HomeContainer>
  );
}
