using System;
namespace OptimalAccessibility.Domain.Exceptions
{
    public class OptimalAccessibilityException : Exception
    {
        public int StatusCode { get; set; }
        public OptimalAccessibilityException(string message) : base(message)
        {
        }
    }
}

