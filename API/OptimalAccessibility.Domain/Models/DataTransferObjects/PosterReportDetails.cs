using System;
namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class PosterReportDetails
    {
        public string Name { get; set; } = string.Empty;
        public AccessibilityScoreDTO? AccessibilityScore { get; set; }
    }
}

