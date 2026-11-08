@echo off
setlocal
title GATE ECE Tutor
cd /d "%~dp0"

echo.
echo  ==========================================
echo    GATE ECE Tutor - local learning platform
echo  ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 goto :no_node

node scripts\preflight.mjs node
if errorlevel 1 goto :old_node

node scripts\preflight.mjs install
if errorlevel 1 goto :install
:after_install

if not exist ".env" if exist ".env.example" copy ".env.example" ".env" >nul

if /i "%~1"=="rebuild" goto :build
node scripts\preflight.mjs build
if errorlevel 1 goto :build
:after_build

echo  Starting the local server. Your browser will open automatically.
echo  Keep this window open while studying. Close it (or press Ctrl+C) to stop.
echo.
if not defined GATE_OPEN_BROWSER set GATE_OPEN_BROWSER=1
node --disable-warning=ExperimentalWarning --import tsx server\index.ts
if errorlevel 1 goto :crashed
goto :eof

:install
echo  Installing dependencies - first run only, needs an internet connection...
call npm install --no-fund --no-audit
if errorlevel 1 goto :install_failed
goto :after_install

:build
echo  Building the web app - this takes about 20 seconds...
call npm run build
if errorlevel 1 goto :build_failed
goto :after_build

:no_node
echo  [ERROR] Node.js was not found.
echo  Install Node.js 22 LTS or newer from https://nodejs.org (use the default options),
echo  then double-click GATE-Tutor.bat again.
goto :fail

:old_node
for /f "delims=" %%v in ('node --version') do set NODEV=%%v
echo  [ERROR] Node.js %NODEV% is too old. This app needs Node.js 22.13 or newer
echo  (it uses the SQLite database built into modern Node.js). Get it from https://nodejs.org
goto :fail

:install_failed
echo  [ERROR] "npm install" failed. Check your internet connection and try again.
echo  If it keeps failing, delete the node_modules folder and run GATE-Tutor.bat again.
goto :fail

:build_failed
echo  [ERROR] Building the web app failed. See the messages above.
goto :fail

:crashed
echo.
echo  [ERROR] The server stopped unexpectedly. See the message above.
echo  Your data is safe in the data\ folder.
goto :fail

:fail
echo.
pause
exit /b 1
