using System.ComponentModel.DataAnnotations;

using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class PosterDTO
    {
        [Key]
        public Guid posterId { get; set; }
        [Required]
        public Guid userId { get; set; }
        [Required]
        public string PosterName { get; set; } = string.Empty;
        public AccessibilityScore? AccessibilityScore { get; set; }
    }
}

