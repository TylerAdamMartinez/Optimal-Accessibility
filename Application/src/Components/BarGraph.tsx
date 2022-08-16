import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { chartData } from "../oaTypes";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJs.defaults.scale.grid.drawOnChartArea = true;
ChartJs.defaults.scales.category.max = 100;

interface BarGraphProp {
  data: chartData;
}

function BarGraph(props: BarGraphProp) {
  return (
    <>
      <Bar
        data={props.data}
        options={{
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
            },
          },
        }}
      />
    </>
  );
}

export default BarGraph;
