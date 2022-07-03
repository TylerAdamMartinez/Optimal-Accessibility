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
        private readonly IUserRepo _userRepo;
        private readonly ILogger<UserController> _logger;

        public AuthController(IAuthRepo authRepo, IUserRepo userRepo, ILogger<UserController> logger)
        {
            _authRepo = authRepo;
            _userRepo = userRepo;
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

            var newUser = new UserDTO()
            {
                EUID = newUserRequest.EUID,
                FirstName = newUserRequest.FirstName,
                LastName = newUserRequest.LastName,
            };
            _userRepo.AddNewUser(newUser, newUserRequest.Password);

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

            var AttemptUserRequest = _authRepo.VerifyEUID(loginRequest.EUID);
            if (AttemptUserRequest == null)
            {
                return BadRequest($"No user with EUID {loginRequest.EUID} was found in database");
            }

            if(AttemptUserRequest.passwordHash == null || AttemptUserRequest.passwordSalt == null)
            {
                return NotFound("Failed to comfirm password");
            }

            if (!_authRepo.VerifyPasswordHash(loginRequest.Password, AttemptUserRequest.passwordHash, AttemptUserRequest.passwordSalt))
            {
                return Unauthorized("Incorrect Password Entered");
            }


            var loginUserDTO = new UserDTO()
            {
                UserId = AttemptUserRequest.UserId,
                FirstName = AttemptUserRequest.FirstName,
                LastName = AttemptUserRequest.LastName,
                EUID = AttemptUserRequest.EUID,
            };
            return Ok(loginUserDTO);
        }

    }

}


