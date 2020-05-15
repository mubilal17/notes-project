FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /App
COPY Notes/bin/Debug/netcoreapp3.1/publish /App
ENTRYPOINT ["dotnet", "Notes.dll"]