using Microsoft.EntityFrameworkCore;
using OptimalAccessibility.API;
using OptimalAccessibility.API.Repositories;
using OptimalAccessibility.Application.Repositories;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = "Filename=OptimalAccessibilityDatabase.db";
builder.Services.AddDbContext<OptimalAccessibilityContext>(options => {
    options.UseSqlite(connectionString);
});

builder.Services.AddTransient<IAuthRepo, AuthRepo>();
builder.Services.AddTransient<IUserRepo, UsersRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
