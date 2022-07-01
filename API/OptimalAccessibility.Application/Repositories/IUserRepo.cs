using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IUserRepo
    {
        public int GetUsersCount();
        public UserDTO GetUser(Guid userID);
        public List<PosterDTO> GetPostersByUser(Guid userID);
    }
}

