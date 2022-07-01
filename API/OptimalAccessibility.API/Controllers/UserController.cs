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

        [HttpGet("GetPostersByUserId/{userId}")]
        public ActionResult<List<PosterDTO>> GetPostersByUserId([FromRoute] Guid userId)
        {
            return Ok(userId);
        }

        [HttpGet("GetOverallAccessibilityScoreByUserId/{userId}")]
        public ActionResult<AccessibilityScoreDTO> GetRegisteredUserById([FromRoute] Guid userId)
        {
            return Ok(userId);
        }
    }
}