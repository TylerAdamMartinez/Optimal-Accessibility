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

  const doc = new jsPDF();
  doc.text("Test", 10, 10);
  doc.save("test.pdf");
  console.log(posters);
};

export default createPDF;
