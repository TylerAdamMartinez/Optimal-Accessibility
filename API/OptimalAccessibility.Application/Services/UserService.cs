using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Services
{
    public class UserService : IUserRepo
    {
        public UserService()
        {
        }

        public AccessibilityScoreDTO? GetOverallAccessibilityScoreByUserId(Guid userId)
        {
            throw new NotImplementedException();
        }

        public List<PosterDTO> GetPostersByUserId(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}

