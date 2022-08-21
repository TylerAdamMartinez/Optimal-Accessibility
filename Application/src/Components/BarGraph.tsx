import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { chartData } from "../oaTypes";
import { useRef } from "react";

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
  BarGraphCallback: (state: string) => void;
}

function BarGraph(props: BarGraphProp) {
  const barGraphRef = useRef(null);
  const accessibilityScoreMap = ["Text", "Structure", "Color"];

  function BarGraphOnClickHandler(event: any) {
    const { current: chart } = barGraphRef;
    if (!chart) return;
    let index: number | undefined = getElementAtEvent(chart, event).at(
      0
    )?.index;
    if (!index) index = 0;
    props.BarGraphCallback(accessibilityScoreMap[index]);
  }

  return (
    <>
      <Bar
        ref={barGraphRef}
        onClick={BarGraphOnClickHandler}
        data={props.data}
        options={{
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              titleFont: {
                size: 18,
              },
              bodyFont: {
                size: 18,
              },
              caretSize: 16,
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
            },
            x: {
              ticks: {
                font: {
                  size: 20,
                },
              },
            },
          },
        }}
      />
    </>
  );
}

export default BarGraph;
