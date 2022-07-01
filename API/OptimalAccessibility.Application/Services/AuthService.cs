using System;
using OptimalAccessibility.Application.Repositories;

namespace OptimalAccessibility.Application.Services
{
    public class AuthService : IAuthRepo
    {
        public AuthService() 
        {
        }

        public Guid GetUserGuid(string EUID, string Password)
        {
            throw new NotImplementedException();
        }
    }
}

