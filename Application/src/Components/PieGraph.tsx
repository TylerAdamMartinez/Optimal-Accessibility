import {
  Chart as ChartJs,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { chartData } from "../oaTypes";

ChartJs.register(
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

ChartJs.defaults.scale.grid.drawOnChartArea = false;

interface PieGraphProp {
  data: chartData;
}

function PieGraph(props: PieGraphProp) {
  return (
    <>
      <Doughnut
        data={props.data}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                font: {
                  size: 28
                },
                boxHeight: 35,
                boxWidth: 55,
              }
            },
            tooltip: {
              bodyFont: {
                size: 28
              },
              caretSize: 20,
            },
          },
          layout: {
            padding: 15
          }
        }}
      />
    </>
  );
}

export default PieGraph;
