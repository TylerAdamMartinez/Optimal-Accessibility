using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IAuthRepo
    {
        public Guid GetUserGuid(string EUID);
        public void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt);
        public User? VerifyEUID(string EUID);
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        public string CreateJSONWebToken(User user);
    }
}

