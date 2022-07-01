using System;
namespace OptimalAccessibility.Domain.Models.DataTransferObjects
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string EUID { get; set; }
        public string FristName { get; set; }
        public string LastName { get; set; }
    }
}

