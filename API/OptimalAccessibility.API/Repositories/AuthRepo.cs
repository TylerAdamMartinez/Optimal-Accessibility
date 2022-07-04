using System.Security.Cryptography;
using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.API.Repositories
{
    public class AuthRepo : IAuthRepo
    {
        private readonly OptimalAccessibilityContext _context;
        private readonly ILogger<UsersRepo> _logger;

        public AuthRepo(OptimalAccessibilityContext context, ILogger<UsersRepo> logger)
        {
            _context = context;
            _logger = logger;
        }

        public Guid GetUserGuid(string EUID)
        {
            throw new NotImplementedException();
        }

        public string CreateJSONWebToken(User user)
        {
            throw new NotImplementedException();
        }

        public void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
        }


        public bool VerifyPasswordHash(string Password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public User? GetUserByEUID(string EUID)
        {
            return _context.Users.Where(user => user.EUID == EUID).FirstOrDefault();
        }

        public bool IsUniqueEUID(string EUID)
        {
            var Result = _context.Users.Where(user => user.EUID == EUID).FirstOrDefault();
            if (Result == null)
            {
                return true;
            }

            return false;
        }
    }
}

