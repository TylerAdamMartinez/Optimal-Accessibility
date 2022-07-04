using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptimalAccessibility.Domain.Models.Database
{
    [Table("Posters")]
    public class Poster
    {
        [Key]
        public Guid posterId { get; set; }
        [Required]
        public Guid userId { get; set; }
        [Required]
        [Column("Name")]
        public string PosterName { get; set; } = string.Empty;
        [Column("Title")]
        public string PosterImageTitle { get; set; } = string.Empty;
        [Column("Data")]
        public byte[]? PosterImageData { get; set; } = default;
        public Guid? accessibilityScoreId { get; set; }
    }
}

