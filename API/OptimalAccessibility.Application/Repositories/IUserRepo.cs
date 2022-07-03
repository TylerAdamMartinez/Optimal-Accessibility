using OptimalAccessibility.Domain.Models.Database;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IUserRepo
    {
        public List<PosterDTO> GetPostersByUserId(Guid userId);
        public AccessibilityScoreDTO GetOverallAccessibilityScoreByUserId(Guid userId);
        public void AddNewUser(UserDTO newUser, string Password);
        public UserDTO GetUserByEUID(string EUID);
    }
}

