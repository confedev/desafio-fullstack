@echo off
setlocal enabledelayedexpansion

REM ==================== WARNING ====================
REM This Windows batch script is NOT FULLY TESTED
REM It may not work as expected on all systems
REM For production use, consider using Linux/Mac with start.sh
REM ===================================================

echo.
echo ╔════════════════════════════════════════════════╗
echo ║                     WARNING                      ║
echo ║  This Windows batch script is NOT FULLY TESTED  ║
echo ║                                                ║
echo ║ It may not work as expected on all systems.    ║
echo ║ For production use, consider using Linux/Mac   ║
echo ║                 with start.sh                   ║
echo ╚════════════════════════════════════════════════╝
echo.

if "%1%"=="dev" (
  echo [INFO] Starting services locally with Maven and npm...
  
  echo [INFO] Starting Backend (Spring Boot with Maven)...
  start "Backend" cmd /k "cd backend && mvn clean spring-boot:run"
  
  echo [INFO] Waiting for Backend to start...
  timeout /t 15 /nobreak
  
  echo [INFO] Starting Frontend (React with npm)...
  start "Frontend" cmd /k "cd frontend && npm install && npm run dev"
  
  echo.
  echo [INFO] Services are starting...
  echo.
  echo [INFO] Backend URL:  http://localhost:8080
  echo [INFO] Frontend URL: http://localhost:5173
  echo [INFO] Close the command windows to stop the services
  
) else if "%1%"=="kill" (
  echo [INFO] Stopping all services...
  taskkill /F /IM java.exe 2>nul
  taskkill /F /IM node.exe 2>nul
  echo [INFO] Services stopped
  
) else (
  echo [INFO] Desafio Fullstack - Startup Script
  echo [INFO] Usage: start.bat [dev^|kill]
  echo.
  echo [INFO] Options:
  echo [INFO]   dev      - Start services locally with Maven and npm
  echo [INFO]   kill     - Kill all running services
  echo.
  echo [INFO] Examples:
  echo [INFO]   start.bat dev
  echo [INFO]   start.bat kill
)

endlocal
