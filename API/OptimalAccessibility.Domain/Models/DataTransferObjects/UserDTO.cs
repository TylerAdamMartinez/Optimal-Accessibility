using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string EUID { get; set; } = string.Empty;
        public string FristName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<PosterDTO>? posters { get; set; }
        public AccessibilityScore? AccessibilityScore { get; set; }
    }
}

