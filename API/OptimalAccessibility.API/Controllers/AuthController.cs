using Microsoft.AspNetCore.Mvc;

using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _authRepo;
        private readonly ILogger<UserController> _logger;

        public AuthController(IAuthRepo authRepo, ILogger<UserController> logger)
        {
            _authRepo = authRepo;
            _logger = logger;
        }


        public class RegisterNewUserBody
        {
            public string EUID { get; set; } = string.Empty;
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("RegisterNewUser")]
        public IActionResult RegisterNewUser([FromBody] RegisterNewUserBody newUserRequest)
        {
            if (newUserRequest.EUID == string.Empty || newUserRequest.EUID == null)
            {
                return BadRequest("EUID is a required field");
            }

            if (newUserRequest.Password == string.Empty || newUserRequest.Password == null)
            {
                return BadRequest("Password is a required field");
            }

            if (newUserRequest.FirstName == string.Empty || newUserRequest.FirstName == null)
            {
                return BadRequest("First name is a required field");
            }

            if (newUserRequest.LastName == string.Empty || newUserRequest.LastName == null)
            {
                return BadRequest("Last name is a required field");
            }

            return Ok(newUserRequest);
        }

        public class LoginUserBody
        {
            public string EUID { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("Login")]
        public ActionResult<UserDTO> LoginAlreadyRegisteredUser([FromBody] LoginUserBody loginRequest)
        {
            if (loginRequest.EUID == string.Empty || loginRequest.EUID == null)
            {
                return BadRequest("EUID is a required field");
            }

            if (loginRequest.Password == string.Empty || loginRequest.Password == null)
            {
                return BadRequest("Password is a required field");
            }

            return Ok(new UserDTO());
        }

        [HttpDelete("DeleteUserById/{userId}")]
        public IActionResult DeleteUserById([FromRoute] Guid userId)
        {
            return Ok();
        }

    }

}


