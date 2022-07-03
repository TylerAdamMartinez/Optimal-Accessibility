using System;
using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.Database;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.API.Repositories
{
    public class UsersRepo : IUserRepo
    {
        private readonly OptimalAccessibilityContext _context;
        private readonly IAuthRepo _authRepo;
        private readonly ILogger<UsersRepo> _logger;

        public UsersRepo(OptimalAccessibilityContext context, IAuthRepo authRepo, ILogger<UsersRepo> logger)
        {
            _context = context;
            _authRepo = authRepo;
            _logger = logger;
        }

        public void AddNewUser(UserDTO newUser, string Password)
        {

            _authRepo.CreatePasswordHash(Password, out byte[] passwordHash, out byte[] passwordSalt);
            var newUserEntry = new User()
            {
                EUID = newUser.EUID,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt,
            };
            _context.Users.Add(newUserEntry);
            _context.SaveChanges();
        }

        public AccessibilityScoreDTO GetOverallAccessibilityScoreByUserId(Guid userId)
        {
            var userAccessibilityScore = _context.AccessibilityScores.Where(accessibilityScore => accessibilityScore.userId == userId).FirstOrDefault();

            if (userAccessibilityScore == null)
            {
                return new AccessibilityScoreDTO() { ColorRating = 0, StructureRating = 0, TextRating = 0 };
            }
            return new AccessibilityScoreDTO()
            {
                TextRating = userAccessibilityScore.TextRating,
                StructureRating = userAccessibilityScore.StructureRating,
                ColorRating = userAccessibilityScore.ColorRating
            };
        }

        public List<PosterDTO> GetPostersByUserId(Guid userId)
        {
            var posters = from User in _context.Users
                          where User.UserId == userId
                          join Poster in _context.Posters
                          on User.UserId equals Poster.userId
                          select new PosterDTO()
                          {
                              PosterName = Poster.PosterName,
                              PosterImageData = Poster.PosterImageData,
                              PosterImageTitle = Poster.PosterImageTitle,
                              AccessibilityScore = null,
                          };

            return posters.ToList();
        }

        public UserDTO GetUserByEUID(string EUID)
        {
            var user = _context.Users.Where(user => user.EUID == EUID).FirstOrDefault();
            var userId = user?.UserId ?? throw new ArgumentNullException(nameof(user), $"There is no user with the EUID of {EUID}");
            var userAccessibilityScore = GetOverallAccessibilityScoreByUserId(userId);
            var posters = GetPostersByUserId(userId);

            if (userAccessibilityScore == null)
            {
                return new UserDTO
                {
                    UserId = userId,
                    EUID = user.EUID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    AccessibilityScore = null,
                    posters = posters
                };
            }
            else
            {
                return new UserDTO
                {
                    UserId = userId,
                    EUID = user.EUID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    AccessibilityScore = new AccessibilityScoreDTO()
                    {
                        TextRating = userAccessibilityScore.TextRating,
                        StructureRating = userAccessibilityScore.StructureRating,
                        ColorRating = userAccessibilityScore.ColorRating
                    },
                    posters = posters
                };
            }

        }
    }
}

