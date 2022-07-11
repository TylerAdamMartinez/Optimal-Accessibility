﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using OptimalAccessibility.Application.Repositories;
using OptimalAccessibility.Domain.Models.Auth;
using OptimalAccessibility.Domain.Models.Database;

namespace OptimalAccessibility.API.Repositories
{
    public class AuthRepo : IAuthRepo
    {
        private readonly OptimalAccessibilityContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UsersRepo> _logger;

        public AuthRepo(OptimalAccessibilityContext context, IConfiguration configuration, ILogger<UsersRepo> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }


        public void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
        }

        public bool VerifyPasswordHash(string Password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public User? GetUserByEUID(string EUID)
        {
            return _context.Users.Where(user => user.EUID == EUID).FirstOrDefault();
        }

        public bool IsUniqueEUID(string EUID)
        {
            var UserWithSameEUID = _context.Users.Where(user => user.EUID == EUID).FirstOrDefault();
            if (UserWithSameEUID == null)
            {
                return true;
            }

            return false;
        }

        public string CreateJSONWebToken(LoginUserBody loginUserBody)
        {

            var userGUID = _context.Users.Where(b => b.EUID == loginUserBody.EUID).FirstOrDefault()?.userId.ToString() ?? "";

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userGUID),
                new Claim(ClaimTypes.Name, loginUserBody.EUID),
                new Claim(ClaimTypes.Role, "Student"),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(14),
                signingCredentials: cred
            );

            var Jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Jwt;
        }
    }
}

