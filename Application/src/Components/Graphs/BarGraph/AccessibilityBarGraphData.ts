import { accessibilityScore, chartData } from "../../../oaTypes";

class AccessibilityBarGraphData {
  score: accessibilityScore;
  constructor(barGraphData: accessibilityScore) {
    this.score = barGraphData;
  }

  get build(): chartData {
    return {
      labels: ["Text", "Structure", "Color"],
      datasets: [
        {
          label: "Rating Score",
          backgroundColor: [
            "rgba(1, 127, 1, 1)",
            "rgba(100, 6, 101, 1)",
            "rgba(218, 54, 74, 1)",
          ],
          borderColor: "rgba(51, 51, 51, 1)",
          borderWidth: 2.5,
          hoverOffset: 25,
          data: [
            this.score.textRating,
            this.score.structureRating,
            this.score.colorRating,
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
      ],
    };
  }
}

export default AccessibilityBarGraphData;
