namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class PosterDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public byte[]? Data { get; set; } = default;
        public AccessibilityScoreDTO? AccessibilityScore { get; set; }
    }
}

