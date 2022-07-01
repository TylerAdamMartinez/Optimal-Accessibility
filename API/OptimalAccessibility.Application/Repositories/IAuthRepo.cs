using System;
namespace OptimalAccessibility.Application.Repositories
{
    public interface IAuthRepo
    {
        public Guid GetUserGuid(string EUID, string Password);
    }
}

