using System.ComponentModel.DataAnnotations;

namespace OptimalAccessibility.Domain.Models.Database
{
    public class AccessibilityScore
    {
        [Key]
        public Guid accessibilityScoreId { get; set; }
        [Required]
        public Guid userId { get; set; }
        public Guid? posterId { get; set; }

        public int TextRating { get; set; } = default;
        public int StructureRating { get; set; } = default;
        public int ColorRating { get; set; } = default;
    }
}

