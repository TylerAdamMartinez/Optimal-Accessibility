﻿using OptimalAccessibility.Domain.Enum;
using OptimalAccessibility.Domain.Models.DataTransferObjects;

namespace OptimalAccessibility.Application.Repositories
{
    public interface IUserRepo
    {
        public List<PosterDTO> GetPostersByUserId(Guid userId);
        public AccessibilityScoreDTO GetOverallAccessibilityScoreByUserId(Guid userId);
        public AccessibilityScoreDTO GetPosterAccessibilityScoreByPosterId(Guid posterId);
        public bool AddNewUser(UserDTO newUser, string Password);
        public DatabaseResultTypes DeleteUserByUserId(Guid userId);
        public UserDTO GetUserByEUID(string EUID);
    }
}

