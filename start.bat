@echo off
setlocal enabledelayedexpansion

if "%1%"=="docker" (
  echo [INFO] Starting services with Docker Compose...
  docker-compose up --build
  
) else if "%1%"=="dev" (
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
  
) else if "%1%"=="stop" (
  echo [INFO] Stopping Docker services...
  docker-compose down
  
) else if "%1%"=="logs" (
  echo [INFO] Showing logs...
  docker-compose logs -f
  
) else (
  echo [INFO] Desafio Fullstack - Startup Script
  echo [INFO] Usage: start.bat [docker^|dev^|stop^|logs]
  echo.
  echo [INFO] Options:
  echo [INFO]   docker   - Start services using Docker Compose
  echo [INFO]   dev      - Start services locally with Maven and npm
  echo [INFO]   stop     - Stop Docker services
  echo [INFO]   logs     - Show live logs from Docker services
  echo.
  echo [INFO] Examples:
  echo [INFO]   start.bat docker
  echo [INFO]   start.bat dev
  echo [INFO]   start.bat stop
  echo [INFO]   start.bat logs
)

endlocal
