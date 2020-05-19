FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /App
COPY Build /App
ENTRYPOINT ["dotnet", "WebServer.dll"]