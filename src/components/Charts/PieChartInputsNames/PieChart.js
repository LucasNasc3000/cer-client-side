/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { object } from "prop-types";
import { Pie } from "react-chartjs-2";
import { ChartContainer } from "./styled-piechart";

export function PieChart({ chartData }) {
  return (
    <ChartContainer>
      <div className="chart-container">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Distribuição de insumos",
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    </ChartContainer>
  );
}

PieChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: object.isRequired,
};
