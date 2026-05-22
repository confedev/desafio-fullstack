#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

if [[ "$1" == "dev" ]]; then
  print_info "Starting services locally with Maven and npm..."
  
  # Start Backend in background
  print_info "Starting Backend (Spring Boot with Maven)..."
  cd backend
  mvn clean spring-boot:run &
  BACKEND_PID=$!
  cd ..
  
  # Wait for backend to start
  print_info "Waiting for Backend to start..."
  sleep 15
  
  # Start Frontend in background
  print_info "Starting Frontend (React with npm)..."
  cd frontend
  npm install
  npm run dev &
  FRONTEND_PID=$!
  cd ..
  
  print_info ""
  print_info "✓ Backend is running (PID: $BACKEND_PID)"
  print_info "✓ Frontend is running (PID: $FRONTEND_PID)"
  print_info ""
  print_info "Backend URL:  http://localhost:8080"
  print_info "Frontend URL: http://localhost:5173"
  print_info ""
  print_info "Press CTRL+C to stop all services"
  
  wait
  
elif [[ "$1" == "kill" ]]; then
  print_info "Stopping all services..."
  pkill -f "mvn.*spring-boot:run"
  pkill -f "vite"
  print_info "Services stopped"
  
else
  print_info "Desafío Fullstack - Startup Script"
  print_info "Usage: ./start.sh [dev|kill]"
  print_info ""
  print_info "Options:"
  print_info "  dev      - Start services locally with Maven and npm"
  print_info "  kill     - Kill all running services"
  print_info ""
  print_info "Examples:"
  print_info "  ./start.sh dev"
  print_info "  ./start.sh kill"
  exit 0
fi
