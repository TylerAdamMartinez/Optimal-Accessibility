using Microsoft.AspNetCore.Mvc;

using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;
using OptimalAccessibility.Domain.Enum;
using Microsoft.AspNetCore.Authorization;
using OptimalAccessibility.Domain.Models.Auth;

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

        [AllowAnonymous]
        [HttpPost("RegisterNewUser")]
        public IActionResult RegisterNewUser([FromBody] RegisterNewUserBody newUserRequest)
        {
            if (newUserRequest.EUID == string.Empty || newUserRequest.EUID == null)
            {
                return BadRequest("EUID is a required field");
            }

            if (!_authRepo.IsUniqueEUID(newUserRequest.EUID))
            {
                return BadRequest($"EUID {newUserRequest.EUID} is a taken");
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

            return Ok("New user successfully entered into database");
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public ActionResult<LoginUserResponse> LoginAlreadyRegisteredUser([FromBody] LoginUserBody loginRequest)
        {
            if (loginRequest.EUID == string.Empty || loginRequest.EUID == null)
            {
                return BadRequest("EUID is a required field");
            }

            if (loginRequest.Password == string.Empty || loginRequest.Password == null)
            {
                return BadRequest("Password is a required field");
            }

            var AttemptUserRequest = _authRepo.GetUserByEUID(loginRequest.EUID);
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

            var posters = _userRepo.GetPostersByUserId(AttemptUserRequest.userId);
            var overallAccessiblityScore = _userRepo.GetOverallAccessibilityScoreByUserId(AttemptUserRequest.userId);
            var loginUserDTO = new UserDTO()
            {
                UserId = AttemptUserRequest.userId,
                FirstName = AttemptUserRequest.FirstName,
                LastName = AttemptUserRequest.LastName,
                EUID = AttemptUserRequest.EUID,
                posters = posters,
                AccessibilityScore = overallAccessiblityScore,
            };

            var LoginResponseResult = new LoginUserResponse()
            {
                Jwt = _authRepo.CreateJSONWebToken(loginRequest),
                userDTO = loginUserDTO
            };

            return Ok(LoginResponseResult);
        }

        [Authorize]
        [HttpDelete("DeleteUserById/{userId:Guid}")]
        public IActionResult DeleteUserByUserId([FromRoute] Guid userId)
        {
            var Result = _userRepo.DeleteUserByUserId(userId);
            if(Result == DatabaseResultTypes.UserNotFound)
            {
                return NotFound($"No user with Guid of {userId} was found in database");
            }

            if(Result == DatabaseResultTypes.FailedToUpdateValue)
            {
                return NotFound($"Failed to delete user with Guid of {userId}");
            }

            return Ok($"User with Guid of {userId} was successfull deleted from the database");
        }

        public class UpdateUserBody
        {
            public string? Email { get; set; }
            public char? MiddleInitial { get; set; }
            public DateTime? Birthday { get; set; }
            public Gender Gender { get; set; } = default;
            public Classfication Classfication { get; set; } = default;
        }

        [Authorize]
        [HttpPut("UpdateUserById/{userId:Guid}")]
        public IActionResult UpdateUserFieldByUserId([FromRoute] Guid userId, [FromBody] UpdateUserBody updateUserBody)
        {
            var Result = _userRepo.DeleteUserByUserId(userId);
            if (Result == DatabaseResultTypes.UserNotFound)
            {
                return NotFound($"No user with Guid of {userId} was found in database");
            }

            if (Result == DatabaseResultTypes.FailedToUpdateValue)
            {
                return NotFound($"Failed to delete user with Guid of {userId}");
            }

            return Ok($"User with Guid of {userId} was successfull deleted from the database");
        }
    }

}


