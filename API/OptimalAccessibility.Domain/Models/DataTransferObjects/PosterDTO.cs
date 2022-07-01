using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class PosterDTO
    {
        public string PosterName { get; set; } = string.Empty;
        public string PosterImageTitle { get; set; } = string.Empty;
        public byte[]? PosterImageData { get; set; } = default;
        public AccessibilityScore? AccessibilityScore { get; set; }
    }
}

