﻿using OptimalAccessibility.Domain.Enum;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IUserRepo
    {
        public AccessibilityScoreDTO GetOverallAccessibilityScoreByUserId(Guid userId);
        public AccessibilityScoreDTO GetPosterAccessibilityScoreByPosterId(Guid posterId);

        public bool AddNewUser(UserDTO newUser, string Password);
        public DatabaseResultTypes DeleteUserByUserId(Guid userId);
        public UserDTO GetUserByEUID(string EUID);

        public bool IsUniquePosterName(string posterName, Guid userId);
        public DatabaseResultTypes CreatePoster(PosterDTO newPoster, Guid userId);
        public List<PosterDTO> GetPostersByUserId(Guid userId);
        public List<PosterDTO> GetAllPosters();
        public DatabaseResultTypes UpdatePoster(string posterName, Guid userId, string newPosterName);
        public DatabaseResultTypes DeletePoster(string posterName, Guid userId);


    }
}

