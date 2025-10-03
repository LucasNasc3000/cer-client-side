/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { object } from "prop-types";
import { Line } from "react-chartjs-2";
import { ChartContainer } from "./styled-linechart-totalprice-inputs";

export function LineChartTotalPriceInputs({ chartData }) {
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
                text: "Gasto total com insumos no mês",
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

LineChartTotalPriceInputs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: object.isRequired,
};
