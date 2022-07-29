using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OptimalAccessibility.API.Migrations
{
    public partial class CREATEINIT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PosterAccessiblityScore",
                columns: table => new
                {
                    accessibilityScoreId = table.Column<Guid>(type: "uuid", nullable: false),
                    posterId = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<int>(type: "integer", nullable: false),
                    Structure = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PosterAccessiblityScore", x => x.accessibilityScoreId);
                });

            migrationBuilder.CreateTable(
                name: "Posters",
                columns: table => new
                {
                    posterId = table.Column<Guid>(type: "uuid", nullable: false),
                    userId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Data = table.Column<byte[]>(type: "bytea", nullable: true),
                    accessibilityScoreId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posters", x => x.posterId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    userId = table.Column<Guid>(type: "uuid", nullable: false),
                    EUID = table.Column<string>(type: "character varying(7)", maxLength: 7, nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    MiddleInitial = table.Column<char>(type: "character(1)", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Birthday = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    Classfication = table.Column<int>(type: "integer", nullable: false),
                    passwordHash = table.Column<byte[]>(type: "bytea", nullable: false),
                    passwordSalt = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "UserAccessiblityScore",
                columns: table => new
                {
                    accessibilityScoreId = table.Column<Guid>(type: "uuid", nullable: false),
                    userId = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<int>(type: "integer", nullable: false),
                    Structure = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false)
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
