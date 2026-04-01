@echo off
echo ========================================
echo AgroEase Server Startup Script
echo ========================================
echo.

echo Starting Backend Server...
echo.
start "AgroEase Backend" cmd /k "cd server && npm run dev"

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
echo.
start "AgroEase Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
echo ========================================
pause > nul
