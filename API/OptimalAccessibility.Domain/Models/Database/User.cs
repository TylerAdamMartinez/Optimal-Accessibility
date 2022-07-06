using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OptimalAccessibility.Domain.Enum;

namespace OptimalAccessibility.Domain.Models.Database
{
    [Table("Users")]
    public class User
    {
        [Key]
        public Guid userId { get; set; }
        [StringLength(7), Required]
        public string EUID { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public char? MiddleInitial { get; set; }
        public string LastName { get; set; } = string.Empty;
        public DateTime? Birthday { get; set; }
        public Gender Gender { get; set; } = default;
        public Classfication Classfication { get; set; } = default;
        public UserAccessibilityScore? accessibilityScore { get; set; }
        [Required]
        public byte[]? passwordHash { get; set; } = default;
        [Required]
        public byte[]? passwordSalt { get; set; } = default;
    }
}

