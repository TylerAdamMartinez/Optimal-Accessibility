using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string EUID { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<PosterDTO>? posters { get; set; }
        public AccessibilityScoreDTO? AccessibilityScore { get; set; }
    }
}

