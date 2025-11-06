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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineChartTotalPriceInputs } from "../../components/Charts/LineChartTotalPriceInputs/LineChartTotalPriceInputs";
import { LineChartTotalPriceSales } from "../../components/Charts/LineChartTotalPriceSales/LineChartTotalPriceSales";
import { PieChart } from "../../components/Charts/PieChartInputsNames/PieChart";
import { PieChartInputsReasons } from "../../components/Charts/PieChartInputsReasons/PieChartInputsReasons";
import { PieChartOutputsNames } from "../../components/Charts/PieChartOutputsNames/PieChartOutputsNames";
import { PieChartOutputsReasons } from "../../components/Charts/PieChartOutputsReasons/PieChartOutputsReasons";
import { PieChartProductsCount } from "../../components/Charts/PieChartProductsCount/PieChartProductsCount";
import HeaderHome from "../../components/HeaderHome";
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
  const [employee_id, setEmployeeId] = useState("");
  const [priceYear, setPriceYear] = useState({});
  const [priceYearSales, setPriceYearSales] = useState({});
  const [setCurrentYear, setSetCurrentYear] = useState("");
  const [setCurrentYearSales, setSetCurrentYearSales] = useState("");
  const [setYear, setSetYear] = useState("");
  const [setYearSales, setSetYearSales] = useState("");
  const [years, setYears] = useState([]);
  const [yearsSales, setYearsSales] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [totalPriceSales, setTotalPriceSales] = useState("");
  const [inputsData, setInputsData] = useState([]);
  const [inputsHistoryData, setInputsHistoryData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [outputsData, setOutputsData] = useState([]);
  const [colorsCollection, setColorsCollection] = useState([]);
  const [dataPieChartInputs, setDataPieChartInputs] = useState({});
  const [dataPieChartInputsRs, setDataPieChartInputsRs] = useState({});
  const [dataPieChartSalesPC, setDataPieChartSalesPC] = useState({});
  const [dataPieChartOutputs, setDataPieChartOutputs] = useState({});
  const [dataPieChartOutputsRs, setDataPieChartOutputsRs] = useState({});
  const [priceMonths, setPriceMonths] = useState([]);
  const [priceMonthsSales, setPriceMonthsSales] = useState([]);
  const [priceDay, setPriceDay] = useState("");
  const [productsCount, setProductsCount] = useState([]);
  const [outputsCount, setOutputsCount] = useState([]);
  const [reasonsCount, setReasonsCount] = useState([]);
  const [outputsReasonsCount, setOutputsReasonsCount] = useState([]);
  const [dataPriceMonthChart, setDataPriceMonthChart] = useState({});
  const [dataPriceMonthSalesChart, setDataPriceMonthSalesChart] = useState({});
  const [isLoadingTotalPrice, setIsLoadingTotalPrice] = useState(true);
  const [isLoadingTotalPriceDay, setIsLoadingTotalPriceDay] = useState(true);
  const [isLoadingPriceMonths, setIsLoadingPriceMonths] = useState(true);
  const [isLoadingPriceMonthsSales, setIsLoadingPriceMonthsSales] =
    useState(true);
  const [isLoadingTotalPriceSales, setIsLoadingTotalPriceSales] =
    useState(true);
  const [isLoadingPieChart1, setIsLoadingPieChart1] = useState(true);
  const [isLoadingPieChart2, setIsLoadingPieChart2] = useState(true);
  const [isLoadingPieChart3, setIsLoadingPieChart3] = useState(true);
  const [isLoadingPieChart4, setIsLoadingPieChart4] = useState(true);
  const [isLoadingPieChart5, setIsLoadingPieChart5] = useState(true);
  const [isLoadingRegisterYears, setIsLoadingRegisterYears] = useState(true);
  const [isLoadingRegisterYearsSales, setIsLoadingRegisterYearsSales] =
    useState(true);
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
    async function GetInputsHistoryData() {
      try {
        const inputs = await GetData(
          employee_id,
          "inputsHistory",
          employee_id,
          permission
        );

        if (typeof inputs === "undefined" || !inputs) return;

        setInputsHistoryData(inputs);
      } catch (err) {
        if (typeof err.response.data === "string") return;
        toast.error("Erro ao obter dados dos insumos");
      }
    }

    GetInputsHistoryData();
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

  useEffect(() => {
    const allColors = [];
    const colorsInputsChart = MakingColors(inputsData);
    const colorsProductsCountChart = MakingColors(productsCount);

    allColors.push(colorsInputsChart, colorsProductsCountChart);

    setColorsCollection(allColors);
  }, [inputsData, productsCount]);

  useEffect(() => {
    function GetDays() {
      const date = new Date();
      const fullDate = date.toLocaleDateString("pt-br");
      const fullDateReplaceBars = fullDate.replace(/\//g, "-");
      const pricesToday = [];

      salesData.map((sale) => {
        if (sale.date === fullDateReplaceBars) {
          const commaReplaced = sale.price.replace(",", ".");
          const decimalPrice = new Decimal(commaReplaced);
          pricesToday.push(decimalPrice.toString());
        }
      });

      const sum = pricesToday.reduce((acc, currentVal) => {
        return acc.plus(new Decimal(currentVal));
      }, new Decimal(0));

      const total = sum.toString();

      if (total.length === 4) {
        const withZero = `${total}0`;
        setPriceDay(withZero);
        return;
      }

      setPriceDay(total);
      setIsLoadingTotalPriceDay(false);
    }

    GetDays();
  }, [salesData]);

  useEffect(() => {
    function GetMonthsSales() {
      const priceAndMonthsRefined = [];
      const priceAndMonths = [];

      for (let i = 1; i < 13; i++) {
        if (i >= 10) {
          priceAndMonthsRefined.push({
            month: `${i}/${setYearSales || setCurrentYearSales}`,
            prices: [],
            total: "",
          });
        } else {
          priceAndMonthsRefined.push({
            month: `0${i}/${setYearSales || setCurrentYearSales}`,
            prices: [],
            total: "",
          });
        }
      }

      if (salesData && salesData.length > 0) {
        salesData.map((sale) => {
          if (setYearSales !== "") {
            if (sale.date.slice(6, 10) === setYearSales) {
              priceAndMonths.push({
                month: sale.date.slice(3, 5),
                price: sale.price,
              });
            }
            return;
          }

          if (sale.date.slice(6, 10) === setCurrentYearSales) {
            priceAndMonths.push({
              month: sale.date.slice(3, 5),
              price: sale.price,
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
          element.prices = element.prices.map((price) => {
            return price.replace(",", ".");
          });
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

        setPriceMonthsSales(priceAndMonthsRefined);
      }
    }

    GetMonthsSales();
  }, [salesData, setCurrentYearSales, setYearSales]);

  // Gráfico dos gastos dos insumos por mês
  useEffect(() => {
    function GetMonths() {
      const priceAndMonthsRefined = [];
      const priceAndMonths = [];

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

      if (inputsHistoryData && inputsHistoryData.length > 0) {
        inputsHistoryData.map((input) => {
          if (setYear !== "") {
            if (input.created_at.slice(0, 4) === setYear) {
              if (input.created_at[5] !== 0) {
                priceAndMonths.push({
                  month: input.created_at[5] + input.created_at[6],
                  price: input.totalprice,
                });
              } else {
                priceAndMonths.push({
                  month: input.created_at[6],
                  price: input.totalprice,
                });
              }
            }
            return;
          }

          if (input.created_at.slice(0, 4) === setCurrentYear) {
            if (input.created_at[5] !== 0) {
              priceAndMonths.push({
                month: input.created_at[5] + input.created_at[6],
                price: input.totalprice,
              });
            } else {
              priceAndMonths.push({
                month: input.created_at[6],
                price: input.totalprice,
              });
            }
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
          element.prices = element.prices.map((price) => {
            return price.replace(",", ".");
          });
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
  }, [inputsHistoryData, setCurrentYear, setYear]);

  useEffect(() => {
    function GetRegisterYearsSales() {
      const allYears = [];

      if (salesData.length > 0) {
        salesData.map((sale) => {
          allYears.push(sale.date.slice(6, 10));
        });

        const fixingDuplicatedYears = new Set(allYears);

        const fixedYears = [...fixingDuplicatedYears];

        setYearsSales(fixedYears);
        setIsLoadingRegisterYearsSales(false);
      }
    }

    GetRegisterYearsSales();
  }, [salesData]);

  useEffect(() => {
    function GetRegisterYears() {
      const allYears = [];

      if (inputsData.length > 0) {
        inputsData.map((input) => {
          allYears.push(input.created_at.slice(0, 4));
        });

        const fixingDuplicatedYears = new Set(allYears);

        const fixedYears = [...fixingDuplicatedYears];

        setYears(fixedYears);
        setIsLoadingRegisterYears(false);
      }
    }

    GetRegisterYears();
  }, [inputsData]);

  useEffect(() => {
    function GetYear() {
      // O ano vai ter que ser dinamico, com um select
      const priceAndYear = [];
      const priceAndYearRefined = {};

      if (inputsHistoryData && inputsHistoryData.length > 0) {
        inputsHistoryData.map((input) => {
          priceAndYear.push({
            year: input.created_at.slice(0, 4),
            price: input.totalprice,
          });
        });

        priceAndYear.forEach((element) => {
          // eslint-disable-next-line no-return-assign
          return (element.price = element.price.replace(",", "."));
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
  }, [inputsHistoryData]);

  useEffect(() => {
    function GetYearSales() {
      // O ano vai ter que ser dinamico, com um select
      const priceAndYear = [];
      const priceAndYearRefined = {};

      if (salesData && salesData.length > 0) {
        salesData.map((sale) => {
          priceAndYear.push({
            year: sale.date.slice(6, 10),
            price: sale.price,
          });
        });

        priceAndYear.forEach((element) => {
          // eslint-disable-next-line no-return-assign
          return (element.price = element.price.replace(",", "."));
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

      setPriceYearSales(priceAndYearRefined);
    }

    GetYearSales();
  }, [salesData]);

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
    function GetInputsReasons() {
      const reasons = [];

      inputsHistoryData.map((input) => {
        reasons.push(input.reason);
      });

      const counts = {};

      reasons.forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });

      const reasonCount = Object.keys(counts).map((reason) => {
        return {
          count: counts[reason],
          reason,
        };
      });

      setReasonsCount(reasonCount);
    }

    GetInputsReasons();
  }, [inputsHistoryData]);

  useEffect(() => {
    function GetOutputsReasons() {
      const reasons = [];

      outputsData.map((output) => {
        reasons.push(output.reason);
      });

      const counts = {};

      reasons.forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });

      const reasonCount = Object.keys(counts).map((reason) => {
        return {
          count: counts[reason],
          reason,
        };
      });

      setOutputsReasonsCount(reasonCount);
    }

    GetOutputsReasons();
  }, [outputsData]);

  useEffect(() => {
    function GetOutputsNames() {
      const outputs = [];

      outputsData.map((output) => {
        outputs.push(output.name);
      });

      const counts = {};

      outputs.forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });

      const outputCount = Object.keys(counts).map((output) => {
        return {
          count: counts[output],
          output,
        };
      });

      setOutputsCount(outputCount);
    }

    GetOutputsNames();
  }, [outputsData]);

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
    setDataPieChartInputsRs({
      labels: reasonsCount.map((reason) => reason.reason),
      datasets: [
        {
          label: "Vezes que um insumo foi registrado por este motivo",
          data: reasonsCount.map((count) => count.count),
          backgroundColor: colorsCollection[1],
          hoverOffset: 6,
        },
      ],
    });

    setIsLoadingPieChart3(false);
  }, [colorsCollection, reasonsCount]);

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
    setDataPieChartOutputsRs({
      labels: outputsReasonsCount.map((reason) => reason.reason),
      datasets: [
        {
          label: "Vezes que uma saída foi registrada por este motivo",
          data: outputsReasonsCount.map((count) => count.count),
          backgroundColor: colorsCollection[1],
          hoverOffset: 6,
        },
      ],
    });

    setIsLoadingPieChart5(false);
  }, [colorsCollection, outputsReasonsCount]);

  useEffect(() => {
    setDataPieChartOutputs({
      labels: outputsCount.map((output) => output.output),
      datasets: [
        {
          label: "Quantidade de registros de saída",
          data: outputsCount.map((count) => count.count),
          backgroundColor: colorsCollection[1],
          hoverOffset: 6,
        },
      ],
    });

    setIsLoadingPieChart4(false);
  }, [colorsCollection, outputsCount]);

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
    setDataPriceMonthSalesChart({
      labels: priceMonthsSales.map((date) => date.month),
      datasets: [
        {
          label: "Total em vendas no mês",
          data: priceMonthsSales.map((price) => price.total),
          skipNull: true,
          maxBarThicness: 10,
          backgroundColor: ["rgba(4, 148, 170, 1)"],
          borderColor: ["rgba(4, 148, 170, 1)"],
        },
      ],
    });

    setIsLoadingPriceMonthsSales(false);
  }, [salesData, priceMonthsSales]);

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear().toString();

    setSetCurrentYearSales(currentYear);

    if (setYearSales !== "") {
      setTotalPriceSales(priceYearSales[setYearSales]);
      return;
    }

    setTotalPriceSales(priceYearSales[setCurrentYearSales]);
  }, [priceYearSales, salesData, setYearSales, setCurrentYearSales]);

  useEffect(() => {
    if (totalPriceSales) {
      const replaceDot = totalPriceSales.replace(".", ",");
      setTotalPriceSales(replaceDot);
      setIsLoadingTotalPriceSales(false);
    }
  }, [totalPriceSales]);

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
    if (totalPrice) {
      const replaceDot = totalPrice.replace(".", ",");
      setTotalPrice(replaceDot);
      setIsLoadingTotalPrice(false);
    }
  }, [totalPrice]);

  useEffect(() => {
    if (
      isLoadingPieChart1 &&
      isLoadingPieChart2 &&
      isLoadingPieChart3 &&
      isLoadingPieChart4 &&
      isLoadingPieChart5 &&
      isLoadingTotalPrice &&
      isLoadingTotalPriceDay &&
      isLoadingPriceMonths &&
      isLoadingPriceMonthsSales &&
      isLoadingTotalPriceSales &&
      isLoadingRegisterYears &&
      isLoadingRegisterYearsSales
    ) {
      setIsLoadingFinal(false);
    }
  }, [
    isLoadingPieChart1,
    isLoadingTotalPrice,
    isLoadingTotalPriceDay,
    isLoadingPriceMonths,
    isLoadingPriceMonthsSales,
    isLoadingTotalPriceSales,
    isLoadingPieChart2,
    isLoadingPieChart3,
    isLoadingPieChart4,
    isLoadingPieChart5,
    isLoadingRegisterYears,
    isLoadingRegisterYearsSales,
  ]);

  return (
    <HomeContainer>
      <HeaderHome />
      {isLoadingFinal === false ? (
        <PieChart chartData={dataPieChartInputs} />
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <PieChartInputsReasons chartData={dataPieChartInputsRs} />
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <PieChartOutputsNames chartData={dataPieChartOutputs} />
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <PieChartOutputsReasons chartData={dataPieChartOutputsRs} />
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
      {isLoadingFinal === false ? (
        <div className="filter-space">
          <p className="filter-select-label">Filtrar por ano: </p>
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setSetYear(e.target.value)}
          >
            {years.map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div>Carregando...</div>
      )}

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

      {isLoadingFinal === false ? (
        <div className="price-today">
          <p className="text">Total vendido hoje</p>
          <div className="total-price">
            {priceDay ? (
              `R$ ${priceDay}`
            ) : (
              <p className="warn">Nada foi vendido hoje</p>
            )}
          </div>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <div className="price-year">
          <p className="text">Total vendido no ano</p>
          <div className="total-price">
            {totalPriceSales ? (
              `R$ ${totalPriceSales}`
            ) : (
              <p className="warn">Nada foi vendido no ano</p>
            )}
          </div>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <LineChartTotalPriceSales chartData={dataPriceMonthSalesChart} />
      ) : (
        <div>Carregando...</div>
      )}
      {isLoadingFinal === false ? (
        <div className="filter-space-sales">
          <p className="filter-select-label">Filtrar por ano: </p>
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setSetYearSales(e.target.value)}
          >
            {yearsSales.map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </HomeContainer>
  );
}
