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
import { LineChartTotalPriceInputs } from "../../components/Charts/LineChartTotalPriceInputs";
import { PieChart } from "../../components/Charts/PieChart";
import { PieChartProductsCount } from "../../components/Charts/PieChartProductsCount";
import Header from "../../components/Header";
import axios from "../../services/axios";
import GetData from "../../services/getData";
import history from "../../services/history";
import MakingColors from "./MakingColors";
import { HomeContainer } from "./styled";

Chart.register(CategoryScale);

export default function Home() {
  const permission = useSelector((state) => state.auth.permission);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const headerid = useSelector((state) => state.auth.headerid);
  const dispatch = useDispatch();
  const [employee_id, setEmployeeId] = useState("");
  const [priceYear, setPriceYear] = useState({});
  const [setCurrentYear, setSetCurrentYear] = useState("");
  const [setYear, setSetYear] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [inputsData, setInputsData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [colorsCollection, setColorsCollection] = useState([]);
  const [dataPieChartInputs, setDataPieChartInputs] = useState({});
  const [dataPieChartSalesPC, setDataPieChartSalesPC] = useState({});
  const [priceMonths, setPriceMonths] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const [dataPriceMonthChart, setDataPriceMonthChart] = useState({});
  const [isLoadingTotalPrice, setIsLoadingTotalPrice] = useState(true);
  const [isLoadingPriceMonths, setIsLoadingPriceMonths] = useState(true);
  const [isLoadingPieChart1, setIsLoadingPieChart1] = useState(true);
  const [isLoadingPieChart2, setIsLoadingPieChart2] = useState(true);
  const [isLoadingFinal, setIsLoadingFinal] = useState(true);

  useEffect(() => {
    const PermissionCheck = () => {
      if (permission !== process.env.REACT_APP_ADMIN_ROLE) history.goBack();
    };

    PermissionCheck();
  }, [permission]);

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

  useEffect(() => {
    async function GetSalesData() {
      try {
        const sales = await GetData(
          employee_id,
          "sales",
          employee_id,
          permission
        );

        if (typeof sales === "undefined" || !sales) return;

        setSalesData(sales);
      } catch (err) {
        if (typeof err.response.data === "string") return;
        toast.error("Erro ao obter dados das vendas");
      }
    }

    GetSalesData();
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
    const allColors = [];
    const colorsInputsChart = MakingColors(inputsData);
    const colorsProductsCountChart = MakingColors(productsCount);

    allColors.push(colorsInputsChart, colorsProductsCountChart);

    setColorsCollection(allColors);
  }, [inputsData, productsCount]);

  useEffect(() => {
    function GetMonths() {
      // O ano vai ter que ser dinamico, com um select
      const priceAndMonthsRefined = [];
      const priceAndMonths = [];
      const priceAndMonthsByYear = [];

      for (let i = 1; i < 13; i++) {
        if (i >= 10) {
          priceAndMonthsRefined.push({
            month: `${i}/${setYear || setCurrentYear}`,
            prices: [],
            total: "",
          });
        } else {
          priceAndMonthsRefined.push({
            month: `0${i}/${setYear || setCurrentYear}`,
            prices: [],
            total: "",
          });
        }
      }

      if (inputsData && inputsData.length > 0) {
        inputsData.map((input) => {
          if (setYear !== "") {
            if (input.created_at.slice(0, 4) === setYear) {
              priceAndMonths.push({
                month: input.created_at[6],
                price: input.price,
              });
            }
            return;
          }

          if (input.created_at.slice(0, 4) === setCurrentYear) {
            priceAndMonths.push({
              month: input.created_at[6],
              price: input.price,
            });
          }
        });

        for (let i = 0; i < priceAndMonths.length; i++) {
          if (priceAndMonths[i].month.length === 1) {
            const withZero = `0${priceAndMonths[i].month}`;
            priceAndMonths[i].month = withZero;
          }
        }

        priceAndMonths.forEach((element) => {
          const month = parseInt(element.month, 10);

          if (priceAndMonthsRefined[month - 1]) {
            priceAndMonthsRefined[month - 1].prices.push(element.price);
          }
        });

        priceAndMonthsRefined.forEach((element) => {
          const sum = element.prices.reduce((acc, currentVal) => {
            return acc.plus(new Decimal(currentVal));
          }, new Decimal(0));

          element.total = sum.toString();

          if (element.total.length === 4) {
            const withZero = `${element.total}0`;
            element.total = withZero;
          }
        });

        setPriceMonths(priceAndMonthsRefined);
      }
    }

    GetMonths();
  }, [inputsData, setCurrentYear, setYear]);

  useEffect(() => {
    function GetYear() {
      // O ano vai ter que ser dinamico, com um select
      const priceAndYear = [];
      const priceAndYearRefined = {};

      if (inputsData && inputsData.length > 0) {
        inputsData.map((input) => {
          priceAndYear.push({
            year: input.created_at.slice(0, 4),
            price: input.price,
          });
        });
      }

      const totalPerYear = priceAndYear.reduce((acc, current) => {
        const { year, price } = current;

        const priceDecimal = new Decimal(price);

        if (acc[year]) {
          acc[year] = acc[year].plus(priceDecimal);
        } else {
          acc[year] = priceDecimal;
        }

        return acc;
      }, {});

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const year in totalPerYear) {
        priceAndYearRefined[year] = totalPerYear[year].toFixed(2);
      }

      setPriceYear(priceAndYearRefined);
    }

    GetYear();
  }, [inputsData]);

  useEffect(() => {
    function GetProducts() {
      const justProducts = [];
      const splittedCommaProducts = [];
      const withCommaElements = [];
      const withoutCommaElements = [];

      salesData.map((sale) => {
        justProducts.push(sale.products);
      });

      justProducts.forEach((element) => {
        if (element.includes(",")) {
          withCommaElements.push(element);
        } else {
          withoutCommaElements.push(element);
        }
      });

      withCommaElements.forEach((element) => {
        const separatedElements = element.split(",");
        splittedCommaProducts.push(...separatedElements);
      });

      const allProducts = withoutCommaElements.concat(splittedCommaProducts);

      const counts = {};

      allProducts.forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });

      const productCount = Object.keys(counts).map((product) => {
        return {
          count: counts[product],
          product,
        };
      });

      setProductsCount(productCount);
    }

    GetProducts();
  }, [salesData]);

  useEffect(() => {
    setDataPieChartInputs({
      labels: inputsData.map((inputData) => inputData.name),
      datasets: [
        {
          label: "Insumo",
          data: inputsData.map((inputData) => inputData.quantity),
          backgroundColor: colorsCollection[0],
          hoverOffset: 6,
        },
      ],
    });

    setIsLoadingPieChart1(false);
  }, [colorsCollection, inputsData]);

  useEffect(() => {
    setDataPieChartSalesPC({
      labels: productsCount.map((product) => product.product),
      datasets: [
        {
          label: "Quantidade",
          data: productsCount.map((count) => count.count),
          backgroundColor: colorsCollection[1],
          hoverOffset: 6,
        },
      ],
    });

    setIsLoadingPieChart2(false);
  }, [colorsCollection, productsCount]);

  useEffect(() => {
    setDataPriceMonthChart({
      labels: priceMonths.map((date) => date.month),
      datasets: [
        {
          label: "Gasto total com insumos no mês",
          data: priceMonths.map((price) => price.total),
          skipNull: true,
          maxBarThicness: 10,
          backgroundColor: ["rgba(4, 148, 170, 1)"],
          borderColor: ["rgba(4, 148, 170, 1)"],
        },
      ],
    });

    setIsLoadingPriceMonths(false);
  }, [inputsData, priceMonths]);

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear().toString();

    setSetCurrentYear(currentYear);

    if (setYear !== "") {
      setTotalPrice(priceYear[setYear]);
      return;
    }

    setTotalPrice(priceYear[setCurrentYear]);
  }, [priceYear, inputsData, setYear, setCurrentYear]);

  useEffect(() => {
    if (
      isLoadingPieChart1 &&
      isLoadingPieChart2 &&
      isLoadingTotalPrice &&
      isLoadingPriceMonths
    ) {
      setIsLoadingFinal(false);
    }
  }, [
    isLoadingPieChart1,
    isLoadingTotalPrice,
    isLoadingPriceMonths,
    isLoadingPieChart2,
  ]);

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
      {isLoadingFinal === false ? (
        <PieChart chartData={dataPieChartInputs} />
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <div className="price">
          <p className="text">Gasto total de insumos por ano</p>
          <div className="total-price">
            {totalPrice ? (
              `R$ ${totalPrice}`
            ) : (
              <p className="warn">Não há insumos registrados neste ano</p>
            )}
          </div>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
      <div className="filter-space">
        <p className="filter-select-label">Filtrar por ano: </p>
        <select
          name="search-options"
          className="options"
          id="filter-select"
          onChange={(e) => setSetYear(e.target.value)}
        >
          <option value={setCurrentYear}>{setCurrentYear}</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
      {isLoadingFinal === false ? (
        <LineChartTotalPriceInputs chartData={dataPriceMonthChart} />
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <PieChartProductsCount chartData={dataPieChartSalesPC} />
      ) : (
        <div>Carregando...</div>
      )}
    </HomeContainer>
  );
}
