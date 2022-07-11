using Microsoft.EntityFrameworkCore;
using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Enum;
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

        public DatabaseResultTypes AddNewPoster(PosterDTO newPoster, Guid userId)
        {
            if (newPoster.AccessibilityScore == null)
            {
                return DatabaseResultTypes.NoAccessibilityScoreGiven;
            }

            _context.Posters.Add(new Poster()
            {
                userId = userId,
                PosterName = newPoster.Name,
                PosterImageTitle = newPoster.Title,
                PosterImageData = newPoster.Data,
            });
            _context.SaveChanges();

            var poster = _context.Posters.Where(b => b.PosterName == newPoster.Name).FirstOrDefault();
            if (poster == null)
            {
                return DatabaseResultTypes.PosterNotFound;
            }
            
            _context.PosterAccessibilityScores.Add(new PosterAccessibilityScore()
            {
                posterId = poster.posterId,
                ColorRating = newPoster.AccessibilityScore.ColorRating,
                TextRating = newPoster.AccessibilityScore.TextRating,
                StructureRating = newPoster.AccessibilityScore.StructureRating,
            });

            _context.SaveChanges();
            return DatabaseResultTypes.Successful;
        }

        public bool AddNewUser(UserDTO newUser, string Password)
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
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex.ToString());
                return false;
            }

            var FindNewlyAddedUser = _context.Users.Where(b => b.EUID == newUser.EUID).FirstOrDefault();
            if (FindNewlyAddedUser == null)
            {
                return false;
            }

            _context.UserAccessibilityScores.Add(new UserAccessibilityScore()
            {
                userId = FindNewlyAddedUser.userId,
                TextRating = 0,
                StructureRating = 0,
                ColorRating = 0,
            });
            _context.SaveChanges();

            return true;
        }

        public DatabaseResultTypes DeleteUserByUserId(Guid userId)
        {
            var AttemptUser = _context.Users.Where(user => user.userId == userId).FirstOrDefault();
            if (AttemptUser == null)
            {
                return DatabaseResultTypes.UserNotFound;
            }

            _context.Users.Remove(AttemptUser);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex.ToString());
                return DatabaseResultTypes.FailedToUpdateValue;
            }
            return DatabaseResultTypes.Successful;
        }

        public AccessibilityScoreDTO GetOverallAccessibilityScoreByUserId(Guid userId)
        {
            var userAccessibilityScore = _context.UserAccessibilityScores.Where(accessibilityScore => accessibilityScore.userId == userId).FirstOrDefault();

            if (userAccessibilityScore == null)
            {
                _context.UserAccessibilityScores.Add(new UserAccessibilityScore()
                {
                    ColorRating = 0,
                    StructureRating = 0,
                    TextRating = 0
                });
                _context.SaveChanges();
                return new AccessibilityScoreDTO() { ColorRating = 0, StructureRating = 0, TextRating = 0 };
            }

            var posters = from User in _context.Users
                          where User.userId == userId
                          join Poster in _context.Posters
                          on User.userId equals Poster.userId
                          select Poster;

            if (posters == null)
            {
                return new AccessibilityScoreDTO() { ColorRating = 0, StructureRating = 0, TextRating = 0 };
            }
            int NumOfPoster = posters.Count();
            if(NumOfPoster == 0)
            {
                return new AccessibilityScoreDTO() { ColorRating = 0, StructureRating = 0, TextRating = 0 };
            }

            int TotalTextRating = default;
            int TotalStructureRating = default;
            int TotalColorRating = default;

            foreach (Poster poster in posters)
            {
                var AccessibilityScore = GetPosterAccessibilityScoreByPosterId(poster.posterId);
                if (AccessibilityScore == null)
                {
                    continue;
                }
                TotalTextRating += AccessibilityScore.TextRating;
                TotalStructureRating += AccessibilityScore.StructureRating;
                TotalColorRating = +AccessibilityScore.ColorRating;
            }


            userAccessibilityScore.TextRating = TotalTextRating / NumOfPoster;
            userAccessibilityScore.StructureRating = TotalStructureRating / NumOfPoster;
            userAccessibilityScore.ColorRating = TotalColorRating / NumOfPoster;
            _context.UserAccessibilityScores.Update(userAccessibilityScore);
            _context.SaveChanges();

            return new AccessibilityScoreDTO()
            {
                TextRating = userAccessibilityScore.TextRating,
                StructureRating = userAccessibilityScore.StructureRating,
                ColorRating = userAccessibilityScore.ColorRating
            };
        }

        public AccessibilityScoreDTO GetPosterAccessibilityScoreByPosterId(Guid posterId)
        {
            var accessibilityScore = _context.PosterAccessibilityScores.Where(b => b.posterId == posterId).FirstOrDefault();
            if (accessibilityScore == null)
            {
                return new AccessibilityScoreDTO() { ColorRating = 0, StructureRating = 0, TextRating = 0 };
            }

            return new AccessibilityScoreDTO()
            {
                ColorRating = accessibilityScore.ColorRating,
                TextRating = accessibilityScore.TextRating,
                StructureRating = accessibilityScore.StructureRating,
            };
        }

        public List<PosterDTO> GetPostersByUserId(Guid userId)
        {
            var posters = from User in _context.Users
                          where User.userId == userId
                          join Poster in _context.Posters
                          on User.userId equals Poster.userId
                          select Poster;

            var posterDTOs = new List<PosterDTO>();
            foreach (Poster poster in posters)
            {
                posterDTOs.Add(new PosterDTO()
                {
                    Name = poster.PosterName,
                    Data = poster.PosterImageData,
                    Title = poster.PosterImageTitle,
                    AccessibilityScore = GetPosterAccessibilityScoreByPosterId(poster.posterId),
                });
            }
            return posterDTOs;
        }

        public UserDTO GetUserByEUID(string EUID)
        {
            var user = _context.Users.Where(user => user.EUID == EUID).FirstOrDefault();
            var userId = user?.userId ?? throw new ArgumentNullException(nameof(user), $"There is no user with the EUID of {EUID}");
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

        public bool IsUniquePosterName(string posterName)
        {
            var Result = _context.Posters.Where(b => b.PosterName == posterName).FirstOrDefault();

            if (Result == null)
            {
                return true;
            }

            return false;
        }
    }
}

