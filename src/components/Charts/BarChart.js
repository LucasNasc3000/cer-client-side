/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { object } from "prop-types";
import { Bar } from "react-chartjs-2";
import { ChartContainer } from "./styled-barchat";

export function BarChart({ chartData }) {
  return (
    <ChartContainer>
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Vendas diárias",
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

BarChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: object.isRequired,
};
