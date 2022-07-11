using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Domain.Models.Auth
{
    public class LoginUserResponse
    {
        public string Jwt { get; set; } = string.Empty;
        public UserDTO? userDTO { get; set; } 
    }
}

