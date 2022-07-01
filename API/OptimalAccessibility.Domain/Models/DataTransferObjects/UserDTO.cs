using System.ComponentModel.DataAnnotations;
using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class UserDTO
    {
        [Key]
        public Guid UserId { get; set; }
        [Required]
        public string EUID { get; set; } = string.Empty;
        public string FristName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<PosterDTO>? posters { get; set; }
        public AccessibilityScore? AccessibilityScore { get; set; }
    }
}

