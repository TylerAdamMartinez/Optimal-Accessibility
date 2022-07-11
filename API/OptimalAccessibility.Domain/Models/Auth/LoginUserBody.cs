using System;
namespace OptimalAccessibility.Domain.Models.Auth
{
    public class LoginUserBody
    {
        public string EUID { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}

