import { jsPDF } from "jspdf";

const createPDF = (posters) => {
  const formatDate = () => {
    let d = new Date();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [month, day, year].join("-");
  };
  let today = formatDate();

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  // centered header
  doc.text(
    "Optimal Accessibility Poster Rating Report",
    100,
    20,
    null,
    null,
    "center"
  );
  doc.setFont("helvetica", "normal");
  // report date
  doc.text(today, 100, 30, null, null, "center");
  // loop through each poster and show data
  let posY = 50;
  posters.forEach((poster) => {
    // add another page if needed
    if (posY > 250) {
      doc.addPage();
      posY = 20;
    }

    doc.text(`Poster name: "${poster.name}"`, 20, posY);
    doc.text(
      `- Text Rating: ${poster.accessibilityScore.textRating}`,
      30,
      posY + 10
    );
    doc.text(
      `- Structure Rating: ${poster.accessibilityScore.structureRating}`,
      30,
      posY + 20
    );
    doc.text(
      `- Color Rating: ${poster.accessibilityScore.colorRating}`,
      30,
      posY + 30
    );
    posY += 50;
  });

  doc.save(`Optimal-Accessibility-Report-${today}.pdf`);
};

export default createPDF;
