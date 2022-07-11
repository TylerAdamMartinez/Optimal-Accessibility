namespace OptimalAccessibility.Domain.Models.Auth
{
    public class RegisterNewUserBody
    {
        public string EUID { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}

