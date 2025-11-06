/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { object } from "prop-types";
import { Line } from "react-chartjs-2";
import { ChartContainer } from "./styled-linechart-totalprice-sales";

export function LineChartTotalPriceSales({ chartData }) {
  return (
    <ChartContainer>
      <div className="chart-container">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Total em vendas em cada mês",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </ChartContainer>
  );
}

LineChartTotalPriceSales.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: object.isRequired,
};
