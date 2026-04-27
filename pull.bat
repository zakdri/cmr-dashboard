@echo off
cd /d "%~dp0"

echo Fetching from GitHub...
git fetch origin

echo Pulling latest changes (main)...
git checkout main
git pull origin main

echo.
echo Done! Local repository is up to date.
pause

