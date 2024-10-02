/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { object } from "prop-types";
import { Bar } from "react-chartjs-2";
import { ChartContainer } from "./styled-barchat-products";

export function BarChartProducts({ chartData }) {
  return (
    <ChartContainer>
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Produtos vendidos",
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

BarChartProducts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: object.isRequired,
};
