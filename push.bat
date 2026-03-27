@echo off
cd /d "%~dp0"

echo Adding files...
git add .

echo Committing changes...
git commit -m "update"

echo Setting main branch and remote...
git branch -M main
git remote add origin https://github.com/zakdri/cmr-dashboard.git 2>nul

echo Pushing to GitHub...
git push -u origin main

echo.
echo Done! Site updated at https://zakdri.github.io/cmr-dashboard/
pause
