using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IReporting
    {
        public string ComplieReportTemplateWithData(OptimalAccessibilityReportDetails data);
        public Task<Stream> CompileReportPdf(string document);
    }
}

