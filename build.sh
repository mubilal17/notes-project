

## Build the Vue app. It's configured to be placed in Notes/wwwroot
cd Client && webpack

cd ../Notes

## Publish the Web Server
dotnet publish


cd ..

## Delete Build directory and its previous contents if it exists.
rm -rf Build

# Copy the contents of the Web Server into Build/.
mkdir Build
cp -r Notes/bin/Debug/netcoreapp3.1/* Build
