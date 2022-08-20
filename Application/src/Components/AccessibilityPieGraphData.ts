import { accessibilityScore, chartData } from "../oaTypes";

class AccessibilityPieGraphData {
  score: accessibilityScore;
  constructor(PieGraphData: accessibilityScore) {
    this.score = PieGraphData;
  }

  get build(): chartData {
    let totalPossibleScore = 300;
    let remainingScore = totalPossibleScore - (this.score.textRating + this.score.structureRating + this.score.colorRating);

    return {
      labels: ["Remaing", "Text", "Structure", "Color"],
      datasets: [
        {
          label: "Rating Score",
          backgroundColor: [
            "rgba(90, 90, 90, 1)",
            "rgba(1, 127, 1, 1)",
            "rgba(100, 6, 101, 1)",
            "rgba(218, 54, 74, 1)",
          ],
          borderColor: "rgba(51, 51, 51, 1)",
          borderWidth: 2.5,
          hoverOffset: 15,
          data: [
            remainingScore,
            this.score.textRating,
            this.score.structureRating,
            this.score.colorRating,
          ],
          options: {
            responsive: true,
            maintainAspectRatio: true,
          },
        },
      ],
    };
  }
}

export default AccessibilityPieGraphData;
