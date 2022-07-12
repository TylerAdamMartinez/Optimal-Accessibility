using Xunit.Abstractions;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using OptimalAccessibility.API.Controllers;
using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.API.Repositories;
using OptimalAccessibility.API;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using OptimalAccessibility.API.Utils;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Filters;

namespace OptimalAccessibility.Tests.Controllers
{
    public class TestUserController
    {
        private readonly UserController _userController;

        public TestUserController(ITestOutputHelper output)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var builder = new ServiceCollection()
                .AddLogging(builder => builder.AddXUnit(output))
                .AddDbContext<OptimalAccessibilityContext>(options =>
                {
                    options.UseSqlite("Filename=TestDb.db");
                })
                .AddTransient<IAuthRepo, AuthRepo>()
                .AddTransient<AuthController>()
                .AddTransient<IUserRepo, UsersRepo>()
                .AddTransient<UserController>()
                .AddSingleton<IConfiguration>(configuration);

            _userController = builder.BuildServiceProvider().GetRequiredService<UserController>();
        }


        [Fact]
        public void Test()
        {
            var userId = new Guid("AAAAAAAA-BBBB-CCCC-DDDD-FFFFFFFFFFFF");
            var user = new ClaimsPrincipal(new OptimalAccessibilityIdentity(userId.ToString(), "Studnet"));
            _userController.ControllerContext = new ControllerContext();
            _userController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            Assert.True(true);
        }

    }
}