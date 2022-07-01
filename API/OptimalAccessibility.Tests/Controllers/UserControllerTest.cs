using System.Security.Claims;

using Xunit.Abstractions;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;


using OptimalAccessibility.API.Controllers;
using OptimalAccessibility.API.Utils;


namespace OptimalAccessibility.Tests.Controllers
{
    public class TestUserController
    {
        private readonly UserController _userController;

        public TestUserController(ITestOutputHelper output)
        {
            var builder = new ServiceCollection()
                .AddLogging(builder => builder.AddXUnit(output))
                .AddTransient<UserController>();

            _userController = builder.BuildServiceProvider().GetRequiredService<UserController>();

        }


        [Fact]
        public void TestGetUser()
        {
            var userId = new Guid("AAAAAAAA-BBBB-CCCC-DDDD-FFFFFFFFFFFF");
            var user = new ClaimsPrincipal(new OptimalAccessibilityIdentity(userId.ToString(), "Studnet"));
            _userController.ControllerContext = new ControllerContext();
            _userController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };
            Assert.True(true);
        }


        [Theory]
        [InlineData("Admin")]
        [InlineData("Teacher")]
        public void TestGetUserRoles(string role)
        {
            var userId = new Guid("AAAAAAAA-BBBB-CCCC-DDDD-FFFFFFFFFFFF");
            var user = new ClaimsPrincipal(new OptimalAccessibilityIdentity(userId.ToString(), role));
            _userController.ControllerContext = new ControllerContext();
            _userController.ControllerContext.HttpContext = new DefaultHttpContext { User = user };
            Assert.True(true);
        }
    }
}