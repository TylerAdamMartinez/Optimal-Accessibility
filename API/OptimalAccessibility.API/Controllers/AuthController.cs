using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;
using OptimalAccessibility.Domain.Enum;
using OptimalAccessibility.Domain.Models.Auth;

namespace OptimalAccessibility.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CORS_Policy")]
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

            var (AttemptUserGuid, AttemptUserSalt, AttemptUserHash) = _authRepo.GetUserGuidAndPasswordHashByEUID(loginRequest.EUID);
            if (AttemptUserGuid == null)
            {
                return BadRequest($"No user with EUID {loginRequest.EUID} was found in database");
            }

            if(AttemptUserSalt == null || AttemptUserHash == null)
            {
                return NotFound("Failed to comfirm password");
            }

            if (!_authRepo.VerifyPasswordHash(loginRequest.Password, AttemptUserHash, AttemptUserSalt))
            {
                return Unauthorized("Incorrect Password Entered");
            }

            return Ok(new LoginUserResponse()
            {
                Jwt = _authRepo.CreateJSONWebToken(loginRequest),
                userId = (Guid)AttemptUserGuid
            });
        }

        [Authorize]
        [HttpGet("GetUserById/{userId:Guid}")]
        public ActionResult<UserDTO> GetUserDTOByUserId([FromRoute] Guid userId)
        {
            var result = _authRepo.GetUserDTOByUserId(userId);
            if (result == null)
            {
                return BadRequest($"No user with userId {userId} was found in database");
            }
            return Ok(result);
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

            if(Result == DatabaseResultTypes.FailedToDeleteUser)
            {
                return NotFound($"Failed to delete user with Guid of {userId}");
            }

            return Ok($"User with Guid of {userId} was successfull deleted from the database");
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

            if (Result == DatabaseResultTypes.FailedToUpdateUser)
            {
                return NotFound($"Failed to delete user with Guid of {userId}");
            }

            return Ok($"User with Guid of {userId} was successfull deleted from the database");
        }
    }

}


