using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OptimalAccessibility.API;
using OptimalAccessibility.API.Repositories;
using OptimalAccessibility.API.Services;
using OptimalAccessibility.Application.Repositories;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using Bearer scheme (Bearer {token})",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

var envVars = Environment.GetEnvironmentVariables();
var host = envVars["CONNECTION_HOST"] ?? "ec2-44-209-186-51.compute-1.amazonaws.com";
var database = envVars["CONNECTION_DB"] ?? "d5kderjk5i4e1t";
var username = envVars["CONNECTION_USER"] ?? "aogaxjiizshxyv";
var password = envVars["CONNECTION_PASS"] ?? "263d61c4a47803c2d39f7cd0b2d2c8a4fbbd9c657482c5fa3ba182dda664145d";

var connectionString = $"Host={host};Database={database};User Id={username};Password={password};";
builder.Services.AddDbContext<OptimalAccessibilityContext>(options => {
    options.UseNpgsql(connectionString);
});

builder.Services.AddTransient<IAuthRepo, AuthRepo>();
builder.Services.AddTransient<IUserRepo, UsersRepo>();
builder.Services.AddTransient<IReporting, ReportingsService>();

builder.Services.AddCors(b => b.AddPolicy("CORS_Policy", builder => {
    builder.WithOrigins("*")
        .AllowAnyHeader()
        .AllowAnyMethod();
}));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORS_Policy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
