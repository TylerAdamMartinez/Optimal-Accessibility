using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IReporting
    {
        public string ComplieReportTemplateWithData(OptimalAccessibilityReportDetails data);
        public byte[] CompileReportPdf(string document);
    }
}

