using OptimalAccessibility.Domain.Models.Auth;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IAuthRepo
    {
        public bool IsUniqueEUID(string EUID);
        public void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt);
        public (Guid?, byte[]?, byte[]?) GetUserGuidAndPasswordHashByEUID(string EUID);
        public UserDTO? GetUserDTOByUserId(Guid userId);
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
        public string CreateJSONWebToken(LoginUserBody loginUserBody);
    }
}

