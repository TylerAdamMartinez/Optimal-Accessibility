using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using NUnit.Framework;
using OptimalAccessibility.API;
using OptimalAccessibility.Domain.Models.Database;
using Assert = NUnit.Framework.Assert;

namespace OptimalAccessibility.Tests.Controllers
{
    [TestFixture]
    public class UserControllerTests
    {

        private byte[] GetByteArray(int sizeInKb)
        {
            Random rnd = new Random();
            byte[] b = new byte[sizeInKb * 1024];
            rnd.NextBytes(b);
            return b;
        }

        [Test]
        public void TestUserPoster()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            var options = new DbContextOptionsBuilder<OptimalAccessibilityContext>().UseSqlite(connection).Options;

            using (var context = new OptimalAccessibilityContext(options))
            {
                context.Database.EnsureCreated();
            }

            using (var context = new OptimalAccessibilityContext(options))
            {
                var userId = Guid.NewGuid();
                context.Users.Add(new User()
                {
                    userId = userId,
                    passwordHash = GetByteArray(4),
                    passwordSalt = GetByteArray(4),
                });
                context.SaveChanges();

                var posterId = Guid.NewGuid();
                context.Posters.Add(new Poster()
                {
                    userId = userId,
                    posterId = posterId,
                    PosterName = "Poster",
                    PosterImageTitle = "Poster",
                    PosterImageData = null,
                    accessibilityScoreId = null
                });
                context.SaveChanges();

                var actualPoster = context.Posters.Where(poster => poster.userId == userId && poster.posterId == posterId).Single();
                Assert.AreEqual(userId, actualPoster.userId);
                Assert.AreEqual(posterId, actualPoster.posterId);
                Assert.AreEqual("Poster", actualPoster.PosterName);
            }
        }

        [Test]
        public void TestUserAccessibilityScore()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            var options = new DbContextOptionsBuilder<OptimalAccessibilityContext>().UseSqlite(connection).Options;

            using (var context = new OptimalAccessibilityContext(options))
            {
                context.Database.EnsureCreated();
            }

            using (var context = new OptimalAccessibilityContext(options))
            {
                var userId = Guid.NewGuid();
                context.Users.Add(new User()
                {
                    userId = userId,
                    passwordHash = GetByteArray(4),
                    passwordSalt = GetByteArray(4),
                });
                context.SaveChanges();

                var accessibilityScoreId = Guid.NewGuid();
                context.UserAccessibilityScores.Add(new UserAccessibilityScore()
                {
                    userId = userId,
                    accessibilityScoreId = accessibilityScoreId,
                    TextRating = 66,
                    StructureRating = 99,
                    ColorRating = 33
                });
                context.SaveChanges();

                var actualAccessibilityScore = context.UserAccessibilityScores.Where(uas => uas.userId == userId).Single();
                Assert.AreEqual(userId, actualAccessibilityScore.userId);
                Assert.AreEqual(accessibilityScoreId, actualAccessibilityScore.accessibilityScoreId);
                Assert.AreEqual(66, actualAccessibilityScore.TextRating);
                Assert.AreEqual(99, actualAccessibilityScore.StructureRating);
                Assert.AreEqual(33, actualAccessibilityScore.ColorRating);
            }
        }
    }
}