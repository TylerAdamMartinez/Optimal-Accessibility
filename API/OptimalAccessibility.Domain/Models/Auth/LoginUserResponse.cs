namespace OptimalAccessibility.Domain.Models.Auth
{
    public class LoginUserResponse
    {
        public string Jwt { get; set; } = string.Empty;
        public Guid userId { get; set; } 
    }
}

