using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IAuthRepo
    {
        public bool IsUniqueEUID(string EUID);
        public void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt);
        public User? GetUserByEUID(string EUID);
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}

