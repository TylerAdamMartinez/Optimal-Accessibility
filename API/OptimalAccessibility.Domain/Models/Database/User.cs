using System.ComponentModel.DataAnnotations;

using OptimalAccessibility.Domain.Enum;

namespace OptimalAccessibility.Domain.Models.Database
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        [Required]
        public string EUID { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public char? MiddleInitial { get; set; }
        public string LastName { get; set; } = string.Empty;
        public DateTime? Birthday { get; set; }
        public Gender Gender { get; set; } = default;
        public Classfication Classfication { get; set; } = default;
        public AccessibilityScore? accessibilityScore { get; set; }
        [Required]
        public byte[]? passwordHash { get; set; } = default;
        [Required]
        public byte[]? passwordSalt { get; set; } = default;
    }
}

