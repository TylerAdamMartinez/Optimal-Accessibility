using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Services
{
    public class UserService : IUserRepo
    {
        public UserService()
        {
        }

        public List<PosterDTO> GetPostersByUser(Guid userID)
        {
            throw new NotImplementedException();
        }

        public UserDTO GetUser(Guid userID)
        {
            throw new NotImplementedException();
        }

        public int GetUsersCount()
        {
            throw new NotImplementedException();
        }
    }
}

