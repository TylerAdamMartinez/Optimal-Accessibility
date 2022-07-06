using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OptimalAccessibility.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PosterAccessiblityScore",
                columns: table => new
                {
                    accessibilityScoreId = table.Column<Guid>(type: "TEXT", nullable: false),
                    posterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Text = table.Column<int>(type: "INTEGER", nullable: false),
                    Structure = table.Column<int>(type: "INTEGER", nullable: false),
                    Color = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PosterAccessiblityScore", x => x.accessibilityScoreId);
                });

            migrationBuilder.CreateTable(
                name: "Posters",
                columns: table => new
                {
                    posterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    userId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Data = table.Column<byte[]>(type: "BLOB", nullable: true),
                    accessibilityScoreId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posters", x => x.posterId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    userId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EUID = table.Column<string>(type: "TEXT", maxLength: 7, nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    MiddleInitial = table.Column<char>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Birthday = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Gender = table.Column<int>(type: "INTEGER", nullable: false),
                    Classfication = table.Column<int>(type: "INTEGER", nullable: false),
                    passwordHash = table.Column<byte[]>(type: "BLOB", nullable: false),
                    passwordSalt = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "UserAccessiblityScore",
                columns: table => new
                {
                    accessibilityScoreId = table.Column<Guid>(type: "TEXT", nullable: false),
                    userId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Text = table.Column<int>(type: "INTEGER", nullable: false),
                    Structure = table.Column<int>(type: "INTEGER", nullable: false),
                    Color = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccessiblityScore", x => x.accessibilityScoreId);
                    table.ForeignKey(
                        name: "FK_UserAccessiblityScore_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAccessiblityScore_userId",
                table: "UserAccessiblityScore",
                column: "userId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PosterAccessiblityScore");

            migrationBuilder.DropTable(
                name: "Posters");

            migrationBuilder.DropTable(
                name: "UserAccessiblityScore");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
