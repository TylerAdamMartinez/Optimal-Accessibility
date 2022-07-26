using OptimalAccessibility.Domain.Enum;

namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class UserDTO
    {
        public string EUID { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public char? MiddleInitial { get; set; }
        public string LastName { get; set; } = string.Empty;
        public DateTime? Birthday { get; set; }
        public Gender Gender { get; set; } = default;
        public Classfication Classfication { get; set; } = default;
    }
}

