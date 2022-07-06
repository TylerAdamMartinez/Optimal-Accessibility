using System;
namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class AccessibilityScoreDTO
    {
        public int TextRating { get; set; } = default;
        public int StructureRating { get; set; } = default;
        public int ColorRating { get; set; } = default;
    }
}

