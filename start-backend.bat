@echo off
cd /d "%~dp0"
echo Starting Clothify Backend (Node.js port 5000)...
cd backend
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)
echo Server running at http://localhost:5000
npm start
pause