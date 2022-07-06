using System.Security.Claims;

namespace OptimalAccessibility.API.Utils
{
    public class OptimalAccessibilityIdentity : ClaimsIdentity
    {
        public OptimalAccessibilityIdentity(string userId) : base()
        {
            AddClaim(new Claim(ClaimTypes.Sid, userId));
            AddClaim(new Claim("UserId", userId));
        }


        //This constructor override is for testing the roles claim
        public OptimalAccessibilityIdentity(string userId, string role) : base()
        {
            AddClaim(new Claim(ClaimTypes.Sid, userId));
            AddClaim(new Claim("UserId", userId));
            AddClaim(new Claim("UserRole", role));
        }
    }
}

