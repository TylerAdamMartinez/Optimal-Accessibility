using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepo userRepo, ILogger<UserController> logger)
        {
            _userRepo = userRepo;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("GetPostersByUserId/{userId:Guid}")]
        public ActionResult<List<PosterDTO>> GetPostersByUserId([FromRoute] Guid userId)
        {
            return _userRepo.GetPostersByUserId(userId);
        }

        [Authorize]
        [HttpGet("GetOverallAccessibilityScoreByUserId/{userId:Guid}")]
        public ActionResult<AccessibilityScoreDTO> GetOverallAccessibilityScoreByUserId([FromRoute] Guid userId)
        {
            return _userRepo.GetOverallAccessibilityScoreByUserId(userId);
        }

        [Authorize]
        [HttpPost("AddPosterByUserId/{userId:Guid}")]
        public IActionResult AddPoster([FromRoute] Guid userId,[FromBody] PosterDTO newPoster)
        {
            if(!_userRepo.IsUniquePosterName(newPoster.Name))
            {
                return BadRequest($"Poster Name {newPoster.Name} has been taken already");
            }

            var Result = _userRepo.AddNewPoster(newPoster, userId);
            if (Result == Domain.Enum.DatabaseResultTypes.NoAccessibilityScoreGiven)
            {
                return BadRequest("Accessibility Must be given to add a new poster to database");
            }

            if(Result == Domain.Enum.DatabaseResultTypes.PosterNotFound)
            {
                return BadRequest("Poster that been added failed to be found");
            }

            return Ok("New poster was successfully added to database");
        }

        [Authorize]
        [HttpPut("UpdateOverallAccessibilityScoreByUserId/{userId:Guid}")]
        public ActionResult<AccessibilityScoreDTO> UpdateOverallAccessibilityScoreByUserId([FromRoute] Guid userId)
        {
            return Ok();
        }


        [Authorize(Roles = "Teacher")]
        [HttpGet("GetAllPosters")]
        public ActionResult<List<PosterDTO>> GetAllPosters()
        {
            return _userRepo.GetAllPosters();
        }
    }
}