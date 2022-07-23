using System;
namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class OptimalAccessibilityReportDetails
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Euid { get; set; } = string.Empty;
        public string RequestDate = DateTime.Today.ToShortDateString();

        public AccessibilityScoreDTO? AccessibilityScore { get; set; }
        public List<PosterReportDetails>? Posters { get; set; }
    }
}

