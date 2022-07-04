using System.Reflection;
using Microsoft.EntityFrameworkCore;
using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.API
{
    public class OptimalAccessibilityContext : DbContext
    {
        public OptimalAccessibilityContext(DbContextOptions<OptimalAccessibilityContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Poster> Posters { get; set; } = null!;
        public virtual DbSet<UserAccessibilityScore> UserAccessibilityScores { get; set; } = null!;
        public virtual DbSet<PosterAccessibilityScore> PosterAccessibilityScores { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=OptimalAccessibilityDatabase.db");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
