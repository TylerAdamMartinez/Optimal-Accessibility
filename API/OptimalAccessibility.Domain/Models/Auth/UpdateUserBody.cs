
using OptimalAccessibility.Domain.Enum;

namespace OptimalAccessibility.Domain.Models.Auth
{
    public class UpdateUserBody
    {
        public string? Email { get; set; }
        public char? MiddleInitial { get; set; }
        public DateTime? Birthday { get; set; }
        public Gender Gender { get; set; } = default;
        public Classfication Classfication { get; set; } = default;
    }
}

