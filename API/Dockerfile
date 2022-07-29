FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build

COPY . .
RUN dotnet restore "./OptimalAccessibility.API/OptimalAccessibility.API.csproj" --disable-parallel
RUN dotnet publish "./OptimalAccessibility.API/OptimalAccessibility.API.csproj" -c release -o /api --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /api
COPY --from=build /api ./

EXPOSE 80

ENTRYPOINT ["dotnet", "OptimalAccessibility.API.dll"]