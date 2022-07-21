namespace OptimalAccessibility.Domain.Enum
{
    public enum DatabaseResultTypes
    {
        Successful = 0,

        FailedToUpdateUser,
        FailedToUpdatePoster,
        FailedToUpdatePosterAccessibilityScore,
        FailedToUpdateUserAcessibilityScoreNotFound,

        FailedToDeleteUser,
        FailedToDeletePoster,
        FailedToDeletePosterAccessibilityScore,
        FailedToDeleteUserAcessibilityScoreNotFound,

        UserNotFound,
        PosterNotFound,
        PosterAccessibilityScoreNotFound,
        UserAcessibilityScoreNotFound,

        NoAccessibilityScoreGiven,
        UniqueKeyConstraintFailed
    }
}

