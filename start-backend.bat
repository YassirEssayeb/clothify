@echo off
cd /d "%~dp0"
echo Starting Clotify Backend (Node.js port 5000)...
cd backend
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)
echo.
echo Server starting at http://localhost:5000
echo Press Ctrl+C to stop.
node server.js
pause