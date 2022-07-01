using System.ComponentModel.DataAnnotations;
namespace OptimalAccessibility.Domain.Models.Database
{
    public class Poster
    {
        [Key]
        public Guid posterId { get; set; }
        [Required]
        public Guid userId { get; set; }
        [Required]
        public string PosterName { get; set; } = string.Empty;
        public string PosterImageTitle { get; set; } = string.Empty;
        public byte[]? PosterImageData { get; set; } = default;
        public Guid? accessibilityScoreId { get; set; }
    }
}

