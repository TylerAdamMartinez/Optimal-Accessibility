using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CORS_Policy")]
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
            if(!_userRepo.IsUniquePosterName(newPoster.Name, userId))
            {
                return BadRequest($"Poster Name {newPoster.Name} has been taken already");
            }

            var Result = _userRepo.CreatePoster(newPoster, userId);
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
        [HttpPut("UpdatePosterNameByUserId/{userId:Guid}/ByPosterName/{posterName}")]
        public IActionResult UpdatePosterName([FromRoute] Guid userId, [FromRoute] string posterName, [FromQuery] string newPosterName)
        {
            var Result = _userRepo.UpdatePosterName(posterName, userId, newPosterName);
            if (Result == Domain.Enum.DatabaseResultTypes.FailedToUpdateValue)
            {
                return BadRequest($"Poster Name {newPosterName} has been taken already");
            }

            else if (Result == Domain.Enum.DatabaseResultTypes.PosterNotFound)
            {
                return BadRequest("Poster failed to be found");
            }

            return Ok();
        }

        [Authorize]
        [HttpPut("UpdatePosterDataByUserId/{userId:Guid}/ByPosterName/{posterName}")]
        public IActionResult UpdatePosterData([FromRoute] Guid userId, [FromRoute] string posterName, [FromBody] PosterDTO newPosterDTO)
        {
            var Result = _userRepo.UpdatePosterData(posterName, userId, newPosterDTO);
            if (Result == Domain.Enum.DatabaseResultTypes.FailedToUpdateValue)
            {
                return BadRequest($"New poster image data for poster {posterName} has failed to be uploaded to database");
            }
            else if (Result == Domain.Enum.DatabaseResultTypes.PosterNotFound)
            {
                return BadRequest("Poster failed to be found");
            }
            else if(Result == Domain.Enum.DatabaseResultTypes.NoAccessibilityScoreGiven)
            {
                return BadRequest("No accessibility score given");
            }

            return Ok();
        }

        [Authorize]
        [HttpDelete("DeletePosterByUserId/{userId:Guid}/ByPosterName/{posterName}")]
        public IActionResult DeletePoster([FromRoute] Guid userId, [FromRoute] string posterName)
        {
            var Result = _userRepo.DeletePoster(posterName, userId);
            if (Result == Domain.Enum.DatabaseResultTypes.PosterNotFound)
            {
                return BadRequest("Poster failed to be found");
            }

            return Ok();
        }

        [Authorize(Roles = "Teacher")]
        [HttpGet("GetAllPosters")]
        public ActionResult<List<PosterDTO>> GetAllPosters()
        {
            return _userRepo.GetAllPosters();
        }


        [Authorize(Roles = "Teacher")]
        [HttpGet("GetClassroomOverallAccessiblityScore")]
        public ActionResult<AccessibilityScoreDTO> GetClassroomOverallAccessiblityScore()
        {
            return BadRequest("Not impl yet");
        }
    }
}