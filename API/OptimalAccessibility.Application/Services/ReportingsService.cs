using HandlebarsDotNet;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;


namespace OptimalAccessibility.API.Services
{
    public class ReportingsService : IReporting
    {
        public byte[] CompileReportPdf(string html_document)
        {
            byte[] bytes;
            StringReader sr = new StringReader(html_document);
            Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 100f, 0f);
            using (MemoryStream stream = new System.IO.MemoryStream())
            {
                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, stream);
                pdfDoc.Open();
                XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
                pdfDoc.Close();
                bytes = stream.ToArray();
            }
            return bytes;
        }
        public string ComplieReportTemplateWithData(OptimalAccessibilityReportDetails data)
        {
            string source =
            @"
            <html>
                <body>
                    <h1>
                        Optimal Accessibility Report for {{firstName}} {{lastName}}
                    </h1>
                    <h2>
                        <ul>
                            <li>EUID: {{euid}}</li>
                            <li>Date Requested: {{requestDate}}</li>
                            <li>Overall Accessibility Score:</li>
                            <ul>
                                <li>Text Rating: {{accessibilityScore.textRating}}</li>
                                <li>Structure Rating: {{accessibilityScore.structureRating}}</li>
                                <li>Color Rating: {{accessibilityScore.colorRating}}</li>
                            </ul>
                        </ul>
                    </h2>
                    <ol>
                        {{#each posters}}
                        <li>
                            <ul>
                                <li>Poster Name: {{name}}</li>
                                <li>Poster Accessibility Score:</li>
                                <ul>
                                    <li>Text Rating: {{accessibilityScore.textRating}}</li>
                                    <li>Structure Rating: {{accessibilityScore.structureRating}}</li>
                                    <li>Color Rating: {{accessibilityScore.colorRating}}</li>
                                </ul>
                            </ul>
                        </li>
                        {{/each}}
                    </ol>
                </body>
            </html>
            ";

            var template = Handlebars.Compile(source);
            var result = template(data);

            return result;
        }
    }
}

