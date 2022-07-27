class AccessibilityBarGraphData {
  constructor(AccessibilityScore) {
    this.AccessibilityScore = AccessibilityScore;
  }

  get build() {
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
          borderWidth: 1,
          data: [
            this.AccessibilityScore.textRating,
            this.AccessibilityScore.structureRating,
            this.AccessibilityScore.colorRating,
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
